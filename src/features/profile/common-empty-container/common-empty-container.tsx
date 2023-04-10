import {FC} from 'react';

import styles from './common-empty-container.module.scss';

type CommonEmptyContainerType = {
    text1: string
    text2: string
}

export const CommonEmptyContainer: FC<CommonEmptyContainerType> = ({text1, text2}) => (
        <div data-test-id='empty-blue-card' className={styles.emptyContainer}>
            <div className={styles.text}>
                <p>{text1} </p>
                <p>{text2}</p>
            </div>

        </div>
    );
