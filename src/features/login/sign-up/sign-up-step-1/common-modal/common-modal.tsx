import {FC} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {setAppErrorAC} from '../../../../../app/app-reducer';
import {registerTC, setStepAC} from '../../../../../app/auth-reducer';
import {AppDispatchType, useAppSelector} from '../../../../../app/store';
import {authSelector} from '../../../../../app/use-app-selectors';
import {ButtonComponent} from '../../../../../common/components/button';
import {ROUTS} from '../../../../../common/utils/utils-for-routs';

import commonModalStyles from '../../../../../common/styles/modal-response-common.module.scss';

type CommonModalType = {
    error: string | null
    callback: () => void
}

export const CommonModal: FC<CommonModalType> = ({callback, error}) => {

    const errorMessage = 'Request failed with status code 400'
    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatchType>();
    const {dataForm} = useAppSelector(authSelector)

    const onClickHandlerEnter = () => {
        if (!error) {
            callback()
        }
        if (error === errorMessage) {
            dispatch(setStepAC(1))
            dispatch(setAppErrorAC(null))
            navigate(ROUTS.REGISTRATION)
        }
        if (error && error !== errorMessage) {
            dispatch(registerTC(dataForm))
        }
    }

    return (
        <div className={commonModalStyles.commonContainer}>
            <div className={commonModalStyles.container}>
                <div data-test-id='status-block'
                    className={commonModalStyles.title}>{error ? 'Данные не сохранились' : 'Регистрация успешна'}</div>
                <div data-test-id='status-block' className={commonModalStyles.message}> {error
                    ? (error === errorMessage
                        ? 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail'
                        : 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз')
                    : 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'}
                </div>
                <ButtonComponent className={commonModalStyles.buttonRepeat}
                                 onClick={onClickHandlerEnter}>
                    {error ? (error === errorMessage ? 'Назад к регистрации' : 'Повторить') : 'Вход'}
                </ButtonComponent></div>
        </div>
    );
}
