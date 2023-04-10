import {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {Navigate, useNavigate} from 'react-router-dom';

import {setDataFormAC, setStepAC} from '../../../../app/auth-reducer';
import {AppDispatchType, useAppSelector} from '../../../../app/store';
import {appSelector, authSelector} from '../../../../app/use-app-selectors';
import eyeClose from '../../../../assets/image/eyeClose.svg'
import eyeOpen from '../../../../assets/image/eyeOpen.svg'
import iconArrow from '../../../../assets/image/iconArrow.svg';
import successPassword from '../../../../assets/image/successPassword.svg'
import {ButtonComponent} from '../../../../common/components/button';
import {utilsForPassword} from '../../../../common/utils/utils-for-password';
import {ROUTS} from '../../../../common/utils/utils-for-routs';
import {utilsForUsername} from '../../../../common/utils/utils-for-username';
import {SignUp2} from '../sign-up-step-2';
import {SignUp3} from '../sign-up-step-3';

import {CommonModal} from './common-modal';

import commonStyle from '../../../../common/styles/form-common.module.scss'
import styles from './sign-up-step-1.module.scss'

export type FormValues = {
    username?: string
    password?: string
}

export const SignUp1 = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatchType>();
    const {isToken, isRegistered, step} = useAppSelector(authSelector);
    const {error} = useAppSelector(appSelector);

    const [typeButton, setTypeButton] = useState('password');
    const [username, setUsername] = useState<string>('emptyField');
    const [comparePassword, setPasswordCompare] = useState<string[]>(['lengthComplete', 'upperCaseComplete', 'numberComplete']);

    const emptyValue = 'Поле не может быть пустым'
    const errorLogin = 'Используйте для логина латинский алфавит и цифры'
    const errorPassword = 'Пароль не менее 8 символов, с заглавной буквой и цифрой'

    const handleToggle = () => {
        if (typeButton === 'password') {
            setTypeButton('text');
        } else {
            setTypeButton('password');
        }
    };

    const {
        register,
        formState: {errors, isValid},
        handleSubmit, clearErrors, watch, setError, reset
    } = useForm<FormValues>({mode: 'onBlur' || 'onChange' })

    const valueUsername = watch('username');
    const valuePassword = watch('password');
    const disabled = !isValid

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            const {username} = value
            const {password} = value

            if (name === 'username' && username) {
                setUsername(utilsForUsername(username))
            }
            if (name === 'password' && password) {
                setPasswordCompare(utilsForPassword(password))
            }

            return () => subscription.unsubscribe()
        })
    }, [watch]);


    const onSubmit: SubmitHandler<FormValues> = (data) => {
        dispatch(setDataFormAC(data))
        dispatch(setStepAC(step + 1))
        reset()
    };

    const onClickHandlerEnter = () => {
        navigate(ROUTS.AUTH)
    }

    if (isToken) {
        return <Navigate to={ROUTS.INITIAL}/>
    }

    return (
        <div data-test-id='auth'
             className={(isRegistered || error) ? `${commonStyle.signUp} ${styles.signUp}` : commonStyle.signUp}>
            <div
                className={(isRegistered || error) ? `${commonStyle.cleverLand} ${styles.cleverLand}` : commonStyle.cleverLand}>Cleverland
            </div>
            {!isRegistered && !error && <div className={commonStyle.commonContainer}>
                <div className={commonStyle.container}>
                    <div className={commonStyle.stepContainer}>
                        <h4 className={commonStyle.register}>Регистрация</h4>
                        <span className={commonStyle.step}>{`${step} шаг из трёх`}</span>
                    </div>
                    {step === 1 &&
                        <form data-test-id='register-form' onSubmit={handleSubmit(onSubmit)}
                              className={commonStyle.formContainer}>
                            <div className={commonStyle.labelContainer}>
                            <span
                                className={valueUsername ? `${commonStyle.labelFocus} ${commonStyle.label}` : commonStyle.labelFocus}>Придумайте логин для входа</span>
                                <input
                                    autoComplete="new-password"
                                    type='text'
                                    className={errors?.username ? `${commonStyle.inputCommon} ${commonStyle.inputCommonError}` : commonStyle.inputCommon}
                                    placeholder="Придумайте логин для входа"
                                    onFocus={() => {
                                        clearErrors('username')
                                    }}
                                    {...register('username', {
                                        required: emptyValue,
                                        pattern: {
                                            value: /^(?=^.{1,}$)((?=.*\d)(?=.*[a-zA-Z]))[0-9a-zA-Z]*$/,
                                            message: errorLogin
                                        },
                                        onBlur: () => {
                                            if (!valueUsername) {
                                                setError('username', {
                                                    type: 'onBlur',
                                                    message: emptyValue
                                                })
                                            }
                                        }
                                    })}
                                />
                            </div>
                            {errors?.username
                                ?
                                (errors?.username.message === emptyValue ?
                                    <div data-test-id='hint'
                                         className={commonStyle.helperError}>{emptyValue}</div> :
                                    <div data-test-id='hint'
                                         className={commonStyle.helperError}>{errorLogin}</div>)
                                :
                                <div data-test-id='hint' className={commonStyle.helper}>Используйте
                                    для логина <span
                                        className={username === 'numberField' ? commonStyle.red : ''}>латинский алфавит
                            </span> и
                                    <span
                                        className={username === 'letterField' ? commonStyle.red : ''}> цифры</span>
                                </div>}
                            <div className={commonStyle.labelContainer}>
                            <span
                                className={valuePassword ? `${commonStyle.labelFocus} ${commonStyle.label}` : commonStyle.labelFocus}>Пароль</span>
                                <input
                                    autoComplete="new-password"
                                    type={typeButton}
                                    className={errors?.password ? `${commonStyle.inputCommon} ${commonStyle.inputCommonError}` : commonStyle.inputCommon}
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
                                    className={commonStyle.eyeStyles}
                                    onClick={handleToggle}
                                >
                                    {valuePassword && (typeButton === 'password' ?
                                        <img data-test-id='eye-closed' src={eyeClose} alt='eye-close'/> :
                                        <img src={eyeOpen} data-test-id='eye-opened' alt='eye-open'/>)}
                                </button>
                                {valuePassword && !errors.password && comparePassword.length === 3 &&
                                    <img src={successPassword} data-test-id='checkmark'
                                         className={commonStyle.successPassword}
                                         alt='success-password'/>}
                            </div>
                            {errors?.password
                                ?
                                (errors?.password.message === emptyValue ?
                                    <div data-test-id='hint'
                                         className={commonStyle.helperError}>{emptyValue}</div> :
                                    <div data-test-id='hint'
                                         className={commonStyle.helperError}>{errorPassword}</div>)
                                :
                                comparePassword.length < 3 ?
                                    <div data-test-id='hint' className={commonStyle.helper}>
                                        Пароль <span data-test-id='hint'
                                        className={comparePassword[0] === 'lengthComplete' ? '' : commonStyle.red}>не менее 8 символов</span>, с <span data-test-id='hint'
                                        className={comparePassword[0] === 'upperCaseComplete' || comparePassword[1] === 'upperCaseComplete' ? '' : commonStyle.red}>заглавной буквой</span> и <span data-test-id='hint'
                                        className={comparePassword[0] === 'numberComplete' || comparePassword[1] === 'numberComplete' ? '' : commonStyle.red}>цифрой</span>
                                    </div>
                                    : <div data-test-id='hint'
                                           className={commonStyle.helper}>{errorPassword}</div>

                            }
                            <button disabled={disabled} type='submit'
                                    className={disabled ? `${commonStyle.buttonSubmit} ${commonStyle.buttonSubmitDisable}` : commonStyle.buttonSubmit}>
                                Следующий шаг
                            </button>
                        </form>
                    }
                    {step === 2 && <SignUp2/>}
                    {step === 3 && <SignUp3/>}
                    <div className={commonStyle.enterContainer}>
                        <div className={commonStyle.account
                        }>Есть учётная запись?
                        </div>
                        <ButtonComponent
                            type='button'
                            className={commonStyle.arrow}
                            onClick={onClickHandlerEnter}
                        >
                            <div>Войти</div>
                            <img src={iconArrow} alt='arrow'/>
                        </ButtonComponent>
                    </div>
                </div>
            </div>}
            {(isRegistered || error) &&
                <CommonModal error={error} callback={onClickHandlerEnter}/>}
        </div>
    );
}

