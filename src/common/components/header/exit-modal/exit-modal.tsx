import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {setAppErrorAC} from '../../../../app/app-reducer';
import {setIsTokenAC} from '../../../../app/auth-reducer';
import {AppDispatchType} from '../../../../app/store';
import {saveToken} from '../../../utils/utils-for-local-storage';
import {ROUTS} from '../../../utils/utils-for-routs';
import {ButtonComponent} from '../../button';

import styles from './exit-modal.module.scss'

export const ExitModal = () => {
    const dispatch = useDispatch<AppDispatchType>();
    const navigate = useNavigate()

    const onclickHandlerProfile = () => {
        navigate(ROUTS.PROFILE)
    }

    const onclickHandlerExit = () => {
        dispatch(setAppErrorAC(null));
        saveToken('')
        dispatch(setIsTokenAC(''))
    }

    return <div className={styles.exitModals}>
        <ButtonComponent data-test-id='profile-button'
                         onClick={onclickHandlerProfile} className={styles.buttonExit}>
            Профиль
        </ButtonComponent>
        <ButtonComponent data-test-id='exit-button' onClick={onclickHandlerExit}
                         className={styles.buttonExit}>
            Выход
        </ButtonComponent>
    </div>
}
