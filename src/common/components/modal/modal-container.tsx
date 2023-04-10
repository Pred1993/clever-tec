import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';

import {
    BookingType,
    CommentsBookType,
    DeliveryType,
    GetAuthMeCommentsType
} from '../../../app/app-api';
import {AppDispatchType, useAppSelector} from '../../../app/store';
import {userIdSelector} from '../../../app/use-app-selectors';
import iconCloseModal from '../../../assets/image/iconCloseModal.svg'
import {thunkForTest} from '../../../pages/book/book-reducer';
import {ButtonComponent} from '../button';

import {ModalComponent} from './modal-component';

import commonButton from '../../styles/common-button.module.scss'
import styles from './modal-container.module.scss';

type ModalContainerType = {
    mode: string
    bookId: string
    commentForBook?: CommentsBookType
    yourComment?: GetAuthMeCommentsType
    booking?: BookingType | null;
    delivery?: DeliveryType | null;
    className?: object;
    lengthHistoryForProfile?: number | null
}


export const ModalContainer: FC<ModalContainerType> = ({
                                                           delivery,
                                                           booking,
                                                           className,
                                                           mode,
                                                           commentForBook,
                                                           bookId,
                                                           yourComment,
                                                           lengthHistoryForProfile
                                                       }) => {
    const [showModal, setShowModal] = useState(false);
    const [clickDate, setClickDate] = useState(false);

    const dispatch = useDispatch<AppDispatchType>();
    const userId = useAppSelector(userIdSelector);

    const order = booking?.order
    const customerId = booking?.customerId
    const bookingId = booking?.id
    const dateOrder = booking?.dateOrder

    let dateHandedTo = null

    if (delivery?.dateHandedTo) {
        dateHandedTo = format(new Date(delivery?.dateHandedTo), 'dd.MM', {locale: ru})
    }

    const userBooked = customerId === userId

    const onclickHandlerOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowModal(true)
        dispatch(thunkForTest(bookId))
        if (dateOrder) {
            setClickDate(true)
        }
    }

    const backgroundOnClickHandler = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowModal(false)
        setClickDate(false)
    }

    const onClickClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowModal(false)
        setClickDate(false)
    }
    const buttonStyleForCalendar = [className ? `${styles.buttonCommon} ${className}` : styles.buttonCommon,
        order ? styles.buttonBooked : styles.buttonNotBooked,
        order && (userBooked ? styles.buttonBooked : styles.buttonDisabled),
        !!dateHandedTo && styles.buttonDisabled
    ].join(' ')

    const nameButtonForCalendar = order ? (dateHandedTo ? `Занята до ${dateHandedTo}` : 'Забронирована') : (dateHandedTo ? `Занята до ${dateHandedTo}` : 'Забронировать')

    const buttonStyleForRating = [className ? `${styles.buttonCommon} ${className}` : styles.buttonCommon,
        commentForBook ? styles.buttonBooked : styles.buttonNotBooked].join(' ')

    useEffect(() => {
        window.scroll(0, 0)
        if (showModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

    }, [showModal]);

    return (
        // eslint-disable-next-line react/jsx-no-undef
        <React.Fragment>
            {mode === 'calendar' &&
                <ButtonComponent data-test-id='booking-button'
                                 disabled={(order && !userBooked) || !!dateHandedTo}
                                 className={buttonStyleForCalendar}
                                 onClick={onclickHandlerOpen}>
                    {nameButtonForCalendar}
                </ButtonComponent>}
            {mode === 'rating' && (lengthHistoryForProfile ?
                <ButtonComponent data-test-id='history-review-button'
                                 className={yourComment
                                     ? `${commonButton.buttonCommon} ${styles.buttonEdit}` : `${commonButton.buttonCommon} ${styles.buttonAssess}`}
                                 onClick={onclickHandlerOpen}>
                    {yourComment ? 'Изменить оценку' : 'Оставить отзыв'}
                </ButtonComponent>
                :
                <ButtonComponent data-test-id='button-rate-book'
                                 className={buttonStyleForRating}
                                 onClick={onclickHandlerOpen}>
                    {commentForBook ? 'Изменить оценку' : 'Оценить книгу' }
                </ButtonComponent>)}
            <ModalComponent
                commentForBook={commentForBook}
                yourComment={yourComment}
                backgroundOnClick={backgroundOnClickHandler}
                show={showModal}
                mode={mode}
                bookId={bookId}
                userBooked={userBooked}
                bookingId={bookingId}
                dateOrder={dateOrder ? dateOrder : null}
                clickDate={clickDate}
                setClickDate={setClickDate}
            >
                <ButtonComponent data-test-id='modal-close-button' className={styles.closeModal}
                                 onClick={onClickClose}>
                    <img src={iconCloseModal} alt="close-modal"/>
                </ButtonComponent>
            </ModalComponent>
        </React.Fragment>
    );
};
