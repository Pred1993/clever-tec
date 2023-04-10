import {FC, useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

import {AppDispatchType, useAppSelector} from '../../../app/store';
import {
    appSelector,
    layoutSelector,
    profileUserInformSelector
} from '../../../app/use-app-selectors';
import avatarBasic from '../../../assets/image/avatar.svg';
import logoImage from '../../../assets/image/logo.svg';
import {setNavigationAC, setUrlAC} from '../../../features/layout/layout-reduсer';
import {showPicture} from '../../utils/utils-for-image';
import {ButtonComponent} from '../button';
import {ErrorComponent} from '../error';
import {ResponseModal} from '../response-modal';

import {ExitModal} from './exit-modal';
import {NavComponent} from './nav';

import styleContainer from '../../styles/container.module.scss';
import styles from './header-component.module.scss';

type HeaderComponentType = {
    title: string
}

export const HeaderComponent: FC<HeaderComponentType> = ({title}) => {
    const [exitModal, setExitModal] = useState(false);

    const dispatch = useDispatch<AppDispatchType>();
    const {error, responseModal, responseModalMessage, showModalFlag} = useAppSelector(appSelector);
    const {firstName, avatar} = useAppSelector(profileUserInformSelector);
    const {navigation} = useAppSelector(layoutSelector);

    const ref = useRef<HTMLDivElement | null>(null);

    const callback = (nav: boolean) => {
        dispatch(setNavigationAC(nav));
    };

    const onclickHandlerExitModal = () => {
        setExitModal(!exitModal)
    }

    useEffect(() => {
        const onClickHandler = (e: any): void => {
            if (!ref.current?.contains(e.target)) {
                dispatch(setNavigationAC(false));
            }
        };

        if (navigation) {
            document.addEventListener('click', onClickHandler);
        } else document.removeEventListener('click', onClickHandler);

        return () => document.removeEventListener('click', onClickHandler);
    }, [navigation, dispatch]);

    return (
        <div className={`${styles.headerContainer}`}>
            {responseModal === 'error' && showModalFlag &&
                <ResponseModal title={responseModalMessage}/>
            }
            {responseModal === 'success' && showModalFlag &&
                <ResponseModal title={responseModalMessage}/>}

            {error && <ErrorComponent/>}
            <header className={`${styleContainer.container} ${styles.header}`}>
                <ButtonComponent
                    data-test-id='button-burger'
                    type='button'
                    onClick={(e) => {
                        dispatch(setNavigationAC(!navigation));
                        e.stopPropagation();
                    }}
                    className={navigation ? `${styles.common} ${styles.cross}` : `${styles.common} ${styles.hamburger}`}
                >
                    <span>{true}</span>
                    <span>{true}</span>
                    <span>{true}</span>
                </ButtonComponent>
                <NavComponent navigation={navigation} ref={ref} callback={callback}/>
                <Link onClick={() => dispatch(setUrlAC('all'))} className={styles.logo} to='/books/all'>
                    <img src={logoImage} alt='logo' className={styles.logoImg}/>
                </Link>
                <div>
                    <h3 className={styles.library}>{title}</h3>
                </div>
                <div role='button' tabIndex={0} onKeyDown={() => null} className={styles.ava}
                     onClick={onclickHandlerExitModal}>
                    <div className={styles.userName}>{`Привет ${firstName}!`}</div>
                    <img src={showPicture(avatar, avatarBasic)} className={styles.avatar} alt="avatar"/>
                    {exitModal && <ExitModal/>}
                </div>
            </header>
        </div>
    );
};
