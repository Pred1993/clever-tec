import {AxiosError} from 'axios';

import {saveToken} from '../common/utils/utils-for-local-storage';

import {
    api,
    DataFormType,
    ForgotPassFormType,
    LoginFormType,
    PostUserType,
    ResetPassFormType
} from './app-api';
import {setAppErrorAC, setLoaderAC} from './app-reducer';
import {AppThunkType} from './store';

const initialState = {
    isRegistered: false,
    isEmailSent: false,
    isPassReset: false,
    dataForm: {} as DataFormType,
    userData: {} as PostUserType,
    step: 1,
    isToken: ''

};

// types
type InitialStateType = typeof initialState;
export type SetIsRegisteredInACType = ReturnType<typeof setIsRegisteredInAC>;
export type SetIsEmailSentACType = ReturnType<typeof setIsEmailSentAC>;
export type SetDataFormACType = ReturnType<typeof setDataFormAC>;
export type SetStepACType = ReturnType<typeof setStepAC>;
export type SetUserDataACType = ReturnType<typeof setUserDataAC>;
export type SetIsPassResetACType = ReturnType<typeof setIsPassResetAC>;
export type SetIsTokenACType = ReturnType<typeof setIsTokenAC>;


export type ActionAuthType =
    | SetIsRegisteredInACType
    | SetIsEmailSentACType
    | SetDataFormACType
    | SetStepACType
    | SetUserDataACType
    | SetIsPassResetACType
    | SetIsTokenACType

export const authReducer = (
    state: InitialStateType = initialState,
    action: ActionAuthType,
): InitialStateType => {
    switch (action.type) {
        case 'auth/SET_IS_REGISTERED_IN':
            return {...state, isRegistered: action.payload.value};
        case 'auth/SET_IS_EMAIL_SENT':
            return {...state, isEmailSent: action.payload.value};
        case 'auth/SET_DATA-FORM':
            return {...state, dataForm: action.payload.value};
        case 'auth/SET_STEP':
            return {...state, step: action.payload.value};
        case 'auth/SET_USER_DATA':
            return {...state, userData: action.payload.value};
        case 'auth/SET_IS_PASS-RESET':
            return {...state, isPassReset: action.payload.value}
        case 'auth/SET_IS_TOKEN':
            return {...state, isToken: action.payload.isToken}
        default:
            return state;
    }
};

// actions
export const setIsRegisteredInAC = (value: boolean) =>
    ({
        type: 'auth/SET_IS_REGISTERED_IN',
        payload: {value},
    } as const);

export const setIsEmailSentAC = (value: boolean) =>
    ({type: 'auth/SET_IS_EMAIL_SENT', payload: {value}} as const);

export const setDataFormAC = (value: DataFormType) =>
    ({type: 'auth/SET_DATA-FORM', payload: {value}} as const);

export const setStepAC = (value: number) =>
    ({type: 'auth/SET_STEP', payload: {value}} as const);

export const setUserDataAC = (value: PostUserType) =>
    ({type: 'auth/SET_USER_DATA', payload: {value}} as const);

export const setIsPassResetAC = (value: boolean) =>
    ({type: 'auth/SET_IS_PASS-RESET', payload: {value}} as const);

export const setIsTokenAC = (isToken: string) =>
    ({type: 'auth/SET_IS_TOKEN', payload: {isToken}} as const);




export const registerTC =
    (data: DataFormType): AppThunkType => async (dispatch) => {
        dispatch(setLoaderAC(true));
        try {
            await api.register(data);
            dispatch(setIsRegisteredInAC(true))
            dispatch(setAppErrorAC(null))

        } catch (e) {
            const error = e as Error | AxiosError;

            dispatch(setAppErrorAC(error.message));
        } finally {
            dispatch(setLoaderAC(false));
        }
    };

export const loginTC =
    (data: LoginFormType): AppThunkType => async (dispatch) => {
        dispatch(setLoaderAC(true));
        try {
            const response = await api.login(data);

            dispatch(setAppErrorAC(null))
            dispatch(setUserDataAC(response.data.user))
            saveToken(response.data.jwt)
            dispatch(setIsTokenAC(response.data.jwt))
        } catch (e) {
            const error = e as Error | AxiosError;

            dispatch(setAppErrorAC(error.message));
        } finally {
            dispatch(setLoaderAC(false));
        }
    };

export const ForgotPassTC =
    (data: ForgotPassFormType): AppThunkType => async (dispatch) => {
        dispatch(setLoaderAC(true));
        try {
            await api.forgot(data);
            dispatch(setAppErrorAC(null))
            dispatch(setIsEmailSentAC(true))
        } catch (e) {
            const error = e as Error | AxiosError;

            dispatch(setAppErrorAC(error.message));
        } finally {
            dispatch(setLoaderAC(false));
        }
    };


export const ResetPassTC =
    (data: ResetPassFormType): AppThunkType => async (dispatch) => {
        dispatch(setLoaderAC(true));
        try {
            const response = await api.reset(data);

            dispatch(setAppErrorAC(null))
            dispatch(setUserDataAC(response.data.user))
            dispatch(setIsPassResetAC(true))
        } catch (e) {
            const error = e as Error | AxiosError;

            dispatch(setAppErrorAC(error.message));
        } finally {
            dispatch(setLoaderAC(false));
        }
    };








