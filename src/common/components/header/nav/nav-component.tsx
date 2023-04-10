import {forwardRef} from 'react';
import {useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {setAppErrorAC} from '../../../../app/app-reducer';
import {setIsTokenAC} from '../../../../app/auth-reducer';
import {AppDispatchType, useAppSelector} from '../../../../app/store';
import {appSelector, layoutSelector, sortSelector} from '../../../../app/use-app-selectors';
import chevronOff from '../../../../assets/image/chevronOrangeOff.svg';
import chevronOn from '../../../../assets/image/chevronOrangeOn.svg';
import {
    setShowChevronAC,
    setUrlAC,
    setVisibilityAC
} from '../../../../features/layout/layout-reduсer';
import {saveToken} from '../../../utils/utils-for-local-storage';
import {ROUTS} from '../../../utils/utils-for-routs';

import styles from './nav-component.module.scss';

type NavComponentType = {
    navigation: boolean;
    callback: (showNav: boolean) => void;
};

export const NavComponent = forwardRef<HTMLDivElement, NavComponentType>(({navigation, callback}, ref) => {

    const dispatch = useDispatch<AppDispatchType>();
    const {showChevron,visibility, url, genres, books} = useAppSelector(layoutSelector);
    const {sortBooks} = useAppSelector(sortSelector);
    const {error} = useAppSelector(appSelector);

    const show = navigation ? `${styles.navGenres} ${styles.nawAppear}` : ` ${styles.navGenres} ${styles.navNotAppear}`;

    const onclickHandlerBooks = (link: string) => {
        dispatch(setUrlAC(link));
        dispatch(setShowChevronAC(true))
        callback(false);
    };

    const onclickHandlerAllBooks = () => {
        dispatch(setUrlAC('all'))
        callback(false);
    };

    const onClickHandlerWindow = () => {
        dispatch(setShowChevronAC(true))
        dispatch(setVisibilityAC(!visibility))
    };
    const onClickHandlerTerms = () => {
        dispatch(setUrlAC('all'));
        dispatch(setVisibilityAC(false));
        dispatch(setAppErrorAC(null));
        dispatch(setShowChevronAC(false))
    };

    const onClickHandlerExit = () => {
        dispatch(setUrlAC('all'));
        saveToken('')
        dispatch(setIsTokenAC(''))
        callback(false)
        dispatch(setVisibilityAC(true));
        dispatch(setAppErrorAC(null));
        dispatch(setShowChevronAC(true))
    }

    const genresClass = visibility ? `${styles.genres}` : `${styles.genresNone}`;
    const classActive = ({isActive}: any) => (isActive ? `${styles.active}` : '');
    const classActiveLine = ({isActive}: any) => (isActive ? `${styles.activeLine}` : '');


    const genresDrawing = !error && genres.map((el) => {
        const bookGroupLength = sortBooks[el.name] ? sortBooks[el.name].length : 0

        return (
            <li className={styles.genre} key={el.id}>
                <NavLink data-test-id={`burger-${el.path}`}
                         onClick={() => onclickHandlerBooks(el.path)}
                         className={classActive}
                         to={`/books/${el.path}`}>
                    {el.name}
                </NavLink>{' '}
                <span data-test-id={`burger-book-count-for-${el.path}`}
                      className={styles.number}>{bookGroupLength}</span>
            </li>
        )
    })

    return (
        <nav ref={ref} className={show} data-test-id='burger-navigation'>
            <div className={visibility ? styles.windowOn : styles.windowOff}>
                <NavLink data-test-id='burger-showcase' className={classActiveLine}
                         to={`${ROUTS.BOOKS}/${url}`}
                         onClick={onClickHandlerWindow}>
                    Витрина книг
                </NavLink>
                {visibility ? (showChevron &&
                    <img src={chevronOff} alt='chevron-off' className={styles.chevron}/>) : (showChevron &&
                    <img src={chevronOn} alt='chevron-on' className={styles.chevron}/>)}
            </div>
            {books.length ? (
                <ul className={genresClass}>
                    <div className={styles.allBooks}>
                        <NavLink data-test-id='burger-books' className={classActive}
                                 to={`${ROUTS.BOOKS}/all`} onClick={onclickHandlerAllBooks}>
                            Все книги
                        </NavLink>
                    </div>
                    {genresDrawing}
                </ul>
            ) : null}
            <div className={styles.terms}>
                <NavLink data-test-id='burger-terms' onClick={onClickHandlerTerms}
                         className={classActiveLine} to='/terms'>
                    Правила пользования
                </NavLink>
            </div>
            <div className={styles.contracts}>
                <NavLink
                    data-test-id='burger-contract'
                    onClick={onClickHandlerTerms}
                    className={classActiveLine}
                    to='/contract'
                >
                    Договор оферты
                </NavLink>
            </div>
            <div className={styles.navBorder}>
                <div className={styles.profile}>
                    <NavLink data-test-id='profile-button' onClick={onClickHandlerTerms} className={classActiveLine} to='/profile'>
                        Профиль
                    </NavLink>
                </div>
                <div className={styles.exit}>
                    <NavLink data-test-id='exit-button' onClick={onClickHandlerExit} className={classActiveLine} to='/books'>
                        Выход
                    </NavLink>
                </div>
            </div>
        </nav>
    );
});
