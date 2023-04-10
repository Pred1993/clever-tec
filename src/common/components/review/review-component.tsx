import React, {FC, useState} from 'react';
import {useDispatch} from 'react-redux';

import {CommentsBookType, GetAuthMeCommentsType} from '../../../app/app-api';
import {AppDispatchType, useAppSelector} from '../../../app/store';
import {userIdSelector} from '../../../app/use-app-selectors';
import {editCommentTC} from '../../../features/profile/profile-reducer';
import {addCommentTC} from '../../../pages/book/book-reducer';
import {ButtonComponent} from '../button';

import {SetRatting} from './set-ratting';

import styles from './review-component.module.scss'

type ReviewComponentType = {
    bookId: string
    callBack: (e: React.MouseEvent) => void
    yourComment?: GetAuthMeCommentsType
    commentForBook?: CommentsBookType
}

export const ReviewComponent: FC<ReviewComponentType> = ({yourComment, bookId, callBack, commentForBook}) => {

    const dispatch = useDispatch<AppDispatchType>();
    const userId = useAppSelector(userIdSelector);

    let initialValue

    if(yourComment?.rating) {
        initialValue = yourComment.rating
    } else if (commentForBook?.rating) {
        initialValue = commentForBook.rating
    } else initialValue = 5

    let initialValueTextarea

    if(yourComment?.text) {
        initialValueTextarea = yourComment.text
    } else if (commentForBook?.text) {
        initialValueTextarea = commentForBook.text
    } else initialValueTextarea = ''

    const [value, setValue] = useState<number>(initialValue);
    const [valueTextarea, setValueTextarea] = useState<string>(initialValueTextarea);

    const data = {
        rating: value,
        text: valueTextarea,
        book: bookId.toString(),
        user: userId.toString()
    }

    const onClickHandlerAssess = (e: React.MouseEvent) => {
        callBack(e)
        if (yourComment) {
            dispatch(editCommentTC({data}, yourComment.id.toString()))
        } else if (commentForBook?.id) {
            dispatch(editCommentTC({data}, commentForBook.id.toString()))
        } else dispatch(addCommentTC({data}))

    }

    return (

        <div className={styles.assessmentContainer}>
            <div className={styles.assessment}>Ваша оценка</div>
            <SetRatting setValue={setValue} value={value}/>
            <textarea data-test-id='comment' value={valueTextarea
            } onChange={(e) => setValueTextarea(e.target.value)} placeholder='Оставить отзыв' className={styles.textarea} name="" id="" />
            <ButtonComponent data-test-id='button-comment' className={styles.buttonAssess} onClick={onClickHandlerAssess}>
                Оценить
            </ButtonComponent>
        </div>
    );
}
