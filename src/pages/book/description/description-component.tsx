import {FC} from 'react';

import {useAppSelector} from '../../../app/store';
import {bookSelector} from '../../../app/use-app-selectors';
import basicImage from '../../../assets/image/bookPageBasicImage.svg';
import {ModalContainer} from '../../../common/components/modal';
import {authorsOrCategoriesBook} from '../../../common/utils/utils-autors-or-categories';
import {showPicture} from '../../../common/utils/utils-for-image';

import {SwiperComponent} from './swiper';

import additionalStyleForButton
    from '../../../common/styles/additional-style-for-button.module.scss';
import styles from './description-component.module.scss';

type DescriptionComponentType = {
    bookId: string
}

export const DescriptionComponent: FC<DescriptionComponentType> = ({bookId}) => {

    const book = useAppSelector(bookSelector);

    return (
        <div className={styles.descriptionContainer}>
            {book.images && book.images.length > 1 ? (
                <SwiperComponent images={book.images}/>
            ) : (
                <img
                    className={styles.cover}
                    src={showPicture(book.images ? book.images[0].url : null, basicImage)}
                    alt='cover'
                />
            )}
            <div className={styles.description}>
                <h3 data-test-id='book-title'>{book.title}</h3>
                <h5>{`${authorsOrCategoriesBook(book.authors)}, ${book.issueYear}`}</h5>
                <div className={styles.buttonContainer}>
                    <ModalContainer
                        delivery={book.delivery}
                        booking={book.booking}
                        className={additionalStyleForButton.buttonBookPage}
                        mode='calendar'
                        bookId={bookId}
                    />
                </div>
                <div className={styles.text}>
                    <h5>О книге</h5>
                    <div className={styles.border}>{true}</div>
                    <p className={styles.paragraph}>{book.description}</p>
                </div>
            </div>
        </div>
    );
};
