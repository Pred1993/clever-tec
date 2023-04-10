import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';

import {ForgotPassFormType} from '../../../app/app-api';
import {ForgotPassTC, setIsRegisteredInAC, setStepAC} from '../../../app/auth-reducer';
import {AppDispatchType, useAppSelector} from '../../../app/store';
import {appSelector, authSelector} from '../../../app/use-app-selectors';
import enterPA from '../../../assets/image/enterPA.svg'
import registerIcon from '../../../assets/image/register.svg';
import {ButtonComponent} from '../../../common/components/button';
import {ROUTS} from '../../../common/utils/utils-for-routs';
import {ForgotPassword2} from '../forgot-password-2';

import {CompleteModal} from './complete-modal';

import commonStyle from '../../../common/styles/form-common.module.scss';
import styles from './forgot-password-1.module.scss';


export const ForgotPassword1 = () => {
    const {search} = useLocation()
    const navigate = useNavigate()

    const [emptyErrorEmail, setEmptyErrorEmail] = useState(false);

    const dispatch = useDispatch<AppDispatchType>();
    const {isEmailSent, isPassReset, isToken} = useAppSelector(authSelector);
    const {error} = useAppSelector(appSelector);

    const errorEmail = 'Введите корректный e-mail'
    const errorMessage = 'Request failed with status code 500'
    const helperEmail = 'На этот email  будет отправлено письмо с инструкциями по восстановлению пароля'
    const emptyValue = 'Поле не может быть пустым'


    const {
        register,
        formState: {errors, isValid, touchedFields},
        handleSubmit, clearErrors, watch,
    } = useForm<ForgotPassFormType>({mode: 'onBlur'})

    const valueEmail = watch('email');
    const disabled = touchedFields.email && !isValid

    const onSubmit: SubmitHandler<ForgotPassFormType> = (data) => {
        dispatch(ForgotPassTC(data))
    };

    const onClickHandlerRegister = () => {
        navigate(ROUTS.REGISTRATION)
        dispatch(setIsRegisteredInAC(false))
        dispatch(setStepAC(1))
    }

    const onClickHandlerEnterPA = () => {
        navigate(ROUTS.AUTH)
    }

    if (isToken) {
        return <Navigate to={ROUTS.INITIAL}/>
    }

    return (
        <div data-test-id='auth' className={(isEmailSent || isPassReset || error) ?
            `${commonStyle.signUp} ${styles.signUp}` : commonStyle.signUp}>
            <div
                className={(isEmailSent || isPassReset || error) ? `${commonStyle.cleverLand} ${styles.cleverLand}` : commonStyle.cleverLand}>Cleverland
            </div>
            {!isEmailSent && !search &&
                <div className={`${commonStyle.commonContainer} ${styles.commonContainer}`}>
                    <ButtonComponent className={styles.enter}
                                     onClick={onClickHandlerEnterPA}>
                        <img src={enterPA} alt="enter"/>
                    </ButtonComponent>
                    <div className={`${commonStyle.container} ${styles.container}`}>
                        <div className={commonStyle.stepContainer}>
                            <h4 className={commonStyle.register}>Восстановление пароля</h4>
                        </div>
                        <form data-test-id='send-email-form' onSubmit={handleSubmit(onSubmit)}
                              className={commonStyle.formContainer}>
                            <div className={commonStyle.labelContainer}>
                            <span
                                className={valueEmail ? `${commonStyle.labelFocus} ${commonStyle.label}` : commonStyle.labelFocus}>E-mail</span>
                                <input
                                    autoComplete="new-password"
                                    type='email'
                                    className={(errors?.email || error === errorMessage) ? `${commonStyle.inputCommon} ${commonStyle.inputCommonError}` : commonStyle.inputCommon}
                                    placeholder="E-mail"
                                    onFocus={() => {
                                        clearErrors('email')
                                        setEmptyErrorEmail(false)
                                    }}
                                    {...register('email', {
                                        pattern: {
                                            value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
                                            message: errorEmail
                                        },
                                        onBlur: () => {
                                            if (valueEmail) {
                                                setEmptyErrorEmail(false)
                                            } else setEmptyErrorEmail(true)
                                        }
                                    })}
                                />
                            </div>
                            {errors?.email
                                ?
                                <div data-test-id='hint'
                                     className={`${commonStyle.helperError} ${styles.helperError}`}>{errors.email.message}</div>
                                : (error === errorMessage)
                                    ? <div data-test-id='hint'
                                           className={`${commonStyle.helperError} ${styles.helper}`}>error</div>
                                    :
                                    emptyErrorEmail
                                        ? <div data-test-id='hint'
                                               className={`${commonStyle.helperError} ${styles.helperError}`}>{emptyValue}</div>
                                        :
                                        <div data-test-id='hint'
                                             className={`${commonStyle.helper} ${styles.helper}`}>{helperEmail}</div>

                            }
                            <button disabled={disabled} type='submit'
                                    className={disabled ? `${commonStyle.buttonSubmit} ${commonStyle.buttonSubmitDisable}` : commonStyle.buttonSubmit}>
                                Восстановить
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
                                <img src={registerIcon} alt='register-icon'/>
                            </ButtonComponent>
                        </div>
                    </div>
                </div>}
            {search && <ForgotPassword2/>}
            {isEmailSent && !search &&
                <CompleteModal/>}
        </div>
    );
}

