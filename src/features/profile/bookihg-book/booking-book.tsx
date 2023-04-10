import {useAppSelector} from '../../../app/store';
import {profileUserInformSelector} from '../../../app/use-app-selectors';
import {ListComponent} from '../../../pages/main/book/list';
import {CommonEmptyContainer} from '../common-empty-container';
import {CommonErrorContainer} from '../common-error-container';

import styles from './booking-book.module.scss'

export const BookingBook = () => {

    const {booking} = useAppSelector(profileUserInformSelector);

    if (!booking) {
        return <div>{true}</div>
    }

    // conversion into "2022-11-23T00:00:00.000Z" format
    const requestFormat = new Date();

    requestFormat.setHours(requestFormat.getHours() + 3);
    const today = requestFormat.toISOString().slice(0, 10);
    //
    let expired

    if (booking.dateOrder) {
        expired = today.slice(0, 10) > booking.dateOrder.slice(0, 10)
    }

    return booking.book
        ? <div className={styles.container}>
            <ListComponent
                image={{url: booking.book.image}}
                bookId={booking.book.id}
                title={booking.book.title}
                rating={booking.book.rating}
                year={booking.book.issueYear}
                authors={booking.book.authors}
                orderForProfile={booking.order}
                expired={expired}
            />
            {expired && <CommonErrorContainer text1='Дата бронирования' text2='книги истекла'
                                              text3='Через 24 часа книга будет доступна всем'/>}
        </div>
        : <CommonEmptyContainer text1='Забронируйте книгу' text2='и она отобразится'/>
};

