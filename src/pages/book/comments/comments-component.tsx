import {FC, useState} from 'react';

import {CommentsBookType} from '../../../app/app-api';
import {useAppSelector} from '../../../app/store';
import {bookSelector, userIdSelector} from '../../../app/use-app-selectors';
import chevronOff from '../../../assets/image/chevronOff.svg';
import chevronOn from '../../../assets/image/chevronOn.svg';
import {ModalContainer} from '../../../common/components/modal';
import {StarsComponent} from '../../../common/components/stars';

import {FeedbackComponent} from './feedback/feedback-component';

import additionalStyleForButton
    from '../../../common/styles/additional-style-for-button.module.scss';
import additionalStyleForStars from '../../../common/styles/additional-style-for-stars.module.scss';
import styles from './comments-component.module.scss';

type CommentsComponentType = {
    bookId: string
}

export const CommentsComponent: FC<CommentsComponentType> = ({ bookId }) => {

    const [visibility, setVisibility] = useState<boolean>(false);

    const {comments, booking, delivery} = useAppSelector(bookSelector);
    const userId = useAppSelector(userIdSelector);

    const visibilityClass = visibility ? `${styles.visibility}` : `${styles.visibilityNone}`;
    const border = visibility ? `${styles.borderOn}` : `${styles.borderOff}`;

    let sortComments: CommentsBookType[] = []

    if (comments) {
        sortComments = [...comments].sort((a, b) => {
            if (a.createdAt >= b.createdAt) return -1

            return 1
        })
    }

    const commentForBook = comments?.find(el => el.user.commentUserId === userId)

    return (
        <div>
            {sortComments?.length ? (
                <div className={styles.feedbackContainer}>
                    <div className={styles.chevronContainerOn}>
                        <h5>Отзывы</h5> <span>{sortComments.length}</span>
                        <button
                            data-test-id='button-hide-reviews'
                            type='button'
                            className={styles.chevron}
                            onClick={() => setVisibility(!visibility)}
                        >
                            {visibility ? <img src={chevronOff} alt='chevron-off'/> :
                                <img src={chevronOn} alt='chevron-on'/>}
                        </button>
                    </div>
                    <div className={border}>{true}</div>
                    <div data-test-id='reviews'>
                        <div className={visibilityClass}>
                            {sortComments.map((el) => (
                                <div data-test-id='comment-wrapper' key={el.id}>
                                    <FeedbackComponent
                                        firstName={el.user.firstName}
                                        lastName={el.user.lastName}
                                        createdAt={el.createdAt}
                                        avatarUrl={el.user.avatarUrl}
                                    />
                                    <div data-test-id='rating'
                                        className={el.text ? styles.starsComponent2 : styles.starsComponent1}>
                                        <StarsComponent
                                            className2={additionalStyleForStars.starBookPage}
                                            rating={el.rating}
                                            className={additionalStyleForStars.starsBookPage}
                                        />
                                    </div>
                                    <div data-test-id='comment-text' className={styles.text}>
                                        <p>{el.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.buttonContainer2}>
                            <ModalContainer commentForBook={commentForBook}
                                            delivery={delivery ? delivery : null}
                                            booking={booking}
                                            className={additionalStyleForButton.buttonAssess}
                                            mode='rating'
                                            bookId={bookId}/>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.feedbackContainer}>
                    <div className={styles.chevronContainerOn}>
                        <h5 className={styles.feedback}>Отзывы</h5>
                        <span>0</span>
                    </div>
                    <div data-test-id='reviews' className={styles.buttonContainer3}>
                        <ModalContainer commentForBook={commentForBook} delivery={delivery ? delivery : null} className={additionalStyleForButton.buttonAssess}
                                        booking={booking}
                                        mode='rating'
                                        bookId={bookId}/>

                    </div>
                </div>
            )}
        </div>
    );
};
