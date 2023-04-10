import React, { FC } from 'react';
import { createPortal } from 'react-dom';

import { CommentsBookType, GetAuthMeCommentsType } from '../../../../app/app-api';
import { CalendarComponent } from '../../calendar';
import { ReviewComponent } from '../../review';

import styles from './modal-component.module.scss';

type ModalComponentType = {
    show: boolean
    children: React.ReactNode
    mode: string
    bookId: string
    userBooked: boolean
    bookingId: number | undefined
    dateOrder: string | null
    clickDate: boolean
    setClickDate: (clickDate: boolean) => void
    yourComment?: GetAuthMeCommentsType
    commentForBook?: CommentsBookType
    backgroundOnClick?: (e: React.MouseEvent) => void;
    modalOnClick?: () => void;
}

const portal = document.getElementById('portal') as HTMLElement

export const ModalComponent: FC<ModalComponentType> = (
    {
        backgroundOnClick = () => {
        },
        modalOnClick = () => {
        },
        show,
        children,
        mode,
        bookId,
        userBooked,
        bookingId,
        dateOrder,
        setClickDate,
        clickDate,
        yourComment,
        commentForBook
    }
) => {


    const onClickHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        backgroundOnClick(e)
    }

    const modalOnClickHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
        modalOnClick()
    }

    if (!show) return null;

    return mode === 'calendar'
        ? createPortal(<React.Fragment>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <div data-test-id='modal-outer' role="button" tabIndex={0} className={styles.backGround}
                 onClick={onClickHandler}
                 onKeyUp={() => null}

            />

            <div data-test-id='booking-modal' role="button" tabIndex={0}
                 className={userBooked ? `${styles.modal} ${styles.modalEdit}` : styles.modal}
                 onClick={modalOnClickHandler}
                 onKeyUp={() => null}
            >
                <div className={styles.contentContainer}>
                    {userBooked
                        ? <div data-test-id='modal-title'
                               className={styles.title}>Изменение даты <br/> бронирования</div>
                        : <div data-test-id='modal-title'
                               className={styles.title}>Выбор даты <br/> бронирования</div>}
                    <CalendarComponent dateOrder={dateOrder} bookingId={bookingId}
                                       userBooked={userBooked} callBack={onClickHandler}
                                       bookId={bookId} clickDate={clickDate}
                                       setClickDate={setClickDate}/>
                </div>
                {children}
            </div>
        </React.Fragment>, portal)

        : createPortal(<React.Fragment>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <div data-test-id='modal-outer' role="button" tabIndex={0} className={styles.backGround}
                 onClick={onClickHandler}
                 onKeyUp={() => null}
            />
            <div data-test-id='modal-rate-book' role="button" tabIndex={0} className={styles.modal}
                 onClick={modalOnClickHandler}
                 onKeyUp={() => null}
            >
                <div className={styles.contentContainer}>
                    <div data-test-id='modal-title'
                         className={styles.title}> {yourComment ? 'Хотите изменить оценку?' : 'Оцените книгу'}</div>
                    <ReviewComponent callBack={onClickHandler} bookId={bookId}
                                     yourComment={yourComment} commentForBook={commentForBook}
                    />
                </div>
                {children}
            </div>
        </React.Fragment>, portal)
}

