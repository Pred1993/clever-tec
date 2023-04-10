import {useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {setAppErrorAC} from '../../../app/app-reducer';
import {AppDispatchType, useAppSelector} from '../../../app/store';
import {appSelector, layoutSelector, sortSelector} from '../../../app/use-app-selectors';
import chevronOff from '../../../assets/image/chevronOrangeOff.svg';
import chevronOn from '../../../assets/image/chevronOrangeOn.svg';
import {ROUTS} from '../../../common/utils/utils-for-routs';
import {setShowChevronAC, setUrlAC, setVisibilityAC} from '../layout-reduсer';

import styles from './nav-for-layout.module.scss';

export const NavForLayout = () => {

    const dispatch = useDispatch<AppDispatchType>();
    const {showChevron, url, visibility, genres, books} = useAppSelector(layoutSelector);

    const {sortBooks} = useAppSelector(sortSelector);
    const {error} = useAppSelector(appSelector);

    const onclickHandlerBooks = (link: string) => {
        dispatch(setUrlAC(link));
        dispatch(setShowChevronAC(true))
    };
    const onClickHandlerWindow = () => {
        dispatch(setVisibilityAC(!visibility))
        dispatch(setShowChevronAC(true))
    };
    const onClickHandlerTerms = () => {
        dispatch(setUrlAC('all'));
        dispatch(setVisibilityAC(false));
        dispatch(setAppErrorAC(null));
        dispatch(setShowChevronAC(false))
    };

    const genresList = visibility ? `${styles.genres}` : `${styles.genresNone}`;
    const classActive = ({isActive}: any) => (isActive ? `${styles.active}` : '');
    const classActiveLine = ({isActive}: any) => (isActive ? `${styles.activeLine}` : '');

    const genresDrawing = !error && genres.map((el) => {
        const bookGroupLength = sortBooks[el.name] ? sortBooks[el.name].length : 0

        return (
            <li className={styles.genre} key={el.id}>
                <NavLink data-test-id={`navigation-${el.path}`}
                         onClick={() => onclickHandlerBooks(el.path)}
                         className={classActive} to={`/books/${el.path}`}>
                    {el.name}
                </NavLink>{' '}
                <span data-test-id={`navigation-book-count-for-${el.path}`}
                      className={styles.number}>{bookGroupLength}</span>
            </li>
        )
    })

    return (
        <nav className={styles.navGenres}>
            <div className={visibility ? styles.windowOn : styles.windowOff}>
                <NavLink data-test-id='navigation-showcase'
                         to={`${ROUTS.BOOKS}/${url}`}
                         onClick={onClickHandlerWindow}
                         className={classActiveLine}>
                    Витрина книг
                </NavLink>
                {visibility ? (showChevron &&
                    <img src={chevronOff} alt='chevron-off' className={styles.chevron}/>) : (showChevron &&
                    <img src={chevronOn} alt='chevron-on' className={styles.chevron}/>)}
            </div>
            {books.length ? (
                <ul className={genresList}>
                    <div className={styles.allBooks}>
                        <NavLink data-test-id='navigation-books' className={classActive}
                                 to={`${ROUTS.BOOKS}/all`} onClick={() => dispatch(setUrlAC('all'))}>
                            Все книги
                        </NavLink>
                    </div>
                    {genresDrawing}
                </ul>
            ) : null}
            <div className={styles.terms}>
                <NavLink data-test-id='navigation-terms' onClick={onClickHandlerTerms}
                         className={classActiveLine} to='/terms'>
                    Правила пользования
                </NavLink>
            </div>
            <div className={styles.terms}>
                <NavLink
                    data-test-id='navigation-contract'
                    onClick={onClickHandlerTerms}
                    className={classActiveLine}
                    to='/contract'
                >
                    Договор оферты
                </NavLink>
            </div>
        </nav>
    );
};
