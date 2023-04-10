import {FC, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

import {useAppSelector} from '../../../../app/store';
import {layoutSelector} from '../../../../app/use-app-selectors';
import basicImage from '../../../../assets/image/basicImage.png';
import {ModalContainer} from '../../../../common/components/modal';
import {StarsComponent} from '../../../../common/components/stars';
import {authorsOrCategoriesBook} from '../../../../common/utils/utils-autors-or-categories';
import {showPicture} from '../../../../common/utils/utils-for-image';
import {BookComponentPropsType} from '../book-component';
import {LightingComponent} from '../lighting/lighting-component';

import additionalStyleForButton
    from '../../../../common/styles/additional-style-for-button.module.scss';
import additionalStyleForStars
    from '../../../../common/styles/additional-style-for-stars.module.scss';
import styles from './tile-component.module.scss';

type TileComponentType = Omit<BookComponentPropsType, 'display'>

export const TileComponent: FC<TileComponentType> = ({rating, title, year, authors, delivery, booking, image, bookId, sortInput, lengthHistoryForProfile, yourComment

                                                     }) => {
    const navigate = useNavigate();

    const {url} = useAppSelector(layoutSelector);

    const onclickHandler = () => {
        if (lengthHistoryForProfile) {
            navigate(`/books/all/${bookId}/`)
        } else navigate(`/books/${url}/${bookId}/`);
    };

    const light = useCallback((value: string) => <LightingComponent title={value}
                                                                    sortInput={sortInput}/>
        , [sortInput])

    return (
        <div
            role='button'
            className={lengthHistoryForProfile ? `${styles.tileContainer} ${styles.tileContainerForProfile}` : styles.tileContainer}
            onClick={onclickHandler}
            data-test-id='card'
            tabIndex={0}
            onKeyDown={() => null}
        >
            <img src={showPicture(image ? image.url : null, basicImage)} alt='book'
                 className={styles.img}/>
            <StarsComponent rating={rating} className={additionalStyleForStars.starsTileComponent}/>
            <div className={styles.title}>
                <p>
                    {light(title)}
                </p>
            </div>
            <div className={styles.author}>{`${authorsOrCategoriesBook(authors)}, ${year}`}</div>
            <div className={styles.buttonContainer}>
                {lengthHistoryForProfile ?
                    <ModalContainer className={additionalStyleForButton.buttonTileComponent}
                                    delivery={delivery}
                                    booking={booking}
                                    mode='rating'
                                    bookId={bookId.toString()}
                                    lengthHistoryForProfile={lengthHistoryForProfile}
                                    yourComment={yourComment}

                    />
                    :
                    <ModalContainer className={additionalStyleForButton.buttonTileComponent}
                                    delivery={delivery}
                                    booking={booking}
                                    mode='calendar'
                                    bookId={bookId.toString()}/>}

            </div>
        </div>
    );
};
