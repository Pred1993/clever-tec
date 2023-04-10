import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import {setDataFormAC, setStepAC} from '../../../../app/auth-reducer';
import {AppDispatchType, useAppSelector} from '../../../../app/store';
import {authSelector} from '../../../../app/use-app-selectors';

import commonStyle from '../../../../common/styles/form-common.module.scss'

export type FormValues = {
    firstName?: string
    lastName?: string
}
export const SignUp2 = () => {

    const dispatch = useDispatch<AppDispatchType>();
    const {dataForm, step} = useAppSelector(authSelector);

    const emptyValue = 'Поле не может быть пустым'

    const {
        register,
        formState: {errors, isValid},
        handleSubmit, clearErrors, watch, setError
    } = useForm<FormValues>({mode: 'onBlur'})

    const valueFirstName = watch('firstName')
    const valueLastName = watch('lastName')

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        dispatch(setDataFormAC(Object.assign(dataForm, data)))
        dispatch(setStepAC(step + 1))
    };
    const disabled = !isValid

    return (
        <form data-test-id='register-form' onSubmit={handleSubmit(onSubmit)}
              className={commonStyle.formContainer}>
            <div className={commonStyle.labelContainer}>
                            <span
                                className={valueFirstName ? `${commonStyle.labelFocus} ${commonStyle.label}` : commonStyle.labelFocus}>Имя</span>
                <input
                    autoComplete="new-password"
                    type='text'
                    className={errors?.firstName ? `${commonStyle.inputCommon} ${commonStyle.inputCommonError}` : commonStyle.inputCommon}
                    placeholder="Имя"
                    onFocus={() => {
                        clearErrors('firstName')
                    }}
                    {...register('firstName', {
                        required: emptyValue,
                        onBlur: () => {
                            if (!valueFirstName) {
                                setError('firstName', {
                                    type: 'onBlur',
                                    message: emptyValue
                                })
                            }
                        }
                    })}
                />
            </div>
            {errors?.firstName?.message ?
                <div data-test-id='hint' className={commonStyle.helperError}>{emptyValue}</div> :
                <div data-test-id='hint'
                     className={`${commonStyle.emptyDiv} ${commonStyle.helper}`}>{true}</div>
            }
            <div className={commonStyle.labelContainer}>
                            <span
                                className={valueLastName ? `${commonStyle.labelFocus} ${commonStyle.label}` : commonStyle.labelFocus}>Фамилия</span>
                <input
                    autoComplete="new-password"
                    type='text'
                    className={errors?.lastName ? `${commonStyle.inputCommon} ${commonStyle.inputCommonError}` : commonStyle.inputCommon}
                    placeholder="Фамилия"
                    onFocus={() => {
                        clearErrors('lastName')
                    }}
                    {...register('lastName', {
                        required: emptyValue,
                        onBlur: () => {
                            if (!valueLastName) {
                                setError('lastName', {
                                    type: 'onBlur',
                                    message: emptyValue
                                })
                            }
                        }
                    })}
                />
            </div>
            {errors?.lastName?.message ?
                <div data-test-id='hint' className={commonStyle.helperError}>{emptyValue}</div> :
                <div data-test-id='hint'
                     className={`${commonStyle.emptyDiv} ${commonStyle.helper}`}>{true}</div>
            }
            <button disabled={disabled} type='submit'
                    className={disabled ? `${commonStyle.buttonSubmit} ${commonStyle.buttonSubmitDisable}` : commonStyle.buttonSubmit}>
                Последний шаг
            </button>
        </form>)
}


