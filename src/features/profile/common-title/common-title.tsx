import {FC} from 'react';

import styles from './common-title.module.scss';

type CommonTitleType = {
    title: string
    helper: string
}
export const CommonTitle: FC<CommonTitleType> = ({title, helper}) => (
        <header className={styles.contents}>
            <div className={styles.title}>{title}</div>
            <div className={styles.helper}>{helper}
            </div>
        </header>
    );


