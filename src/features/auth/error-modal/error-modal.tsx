import {FC} from 'react';

import {ButtonComponent} from '../../../common/components/button';

import commonModalStyles from '../../../common/styles/modal-response-common.module.scss';
import styles from './error-modal.module.scss'

type ErrorModalType = {
    callBack: () => void
}

export const ErrorModal: FC<ErrorModalType> = ({callBack}) => {

    const onClickHandlerRepeat = () => {
        callBack()
    }

    return (

        <div className={`${commonModalStyles.commonContainer} ${styles.commonContainer}`}>
            <div className={commonModalStyles.container}>
                <div data-test-id='status-block' className={commonModalStyles.title}>Вход не выполнен</div>
                <div className={commonModalStyles.message}>Что-то пошло не так. Попробуйте ещё раз
                </div>
                <ButtonComponent className={commonModalStyles.buttonRepeat}
                                 onClick={onClickHandlerRepeat}>
                    Повторить
                </ButtonComponent></div>
        </div>
    );
}

