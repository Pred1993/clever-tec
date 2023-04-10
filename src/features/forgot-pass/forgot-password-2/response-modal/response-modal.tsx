import {FC} from 'react';

import {ButtonComponent} from '../../../../common/components/button';

import commonModalStyles from '../../../../common/styles/modal-response-common.module.scss'
import styles from './response-modal.module.scss';

type ResponseModalType = {
    callBack: () => void
    error: string | null
    isPassReset: boolean
}


export const ResponseModal: FC<ResponseModalType> = ({callBack, error, isPassReset}) => {

    const onClickHandler = () => {
        callBack()
    }

    return (
        <div className={isPassReset ? `${commonModalStyles.commonContainer} ${styles.commonContainer}` : `${commonModalStyles.commonContainer} ${styles.commonContainer2}`}>
            <div className={`${commonModalStyles.container}`}>
                <div data-test-id='status-block'
                    className={commonModalStyles.title}>{error ? 'Данные не сохранились' : 'Новые данные сохранены'}</div>
                <div
                    className={commonModalStyles.message}>{error ? 'Что-то пошло не так. Попробуйте ещё раз' : 'Зайдите в личный кабинет, используя свои логин и новый пароль'}
                </div>
                <ButtonComponent  className={commonModalStyles.buttonRepeat}
                                 onClick={onClickHandler}>
                    {error ? 'Повторить' : 'Вход'}
                </ButtonComponent>
            </div>
        </div>
    );
};

