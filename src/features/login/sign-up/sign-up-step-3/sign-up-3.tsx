import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {InputMask} from 'primereact/inputmask';

import {registerTC, setDataFormAC} from '../../../../app/auth-reducer';
import {AppDispatchType, useAppSelector} from '../../../../app/store';
import {authSelector} from '../../../../app/use-app-selectors';

import commonStyle from '../../../../common/styles/form-common.module.scss'


export type FormValues = {
    phone?: string
    email?: string
}
export const SignUp3 = () => {

    const {dataForm} = useAppSelector(authSelector);

    const emptyValue = 'Поле не может быть пустым'
    const errorPhone = 'В формате +375 (xx) xxx-xx-xx'
    const errorEmail = 'Введите корректный e-mail'
    const dispatch = useDispatch<AppDispatchType>();

    const {
        register,
        formState: {errors, isValid},
        handleSubmit, clearErrors, watch, setError, setValue
    } = useForm<FormValues>({mode: 'onBlur'})

    const valueEmail = watch('email')
    const valuePhone = watch('phone')
    const disabled = !isValid

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        dispatch(setDataFormAC(Object.assign(dataForm, data)))
        dispatch(registerTC(dataForm))
    };

    return (
        <form data-test-id='register-form' onSubmit={handleSubmit(onSubmit)}
              className={commonStyle.formContainer}>
            <div className={commonStyle.labelContainer}>
                            <span
                                className={valuePhone ? `${commonStyle.labelFocus} ${commonStyle.label}` : commonStyle.labelFocus}>Номер телефона</span>


                <InputMask
                    mask='+375 (99) 999-99-99'
                    slotChar='x'
                    required={true}
                    autoClear={false}
                    placeholder="Номер телефона" autoComplete="new-password"
                    className={errors?.phone ? `${commonStyle.inputCommon} ${commonStyle.inputCommonError}` : commonStyle.inputCommon}
                    onFocus={() => {
                        clearErrors('phone')
                    }}
                     {...register('phone', {
                        required: emptyValue,
                        pattern: {
                            value: /^\+375\s?\(?(?:25|29|33|44)\)?\s?\d{3}\s?-?\d{2}\s?-?\d{2}/g,
                            message: errorPhone
                        },
                        onBlur: () => {
                            setValue('phone', valuePhone)
                            if (!valuePhone) {
                                setError('phone', {
                                    type: 'onBlur',
                                    message: emptyValue
                                })
                            }
                        }

                     })
                     }
                />
            </div>
            {errors?.phone
                ?
                (errors.phone?.message === emptyValue
                    ?
                    <div data-test-id='hint' className={commonStyle.helperError}>{emptyValue}</div>
                    : <div data-test-id='hint'
                           className={commonStyle.helperError}>{errors.phone.message}</div>)
                : <div data-test-id='hint' className={commonStyle.helper}>{errorPhone}</div>
            }
            <div className={commonStyle.labelContainer}>
                            <span
                                className={valueEmail ? `${commonStyle.labelFocus} ${commonStyle.label}` : commonStyle.labelFocus}>E-mail</span>
                <input
                    autoComplete="new-password"
                    type='email'
                    className={errors?.email ? `${commonStyle.inputCommon} ${commonStyle.inputCommonError}` : commonStyle.inputCommon}
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
                    <div data-test-id='hint' className={commonStyle.helperError}>{emptyValue}</div>
                    : <div data-test-id='hint'
                           className={commonStyle.helperError}>{errors.email.message}</div>)
                : <div data-test-id='hint' className={commonStyle.helper}>{errorEmail}</div>
            }
            <button disabled={disabled} type='submit'
                    className={disabled ? `${commonStyle.buttonSubmit} ${commonStyle.buttonSubmitDisable}` : commonStyle.buttonSubmit}>
                зарегистрироваться
            </button>
        </form>)
}


