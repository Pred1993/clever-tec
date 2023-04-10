import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Navigate, useNavigate, useParams} from 'react-router-dom';

import {AppDispatchType, useAppSelector} from '../../app/store';
import {appSelector, bookSelector, layoutSelector} from '../../app/use-app-selectors';
import vector from '../../assets/image/vector.svg';
import {FooterComponent} from '../../common/components/footer';
import {HeaderComponent} from '../../common/components/header';
import {loadToken} from '../../common/utils/utils-for-local-storage';
import {ROUTS} from '../../common/utils/utils-for-routs';
import {setBooksTC, setUrlAC} from '../../features/layout/layout-reduсer';
import {setSortInputAC} from '../main/main-reducer';

import {setBookTC} from './book-reducer';
import {CommentsComponent} from './comments';
import {DescriptionComponent} from './description';
import {InformationComponent} from './information';
import {RatingForBook} from './rating-for-book';

import styleContainer from '../../common/styles/container.module.scss';
import styles from './book-page.module.scss';

export const BookPage = () => {

    const {bookId, categoryBook} = useParams();
    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatchType>();
    const {responseModal, error, isPreloader} = useAppSelector(appSelector);
    const {title, rating, id} = useAppSelector(bookSelector);
    const {genres} = useAppSelector(layoutSelector);

    const content = isPreloader ? `${styles.content} ${styles.contentDownload}` : `${styles.content}`;
    const url = categoryBook;

    const genre = genres.find((el) => el.path === url);

    const verification = bookId === String(id);

    const category = genre ? genre.name : 'Все книги';

    const onClickHandler = () => {
        if (categoryBook) {
            dispatch(setUrlAC(categoryBook))
            navigate(`/books/${categoryBook}`)
        }
        dispatch(setBooksTC())
        dispatch(setSortInputAC(''))
    }

    useEffect(() => {
        if (responseModal && bookId) {
            dispatch(setBookTC(bookId))
        }
    }, [bookId, dispatch, responseModal]);


    useEffect(() => {
        if (bookId) {
            dispatch(setBookTC(bookId));
        }
    }, [dispatch, bookId]);

    if (!loadToken()) return <Navigate to={ROUTS.AUTH}/>

    return (
        <div>
            <HeaderComponent title='Библиотека'/>
            <section>
                <div className={content}>
                    <div className={`${styles.contentContainer}`}>
                    <span data-test-id='breadcrumbs-link' role='button' tabIndex={0}
                          onClick={onClickHandler} onKeyDown={() => null}
                          className={styles.category}>{category}
                    </span>
                        <img className={styles.vector} src={vector} alt='vector'/>
                        <span data-test-id='book-name'
                              className={styles.title}>{title ? title : ''}
                        </span>
                    </div>
                </div>
                {!error && !isPreloader && verification && (
                    <div className={styles.bookPageContainer}>
                        <div className={`${styleContainer.container} ${styles.bookPage}`}>
                            <DescriptionComponent bookId={bookId}/>
                            <RatingForBook rating={rating}/>
                            <InformationComponent/>
                            <CommentsComponent bookId={bookId}/>
                        </div>
                    </div>
                )}
            </section>
            <FooterComponent/>
        </div>
    );
};
