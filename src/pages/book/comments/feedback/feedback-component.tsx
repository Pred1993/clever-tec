import {FC} from 'react';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';

import ava from '../../../../assets/image/avatar.svg';
import {showPicture} from '../../../../common/utils/utils-for-image';

import styles from './feedback-component.module.scss';

type FeedbackComponentType = {
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    createdAt: string;
};

export const FeedbackComponent: FC<FeedbackComponentType> = ({
                                                                 firstName,
                                                                 lastName,
                                                                 avatarUrl,
                                                                 createdAt,
                                                             }) => (
    <div className={styles.feedbackWrapper}>
        <img src={showPicture(avatarUrl, ava)} alt='ava'/>
        <div className={styles.name}>
            <div data-test-id='comment-author'>{`${firstName} ${lastName}`}</div>
            <div data-test-id='comment-date'>{format(new Date(createdAt), 'dd MMMM yyyy', {locale: ru})}</div>
        </div>
    </div>
);
