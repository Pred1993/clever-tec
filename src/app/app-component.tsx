import {useEffect} from 'react';
import Lottie from 'react-lottie';
import {useDispatch} from 'react-redux';
import {Navigate, Route, Routes} from 'react-router-dom';

import {loadToken} from '../common/utils/utils-for-local-storage';
import {defaultOptions, styleFunction} from '../common/utils/utils-for-preloader';
import {ROUTS} from '../common/utils/utils-for-routs';
import {Auth} from '../features/auth';
import {ForgotPassword1} from '../features/forgot-pass/forgot-password-1';
import {LayoutMainPage} from '../features/layout';
import {setBooksTC, setGenresTC} from '../features/layout/layout-reduсer';
import {SignUp1} from '../features/login/sign-up/sign-up-step-1';
import {Profile} from '../features/profile';
import {addUserInformTC} from '../features/profile/profile-reducer';
import {BookPage} from '../pages/book';
import {MainPage} from '../pages/main';
import {TermsPage} from '../pages/terms';

import {setIsTokenAC} from './auth-reducer';
import {setSortBooksAC} from './sort-reducer';
import {AppDispatchType, useAppSelector} from './store';
import {appSelector, authSelector, layoutSelector} from './use-app-selectors';

import styles from './app-component.module.scss';


export const AppComponent = () => {
    const dispatch = useDispatch<AppDispatchType>();
    const {isPreloader} = useAppSelector(appSelector);
    const {isToken} = useAppSelector(authSelector);
    const {genres, books} = useAppSelector(layoutSelector);

    const appClass = isPreloader ? styles.app : '';

    useEffect(() => {
        const tokenFromStorage = loadToken()

        if (tokenFromStorage) {
            dispatch(setIsTokenAC(tokenFromStorage))
        }
    }, [dispatch]);

    useEffect(() => {
        if (isToken) {
            dispatch(setGenresTC());
            dispatch(setBooksTC());
            dispatch(addUserInformTC())
        }

    }, [dispatch, isToken]);



    useEffect(() => {
        if (books.length && genres.length) {
            dispatch(setSortBooksAC(books, genres))
        }

    }, [dispatch, books, genres]);

    return (
        <div>
            <div data-test-id='loader' className={styles.preloader}
                 style={{position: 'relative'}}>
                {isPreloader ? <Lottie options={defaultOptions} style={styleFunction()}/> : ''}
            </div>
            <div className={appClass}>
                <Routes>
                    <Route path={ROUTS.INITIAL} element={<Navigate to={ROUTS.DEFAULT}/>}/>
                    <Route path={ROUTS.INITIAL} element={<LayoutMainPage/>}>
                        <Route path={ROUTS.INITIAL} element={<Navigate to={ROUTS.DEFAULT}/>}/>
                        <Route path='/*' element={<Navigate to={ROUTS.DEFAULT}/>}/>
                        <Route path={ROUTS.CATEGORY} element={<MainPage/>}/>
                        <Route path={ROUTS.TERMS}
                               element={<TermsPage contentView='Правила пользования'/>}/>
                        <Route path={ROUTS.CONTRACT}
                               element={<TermsPage contentView='Договор оферты'/>}/>
                    </Route>
                    <Route path={ROUTS.BOOK} element={<BookPage/>}/>
                    <Route path={ROUTS.PROFILE} element={<Profile/>}/>
                    <Route path={ROUTS.AUTH} element={<Auth/>}/>
                    <Route path={ROUTS.REGISTRATION} element={<SignUp1/>}/>
                    <Route path={ROUTS.FORGOT_PASS} element={<ForgotPassword1/>}/>
                </Routes>
            </div>
        </div>
    );
};

