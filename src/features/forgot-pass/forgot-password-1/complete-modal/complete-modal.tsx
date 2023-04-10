import commonModalStyles from '../../../../common/styles/modal-response-common.module.scss'
import styles from './complete-modal.module.scss';

export const CompleteModal = () => (
        <div className={`${commonModalStyles.commonContainer} ${styles.commonContainer}`}>
            <div className={commonModalStyles.container}>
                <div data-test-id='status-block' className={commonModalStyles.title}>Письмо выслано</div>
                <div className={commonModalStyles.message}>Перейдите в вашу почту, чтобы
                    воспользоваться подсказками по восстановлению пароля
                </div>
            </div>
        </div>
    );
