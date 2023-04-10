import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {Navigate, useNavigate} from 'react-router-dom';

import {LoginFormType} from '../../app/app-api';
import {loginTC, setIsRegisteredInAC, setStepAC} from '../../app/auth-reducer';
import {AppDispatchType, useAppSelector} from '../../app/store';
import {appSelector, authSelector} from '../../app/use-app-selectors';
import eyeClose from '../../assets/image/eyeClose.svg'
import eyeOpen from '../../assets/image/eyeOpen.svg'
import iconArrow from '../../assets/image/iconArrow.svg';
import {ButtonComponent} from '../../common/components/button';
import {ROUTS} from '../../common/utils/utils-for-routs';

import {ErrorModal} from './error-modal';

import commonStyle from '../../common/styles/form-common.module.scss'
import styles from './auth.module.scss'

export const Auth = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatchType>();
    const {error} = useAppSelector(appSelector);
    const {isToken} = useAppSelector(authSelector);

    const emptyValue = 'Поле не может быть пустым'
    const errorMessage = 'Request failed with status code 400'

    const [dataForm, setDataForm] = useState<LoginFormType>();
    const [typeButton, setTypeButton] = useState('password');
    const [emptyErrorEmail, setEmptyErrorEmail] = useState(false);
    const [emptyErrorPassword, setEmptyErrorPassword] = useState(false);


    const handleToggle = () => {
        if (typeButton === 'password') {
            setTypeButton('text');
        } else {
            setTypeButton('password');
        }
    };

    const {
        register,
        handleSubmit, watch, clearErrors
    } = useForm<LoginFormType>({mode: 'onBlur'})

    const valueUsername = watch('identifier');
    const valuePassword = watch('password');

    const onSubmit: SubmitHandler<LoginFormType> = (data) => {
        setDataForm(data)
        dispatch(loginTC(data))
    };
    const callBack = () => {
        if (dataForm) {
            dispatch(loginTC(dataForm))
        }

    }
    const onClickHandlerRegister = () => {
        navigate(ROUTS.REGISTRATION)
        dispatch(setIsRegisteredInAC(false))
        dispatch(setStepAC(1))
    }
    const onClickHandlerRestore = () => {
        navigate(ROUTS.FORGOT_PASS)
    }

    const onClickHandlerForgot = () => {
        navigate(ROUTS.FORGOT_PASS)
    }

    if (isToken) {
        return <Navigate to={ROUTS.INITIAL}/>
    }

    return (
        <div data-test-id='auth'
             className={error === errorMessage ? commonStyle.signUp : `${commonStyle.signUp} ${styles.signUp}`}>
            <div
                className={error === errorMessage ? commonStyle.cleverLand : `${commonStyle.cleverLand} ${styles.cleverLand}`}>Cleverland
            </div>
            {(!error || error === errorMessage) && <div className={commonStyle.commonContainer}>
                <div className={commonStyle.container}>
                    <div className={commonStyle.stepContainer}>
                        <h4 className={commonStyle.register}>Вход в личный кабинет</h4>
                    </div>
                    <form data-test-id='auth-form' onSubmit={handleSubmit(onSubmit)}
                          className={commonStyle.formContainer}>
                        <div className={commonStyle.labelContainer}>
                            <span
                                className={valueUsername ? `${commonStyle.labelFocus} ${commonStyle.label}` : commonStyle.labelFocus}>Логин</span>
                            <input
                                autoComplete="new-password"
                                type='text'
                                className={error === errorMessage ? `${commonStyle.inputCommon} ${commonStyle.inputCommonError}` : commonStyle.inputCommon}
                                placeholder="Логин"
                                onFocus={() => {
                                    clearErrors('identifier')
                                    setEmptyErrorEmail(false)
                                }}
                                {...register('identifier', {
                                    onBlur: () => {
                                        if (valueUsername) {
                                            setEmptyErrorEmail(false)
                                        } else setEmptyErrorEmail(true)
                                    }
                                })}
                            />
                        </div>
                        {emptyErrorEmail
                            ?
                            <div data-test-id='hint'
                                 className={commonStyle.helperError}>{emptyValue}
                            </div>
                            :
                            <div data-test-id='hint'
                                className={`${commonStyle.emptyDiv} ${styles.emptyDiv}`}>{true}
                            </div>
                        }
                        <div className={commonStyle.labelContainer}>
                            <span
                                className={valuePassword ? `${commonStyle.labelFocus} ${commonStyle.label}` : commonStyle.labelFocus}>Пароль</span>
                            <input
                                autoComplete="new-password"
                                type={typeButton}
                                className={error === errorMessage ? `${commonStyle.inputCommon} ${commonStyle.inputCommonError}` : commonStyle.inputCommon}
                                placeholder="Пароль"
                                onFocus={() => {
                                    clearErrors('password')
                                    setEmptyErrorPassword(false)
                                }}
                                {...register('password', {
                                    onBlur: () => {
                                        if (valuePassword) {
                                            setEmptyErrorPassword(false)
                                        } else setEmptyErrorPassword(true)
                                    }
                                })}
                            />
                            <button
                                type='button'
                                className={commonStyle.eyeStyles}
                                onClick={handleToggle}
                            >
                                {valuePassword && (typeButton === 'password' ?
                                    <img data-test-id='eye-closed' src={eyeClose} alt='eye-close'/> :
                                    <img data-test-id='eye-opened' src={eyeOpen} alt='eye-open'/>)}
                            </button>
                        </div>
                        {emptyErrorPassword
                            ?
                            <div data-test-id='hint'
                                 className={commonStyle.helperError}>{emptyValue}
                            </div>
                            :
                            <div
                                 className={`${commonStyle.emptyDiv} ${styles.emptyDiv}`}>{true}
                            </div>
                        }
                        {error === errorMessage ? <div>
                                <div data-test-id='hint'
                                     className={`${commonStyle.helperError} ${styles.helperError}`}>Неверный
                                    логин или пароль!
                                </div>
                                <ButtonComponent className={styles.buttonRestore}
                                                 onClick={onClickHandlerRestore}>
                                    Восстановить?
                                </ButtonComponent>
                            </div> :
                            <ButtonComponent data-test-id='hint'
                                             className={`${commonStyle.helper}  ${styles.helper}`}
                                             onClick={onClickHandlerForgot}>Забыли логин
                                или пароль?
                            </ButtonComponent>}
                        <button type='submit'
                                className={commonStyle.buttonSubmit}>
                            Вход
                        </button>
                    </form>
                    <div className={commonStyle.enterContainer}>
                        <div className={commonStyle.account
                        }>Нет учётной записи?
                        </div>
                        <ButtonComponent
                            type='button'
                            className={commonStyle.arrow}
                            onClick={onClickHandlerRegister}
                        >
                            <div>Регистрация</div>
                            <img src={iconArrow} alt='arrow'/>
                        </ButtonComponent>
                    </div>
                </div>
            </div>}
            {error && error !== errorMessage &&
                <ErrorModal callBack={callBack}/>}
        </div>
    );
}



