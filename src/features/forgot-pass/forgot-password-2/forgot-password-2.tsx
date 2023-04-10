import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';

import {ResetPassFormType} from '../../../app/app-api';
import {ResetPassTC, setIsPassResetAC} from '../../../app/auth-reducer';
import {AppDispatchType, useAppSelector} from '../../../app/store';
import {appSelector, authSelector} from '../../../app/use-app-selectors';
import eyeClose from '../../../assets/image/eyeClose.svg';
import eyeOpen from '../../../assets/image/eyeOpen.svg';
import successPassword from '../../../assets/image/successPassword.svg';
import {utilsForPassword} from '../../../common/utils/utils-for-password';
import {ROUTS} from '../../../common/utils/utils-for-routs';

import {ResponseModal} from './response-modal';

import commonStyle from '../../../common/styles/form-common.module.scss';
import styles from './forgot-password-2.module.scss';

type ConfirmFormType = {
    password: string
    passwordConfirmation: string
    code: string
}

export const ForgotPassword2 = () => {
    const {search} = useLocation()
    const code = search.replace('?code=', '')

    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatchType>();
    const {isPassReset} = useAppSelector(authSelector);
    const {error} = useAppSelector(appSelector);

    const [confirmForm, setConfirmForm] = useState<ConfirmFormType>({} as ConfirmFormType);
    const [typePassword, setTypePassword] = useState('password');
    const [typeConfirm, setTypeConfirm] = useState('password');
    const [comparePassword, setPasswordCompare] = useState<string[]>(['lengthComplete', 'upperCaseComplete', 'numberComplete']);
    const [emptyErrorPassword, setEmptyErrorPassword] = useState(false);

    const emptyValue = 'Поле не может быть пустым'
    const errorPassword = 'Пароль не менее 8 символов, с заглавной буквой и цифрой'
    const errorConfirm = 'Пароли не совпадают'

    const handleToggle = () => {
        if (typePassword === 'password') {
            setTypePassword('text');
        } else {
            setTypePassword('password');
        }
    };
    const handleToggle2 = () => {
        if (typeConfirm === 'password') {
            setTypeConfirm('text');
        } else {
            setTypeConfirm('password');
        }
    };

    const {
        register,
        formState: {errors},
        handleSubmit, clearErrors, watch, setError
    } = useForm<ResetPassFormType>({mode: 'onBlur'})

    const valuePassword = watch('password');
    const valueRepeatPassword = watch('passwordConfirmation');
    const disabled = !!errors.password || !!errors.passwordConfirmation

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            const {password} = value

            if (name === 'password' && password) {
                setPasswordCompare(utilsForPassword(password))
            }

            return () => subscription.unsubscribe()
        })
    }, [watch]);


    const onSubmit: SubmitHandler<ResetPassFormType> = (data) => {
        setConfirmForm(Object.assign(data, {code}))
        dispatch(ResetPassTC(Object.assign(data, {code})))
    };

    const callBack = () => {
        if (error) {
            dispatch(ResetPassTC(confirmForm))
        }
        if (isPassReset) {
            dispatch(setIsPassResetAC(false))
            navigate(ROUTS.AUTH)
        }
    }

    return (
        <React.Fragment>
            {!isPassReset && !error && <div
                className={`${commonStyle.commonContainer} ${styles.commonContainer}`}>

                <div className={`${commonStyle.container}`}>
                    <div className={commonStyle.stepContainer}>
                        <h4 className={commonStyle.register}>Восстановление пароля</h4>
                    </div>
                    <form data-test-id='reset-password-form' onSubmit={handleSubmit(onSubmit)}
                          className={commonStyle.formContainer}>
                        <div className={commonStyle.labelContainer}>
                            <span
                                className={valuePassword ? `${commonStyle.labelFocus} ${commonStyle.label}` : commonStyle.labelFocus}>Новый пароль</span>
                            <input
                                autoComplete="new-password"
                                type={typePassword}
                                className={errors?.password ? `${commonStyle.inputCommon} ${commonStyle.inputCommonError}` : commonStyle.inputCommon}
                                placeholder="Новый пароль"
                                onFocus={() => {
                                    clearErrors('password')
                                    setEmptyErrorPassword(false)
                                }}
                                {...register('password', {
                                    pattern: {
                                        value: /(?=.*[A-ZА-Я])(?=.*[0-9])[a-zA-Zа-яА-Я0-9]{8,}/,
                                        message: errorPassword
                                    },
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
                                {valuePassword && (typePassword === 'password' ?
                                    <img data-test-id='eye-closed' src={eyeClose} alt='eye-close'/> :
                                    <img data-test-id='eye-opened' src={eyeOpen} alt='eye-open'/>)}
                            </button>
                            {valuePassword && !errors.password && comparePassword.length === 3 &&
                                <img src={successPassword} data-test-id='checkmark'
                                     className={commonStyle.successPassword}
                                     alt='success-password'/>}
                        </div>
                        {errors?.password
                            ?
                            <div data-test-id='hint'
                                 className={commonStyle.helperError}>{errorPassword}</div>
                            : emptyErrorPassword
                                ? <div data-test-id='hint'
                                       className={`${commonStyle.helperError} ${styles.helperError}`}>{emptyValue}</div>
                                :
                                comparePassword.length < 3 ?
                                    <div data-test-id='hint' className={commonStyle.helper}>
                                        Пароль <span data-test-id='hint'
                                                     className={comparePassword[0] === 'lengthComplete' ? '' : commonStyle.red}>не менее 8 символов</span>,
                                        с <span data-test-id='hint'
                                                className={comparePassword[0] === 'upperCaseComplete' || comparePassword[1] === 'upperCaseComplete' ? '' : commonStyle.red}>заглавной буквой</span> и <span
                                        data-test-id='hint'
                                        className={comparePassword[0] === 'numberComplete' || comparePassword[1] === 'numberComplete' ? '' : commonStyle.red}>цифрой</span>
                                    </div>
                                    : <div data-test-id='hint'
                                           className={commonStyle.helper}>{errorPassword}</div>

                        }
                        <div className={commonStyle.labelContainer}>
                            <span
                                className={valueRepeatPassword ? `${commonStyle.labelFocus} ${commonStyle.label}` : commonStyle.labelFocus}>Повторите пароль</span>
                            <input
                                autoComplete="new-password"
                                type={typeConfirm}
                                className={errors?.passwordConfirmation ? `${commonStyle.inputCommon} ${commonStyle.inputCommonError}` : commonStyle.inputCommon}
                                placeholder="Повторите пароль"
                                onFocus={() => {
                                    clearErrors('passwordConfirmation')
                                }}
                                {...register('passwordConfirmation', {
                                    required: emptyValue,
                                    validate: value => value === valuePassword,
                                    onBlur: () => {
                                        if (!valueRepeatPassword) {
                                            setError('passwordConfirmation', {
                                                type: 'onBlur',
                                                message: emptyValue
                                            })
                                        }
                                        if (valueRepeatPassword !== valuePassword) {
                                            setError('passwordConfirmation', {
                                                type: 'onBlur',
                                                message: errorConfirm
                                            })
                                        }
                                    }
                                })}
                            />
                            <button
                                type='button'
                                className={commonStyle.eyeStyles}
                                onClick={handleToggle2}
                            >
                                {valueRepeatPassword && (typeConfirm === 'password' ?
                                    <img data-test-id='eye-closed' src={eyeClose} alt='eye-close'/> :
                                    <img data-test-id='eye-opened' src={eyeOpen} alt='eye-open'/>)}
                            </button>
                        </div>
                        {errors?.passwordConfirmation
                            ?
                            (errors?.passwordConfirmation.message === emptyValue ?
                                <div data-test-id='hint'
                                     className={`${commonStyle.helperError} ${styles.helperError}`}>{emptyValue}</div> :
                                <div data-test-id='hint'
                                     className={`${commonStyle.helperError} ${styles.helperError}`}>{errorConfirm}</div>)
                            :
                            <div data-test-id='hint' className={commonStyle.emptyDiv}>{true}</div>}

                        <button disabled={disabled} type='submit'
                                className={disabled ? `${commonStyle.buttonSubmit} ${commonStyle.buttonSubmitDisable}` : commonStyle.buttonSubmit}>
                            Сохранить изменения
                        </button>
                    </form>
                    <div className={styles.helper}>
                        После сохранения войдите в библиотеку, используя новый пароль
                    </div>
                </div>
            </div>}
            {(error || isPassReset) &&
                <ResponseModal isPassReset={isPassReset} error={error} callBack={callBack}/>
            }</React.Fragment>
    );
};
