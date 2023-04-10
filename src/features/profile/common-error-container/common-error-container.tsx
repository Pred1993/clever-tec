import {FC} from 'react';

import styles from './common-error-container.module.scss';

type CommonErrorContainerType = {
    text1: string
    text2: string
    text3: string
}

export const CommonErrorContainer: FC<CommonErrorContainerType> = ({text1, text2, text3}) => (
    <div data-test-id='expired' className={styles.errorContainer}>
        <div className={styles.bookingText}>
            {text1} <br/> {text2}
        </div>
        <div className={styles.informText}>
            {text3}
        </div>
    </div>
);
