import {useAppSelector} from '../../../app/store';
import {profileUserInformSelector} from '../../../app/use-app-selectors';
import {ListComponent} from '../../../pages/main/book/list';
import {CommonEmptyContainer} from '../common-empty-container';
import {CommonErrorContainer} from '../common-error-container';

import styles from './delivery-book.module.scss';

export const DeliveryBook = () => {

    const {delivery} = useAppSelector(profileUserInformSelector);

    if (!delivery) {
        return <div>{true}</div>
    }

    // conversion into "2022-11-23T00:00:00.000Z" format
    const requestFormat = new Date();

    requestFormat.setHours(requestFormat.getHours() + 3);
    const today = requestFormat.toISOString().slice(0, 10);
    //
    let expired

    if (delivery.dateHandedTo) {
        expired = today.slice(0, 10) > delivery.dateHandedTo.slice(0, 10)
    }

    return delivery.book && delivery.dateHandedTo
        ? <div className={styles.container}>
            <ListComponent
                image={{url: delivery.book.image}}
                bookId={delivery.book.id}
                title={delivery.book.title}
                rating={delivery.book.rating}
                year={delivery.book.issueYear}
                authors={delivery.book.authors}
                dateHandedTo={delivery.dateHandedTo}
                handedForProfile={delivery.handed}
            />
            {expired && <CommonErrorContainer text1='Вышел срок' text2='пользования книги'
                                              text3='Верните книгу, пожалуйста'/>}
        </div>
        : <CommonEmptyContainer text1='Прочитав книгу, ' text2='она отобразится в истории'/>
};
