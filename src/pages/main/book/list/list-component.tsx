import React, {FC, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';

import {AppDispatchType, useAppSelector} from '../../../../app/store';
import {bookingSelector, layoutSelector, userIdSelector} from '../../../../app/use-app-selectors';
import basicImage from '../../../../assets/image/imageBasicForList.svg';
import {ButtonComponent} from '../../../../common/components/button';
import {ModalContainer} from '../../../../common/components/modal';
import {StarsComponent} from '../../../../common/components/stars';
import {authorsOrCategoriesBook} from '../../../../common/utils/utils-autors-or-categories';
import {showPicture} from '../../../../common/utils/utils-for-image';
import {deleteBookingTC} from '../../../book/book-reducer';
import {BookComponentPropsType} from '../book-component';
import {LightingComponent} from '../lighting/lighting-component';

import additionalStyleForButton
    from '../../../../common/styles/additional-style-for-button.module.scss';
import additionalStyleForStars
    from '../../../../common/styles/additional-style-for-stars.module.scss';
import commonButtonStyle from '../../../../common/styles/common-button.module.scss'
import styles from './list-component.module.scss';

type ListComponentType = Omit<BookComponentPropsType, 'display'>

export const ListComponent: FC<ListComponentType> = ({

                                                         rating,
                                                         title,
                                                         year,
                                                         authors,
                                                         delivery,
                                                         booking,
                                                         image,
                                                         bookId,
                                                         sortInput,
                                                         orderForProfile,
                                                         handedForProfile, dateHandedTo, expired
                                                     }) => {
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatchType>();
    const {url} = useAppSelector(layoutSelector);
    const {dateOrder} = useAppSelector(bookingSelector);
    const userId = useAppSelector(userIdSelector);
    const bookingId = useAppSelector(bookingSelector).id;

    let backBook = null

    if (dateHandedTo) {
        backBook = format(new Date(dateHandedTo), 'dd.MM', {locale: ru})
    }

    const light = useCallback((value: string) => <LightingComponent title={value}
                                                                    sortInput={sortInput}/>
        , [sortInput])

    const onclickHandler = () => {
        if (!orderForProfile && !handedForProfile) {
            navigate(`/books/${url}/${bookId}/`);
        } else navigate(`/books/all/${bookId}/`)
    };
    const onClickHandlerAbolish = () => {
        if (!expired && bookingId) {
            dispatch(deleteBookingTC({
                data: {
                    order: true,
                    dateOrder,
                    book: bookId.toString(),
                    customer: userId.toString()
                }
            }, bookingId.toString()))
        }
    }

    return (
        <div
            role='button'
            tabIndex={0}
            className={(orderForProfile || handedForProfile) ? `${styles.listContainer} ${styles.listContainerForProfile}` : styles.listContainer}
            onClick={onclickHandler}
            onKeyDown={() => null}
            data-test-id='card'
        >
            <img src={showPicture(image ? image.url : null, basicImage)} alt='book'
                 className={styles.img}/>
            <div
                className={(orderForProfile || handedForProfile) ? `${styles.description} ${styles.descriptionForProfile}` : styles.description}>
                <h5 className={styles.title}>{light(title)}</h5>
                <div
                    className={styles.author}>{`${authorsOrCategoriesBook(authors)}, ${year}`}</div>
                <div className={styles.ratingContainer}>
                    <StarsComponent
                        rating={rating}
                        className={additionalStyleForStars.starsListComponent}
                        className2={additionalStyleForStars.starListComponent}
                        classNameSvg={additionalStyleForStars.starListComponentForSvg}
                    />
                    <div className={styles.buttonContainer}>
                        {(orderForProfile || handedForProfile)
                            ? <React.Fragment>{orderForProfile && <ButtonComponent data-test-id='cancel-booking-button'
                                                                                   className={`${commonButtonStyle.buttonCommon} ${styles.buttonAbolish}`}
                                onClick={onClickHandlerAbolish
                                }>
                                Отменить бронь
                            </ButtonComponent>}
                                {handedForProfile && <div
                                    className={styles.dateHandedFrom}>{`возврат ${backBook}`}</div>}
                            </React.Fragment>
                            :
                            <ModalContainer mode='calendar'
                                            className={additionalStyleForButton.buttonListComponent}
                                            booking={booking}
                                            delivery={delivery}
                                            bookId={bookId.toString()}
                            />}
                    </div>
                </div>
            </div>
        </div>
    );
};
