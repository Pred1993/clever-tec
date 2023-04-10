import {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import InputMask from 'react-input-mask'
import {useDispatch} from 'react-redux';

import {AppDispatchType, useAppSelector} from '../../../app/store';
import {profileUserInformSelector, userIdSelector} from '../../../app/use-app-selectors';
import eyeClose from '../../../assets/image/eyeClose.svg';
import eyeOpen from '../../../assets/image/eyeOpen.svg';
import {utilsForPassword} from '../../../common/utils/utils-for-password';
import {utilsForUsername} from '../../../common/utils/utils-for-username';
import {editUserInformTC} from '../profile-reducer';

import commonButtonStyle from '../../../common/styles/common-button.module.scss'
import styles from './form-for-profile.module.scss'


export type FormProfileType = {
    login: string
    password: string
    email: string
    firstName?: string
    lastName?: string
    phone?: string
}


export const FormForProfile = () => {

    const [typeButton, setTypeButton] = useState('password');
    const [username, setUsername] = useState<string>('emptyField');
    const [comparePassword, setPasswordCompare] = useState<string[]>(['lengthComplete', 'upperCaseComplete', 'numberComplete']);
    const [edit, setEdit] = useState(true);

    const dispatch = useDispatch<AppDispatchType>();
    const userId = useAppSelector(userIdSelector);
    const userInform = useAppSelector(profileUserInformSelector);

    const emptyValue = 'Поле не может быть пустым'
    const errorLogin = 'Используйте для логина латинский алфавит и цифры'
    const errorPassword = 'Пароль не менее 8 символов, с заглавной буквой и цифрой'
    const errorPhone = 'В формате +375 (xx) xxx-xx-xx'
    const errorEmail = 'Введите корректный e-mail'

    const handleToggle = () => {
        if (typeButton === 'password') {
            setTypeButton('text');
        } else {
            setTypeButton('password');
        }
    };

    const {
        register,
        formState: {errors},
        handleSubmit, clearErrors, watch, setError, setValue
    } = useForm<FormProfileType>({mode: 'onBlur'})

    const valueEmail = watch('email', userInform.email)
    const valueUsername = watch('login', userInform.username);
    const valuePassword = watch('password');
    const valueFirstName = watch('firstName', userInform.firstName)
    const valueLastName = watch('lastName', userInform.lastName)
    const valuePhone = watch('phone', userInform.phone)

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            const {login} = value
            const {password} = value

            if (name === 'login' && login) {
                setUsername(utilsForUsername(login))
            }
            if (name === 'password' && password) {
                setPasswordCompare(utilsForPassword(password))
            }

            return () => subscription.unsubscribe()
        })
    }, [watch]);

    useEffect(() => {
        setValue('login', userInform.username)
        setValue('email', userInform.email)
        setValue('firstName', userInform.firstName)
        setValue('lastName', userInform.lastName)
        setValue('phone', userInform.phone)
    }, [userInform, setValue])

    const onSubmit: SubmitHandler<FormProfileType> = async (data) => {
        dispatch(editUserInformTC(data, userId.toString()))
    };

    const onclickHandlerEdit = () => {
        setEdit(!edit)
    }

    const disabled = edit

    return (
        <div>
            <form  data-test-id='profile-form'
                onSubmit={handleSubmit(onSubmit)}
                  className={styles.formContainer}>
                <div>
                    <div className={styles.labelContainer}>
                            <span
                                className={valueUsername ? `${styles.labelFocus} ${styles.label}` : styles.labelFocus}>Логин</span>
                        <input disabled={edit}
                               // defaultValue={valueUsername}
                               autoComplete="new-password"
                               type='text'
                               className={errors?.login ? `${styles.inputCommon} ${styles.inputCommonError}` : styles.inputCommon}
                               placeholder="Логин"
                               onFocus={() => {
                                   clearErrors('login')
                               }}
                               {...register('login', {
                                   required: emptyValue,
                                   pattern: {
                                       value: /^(?=^.{1,}$)((?=.*\d)(?=.*[a-zA-Z]))[0-9a-zA-Z]*$/,
                                       message: errorLogin
                                   },
                                   onBlur: () => {
                                       if (!valueUsername) {
                                           setError('login', {
                                               type: 'onBlur',
                                               message: emptyValue
                                           })
                                       }
                                   }
                               })}
                        />
                    </div>
                    {errors?.login
                        ?
                        (errors?.login.message === emptyValue ?
                            <div data-test-id='hint'
                                 className={styles.helperError}>{emptyValue}</div> :
                            <div data-test-id='hint'
                                 className={styles.helperError}>{errorLogin}</div>)
                        :
                        <div data-test-id='hint' className={styles.helper}>Используйте
                            для логина <span
                                className={username === 'numberField' ? styles.red : ''}>латинский алфавит
                            </span> и
                            <span
                                className={username === 'letterField' ? styles.red : ''}> цифры</span>
                        </div>}</div>
                <div>
                    <div className={styles.labelContainer}>
                            <span
                                className={valuePassword ? `${styles.labelFocus} ${styles.label}` : styles.labelFocus}>Пароль</span>
                        <input disabled={edit}
                               autoComplete="new-password"
                               type={typeButton}
                               className={errors?.password ? `${styles.inputCommon} ${styles.inputCommonError}` : styles.inputCommon}
                               placeholder="Пароль"
                               onFocus={() => {
                                   clearErrors('password')
                               }}
                               {...register('password', {
                                   required: emptyValue,
                                   pattern: {
                                       value: /(?=.*[A-ZА-Я])(?=.*[0-9])[a-zA-Zа-яА-Я0-9]{8,}/,
                                       message: errorPassword
                                   },
                                   onBlur: () => {
                                       if (!valuePassword) {
                                           setError('password', {
                                               type: 'onBlur',
                                               message: emptyValue
                                           })
                                       }
                                   }
                               })}
                        />
                        <button
                            type='button'
                            className={styles.eyeStyles}
                            onClick={handleToggle}
                        >
                            {valuePassword && (typeButton === 'password' ?
                                <img data-test-id='eye-closed' src={eyeClose} alt='eye-close'/> :
                                <img src={eyeOpen} data-test-id='eye-opened' alt='eye-open'/>)}
                        </button>
                    </div>
                    {errors?.password
                        ?
                        (errors?.password.message === emptyValue ?
                            <div data-test-id='hint'
                                 className={styles.helperError}>{emptyValue}</div> :
                            <div data-test-id='hint'
                                 className={styles.helperError}>{errorPassword}</div>)
                        :
                        comparePassword.length < 3 ?
                            <div data-test-id='hint' className={styles.helper}>
                                Пароль <span data-test-id='hint'
                                             className={comparePassword[0] === 'lengthComplete' ? '' : styles.red}>не менее 8 символов</span>,
                                с <span data-test-id='hint'
                                        className={comparePassword[0] === 'upperCaseComplete' || comparePassword[1] === 'upperCaseComplete' ? '' : styles.red}>заглавной буквой</span> и <span
                                data-test-id='hint'
                                className={comparePassword[0] === 'numberComplete' || comparePassword[1] === 'numberComplete' ? '' : styles.red}>цифрой</span>
                            </div>
                            : <div data-test-id='hint'
                                   className={styles.helper}>{errorPassword}</div>

                    }</div>

                <div>
                    <div className={styles.labelContainer}>
                            <span
                                className={valueFirstName ? `${styles.labelFocus} ${styles.label}` : styles.labelFocus}>Имя</span>
                        <input disabled={edit}
                               // defaultValue={valueFirstName}
                               autoComplete="new-password"
                               type='text'
                               className={styles.inputCommon}
                               placeholder="Имя"
                               onFocus={() => {
                                   clearErrors('firstName')
                               }}
                               {...register('firstName')}
                        />
                    </div>
                    <div data-test-id='hint'
                         className={`${styles.emptyDiv} ${styles.helper}`}>{true}
                    </div>
                </div>
                <div>
                    <div className={styles.labelContainer}>
                            <span
                                className={valueLastName ? `${styles.labelFocus} ${styles.label}` : styles.labelFocus}>Фамилия</span>
                        <input disabled={edit}
                               // defaultValue={valueLastName}
                               autoComplete="new-password"
                               type='text'
                               className={styles.inputCommon}
                               placeholder="Фамилия"
                               onFocus={() => {
                                   clearErrors('lastName')
                               }}
                               {...register('lastName')}
                        />
                    </div>
                    <div data-test-id='hint'
                         className={`${styles.emptyDiv} ${styles.helper}`}>{true}
                    </div>
                </div>
                <div>
                    <div className={styles.labelContainer}>
                            <span
                                className={valuePhone ? `${styles.labelFocus} ${styles.label}` : styles.labelFocus}>Номер телефона</span>


                        <InputMask
                            disabled={edit}
                            autoComplete="new-password"
                            value={valuePhone}
                            mask='+375 (99) 999-99-99'
                            alwaysShowMask={true}
                            maskPlaceholder='+375 (xx) xxx-xx-xx'
                            className={errors?.phone ? `${styles.inputCommon} ${styles.inputCommonError}` : styles.inputCommon}
                            onFocus={() => {
                                clearErrors('phone')
                            }}
                            {...register('phone', {
                                pattern: {
                                    value: /^\+375\s?\(?(?:25|29|33|44)\)?\s?\d{3}\s?-?\d{2}\s?-?\d{2}/g,
                                    message: errorPhone
                                }
                            })
                            }
                        />
                    </div>
                    {errors?.phone
                        ?
                        (errors.phone?.message === emptyValue
                            ?
                            <div data-test-id='hint'
                                 className={styles.helperError}>{emptyValue}</div>
                            : <div data-test-id='hint'
                                   className={styles.helperError}>{errors.phone.message}</div>)
                        : <div data-test-id='hint' className={styles.helper}>{errorPhone}</div>
                    }
                </div>
                <div>
                    <div className={styles.labelContainer}>
                            <span
                                className={valueEmail ? `${styles.labelFocus} ${styles.label}` : styles.labelFocus}>E-mail</span>
                        <input disabled={edit}
                               // defaultValue={valueEmail}
                               autoComplete="new-password"
                               type='email'
                               className={errors?.email ? `${styles.inputCommon} ${styles.inputCommonError}` : styles.inputCommon}
                               placeholder="E-mail"
                               onFocus={() => {
                                   clearErrors('email')
                               }}
                               {...register('email', {
                                   required: emptyValue,
                                   pattern: {
                                       value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
                                       message: errorEmail
                                   },
                                   onBlur: () => {
                                       if (!valueEmail) {
                                           setError('email', {
                                               type: 'onBlur',
                                               message: emptyValue
                                           })
                                       }
                                   }
                               })}
                        />
                    </div>
                    {errors?.email
                        ?
                        (errors.email?.message === emptyValue
                            ?
                            <div data-test-id='hint'
                                 className={styles.helperError}>{emptyValue}</div>
                            : <div data-test-id='hint'
                                   className={styles.helperError}>{errors.email.message}</div>)
                        : <div data-test-id='hint' className={styles.helper}>{errorEmail}</div>
                    }</div>
                <div className={styles.buttonContainer}>
                    <button data-test-id='edit-button' onClick={onclickHandlerEdit} type='button'
                            className={`${commonButtonStyle.buttonCommon} ${styles.buttonEdit}`}>Редактировать
                    </button>
                    <button data-test-id='save-button' disabled={disabled} type='submit'
                            className={disabled ? `${commonButtonStyle.buttonCommon} ${styles.buttonSubmitDisable}` : `${commonButtonStyle.buttonCommon} ${styles.buttonSubmit} ${styles.buttonSubmitDisable}`}>
                        Сохранить изменения
                    </button>
                </div>
            </form>
        </div>
    );
};

