import {ChangeEvent, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Navigate} from 'react-router-dom';

import {AppDispatchType, useAppSelector} from '../../app/store';
import {
    appSelector,
    profileUserInformSelector,
    userIdSelector
} from '../../app/use-app-selectors';
import camera from '../../assets/image/camera.svg'
import basicImage from '../../assets/image/profileAvatarDefault.svg';
import rectangle from '../../assets/image/rectangle.png'
import {FooterComponent} from '../../common/components/footer';
import {HeaderComponent} from '../../common/components/header';
import {showPicture} from '../../common/utils/utils-for-image';
import {loadToken} from '../../common/utils/utils-for-local-storage';
import {ROUTS} from '../../common/utils/utils-for-routs';

import {FormForProfile} from './form-for-profile/form-for-profile';
import {BookingBook} from './bookihg-book';
import {CommonTitle} from './common-title';
import {DeliveryBook} from './delivery-book';
import {HistoryBooks} from './history-books';
import {addUserInformTC, uploadAvatarTC} from './profile-reducer';

import styleContainer from '../../common/styles/container.module.scss';
import styles from './profile.module.scss';

export const Profile = () => {

    const dispatch = useDispatch<AppDispatchType>();
    const {firstName, lastName, avatar} = useAppSelector(profileUserInformSelector);
    const userId = useAppSelector(userIdSelector);
    const {responseModal} = useAppSelector(appSelector);

    const uploadHandlerAvatar = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];

            dispatch(uploadAvatarTC(file, userId.toString()))
        }
    };


    useEffect(() => {
        dispatch(addUserInformTC())
    }, [dispatch]);

    useEffect(() => {
        if (responseModal) {
            dispatch(addUserInformTC())
        }
    }, [dispatch, responseModal]);

    if (!loadToken()) return <Navigate to={ROUTS.AUTH}/>

    return (
        <div>
            <HeaderComponent title='Личный кабинет'/>
            <section>
                <div className={styles.profileContainer}>
                    <div className={`${styleContainer.container} ${styles.profile}`}>
                        <header data-test-id='profile-avatar' id='input_add_photo'
                             className={styles.headerContainer}>
                            <label className={styles.avatarContainer}>
                                <input
                                    id='input_add_photo'
                                    type='file'
                                    style={{display: 'none'}}
                                    accept={'image/**'}
                                    onChange={uploadHandlerAvatar}
                                />
                                <div>
                                    <img src={showPicture(avatar, basicImage)} alt="avatar"
                                         className={styles.avatar}/>
                                </div>
                                <div>
                                    <img src={rectangle} className={styles.rectangle} alt="rectangle"/>
                                </div>
                                <div>
                                    <img src={camera} className={styles.camera} alt="camera"/>
                                </div>

                            </label>
                            <div className={styles.name}>
                                <div>{firstName}</div>
                                <div>{lastName}</div>
                            </div>
                        </header>
                        <div className={styles.formContainer}>
                            <CommonTitle title='Учетные данные' helper='Здесь вы можете отредактировать
                информацию о себе'/>
                            <FormForProfile/>
                        </div>
                        <div className={styles.bookingContainer}>
                            <CommonTitle title='Забронированная книга'
                                         helper='Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь'/>
                            <BookingBook/>
                        </div>
                        <div className={styles.deliveryContainer}>
                            <CommonTitle title='Книга которую взяли'
                                         helper='Здесь можете просмотреть информацию о книге и узнать сроки возврата'/>
                            <DeliveryBook/>
                        </div>
                        <div className={styles.historyContainer} data-test-id='history'>
                            <CommonTitle title='История' helper='Список прочитанных книг'/>
                            <HistoryBooks/>
                        </div>
                    </div>
                </div>
            </section>
            <FooterComponent/>
        </div>
    );
}
