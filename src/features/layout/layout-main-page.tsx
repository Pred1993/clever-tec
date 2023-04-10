import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';

import {AppDispatchType, useAppSelector} from '../../app/store';
import {appSelector, authSelector} from '../../app/use-app-selectors';
import {FooterComponent} from '../../common/components/footer';
import {HeaderComponent} from '../../common/components/header';
import {ROUTS} from '../../common/utils/utils-for-routs';
import {MainPage} from '../../pages/main';
import {TermsPage} from '../../pages/terms';

import {setBooksTC} from './layout-reduсer';
import {NavForLayout} from './nav-for-layout';

import styleContainer from '../../common/styles/container.module.scss';
import styles from './layout-main-page.module.scss';

export const LayoutMainPage = () => {

    const dispatch = useDispatch<AppDispatchType>();
    const url = useLocation();
    const {isToken} = useAppSelector(authSelector);
    const {responseModal} = useAppSelector(appSelector);

    useEffect(() => {
        if (responseModal) {
            dispatch(setBooksTC());
        }
    }, [dispatch, responseModal]);

    if (!isToken) return <Navigate to={ROUTS.AUTH}/>

    return (
        <div>
            <HeaderComponent title='Библиотека'/>
            <section data-test-id='main-page' className={styles.mainPageContainer}>
                <div className={`${styleContainer.container} ${styles.mainPage}`}>
                    <NavForLayout/>
                    {url.pathname.includes('books') && <MainPage/>}
                    {url.pathname === '/terms' && <TermsPage contentView='Правила пользования'/>}
                    {url.pathname === '/contract' && <TermsPage contentView='Договор оферты'/>}
                </div>
            </section>
            <FooterComponent/>
        </div>
    );
};
