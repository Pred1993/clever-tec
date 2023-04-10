import {AxiosError} from 'axios';

import {AddCommentFormType, api, GetAuthMeType} from '../../app/app-api';
import {
    setAppErrorAC,
    setLoaderAC,
    setResponseModalAC,
    setResponseModalMessageAC, setShowModalFlagAC
} from '../../app/app-reducer';
import {AppThunkType} from '../../app/store';

import {FormProfileType} from './form-for-profile/form-for-profile';

const initialState = {
    userInform: {} as GetAuthMeType
};

// types
type InitialStateType = typeof initialState;

export type ProfileActionType = ReturnType<typeof setUserInformAC>;

// reducer
export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionType): InitialStateType => {
    switch (action.type) {
        case 'profile/SET_USER_INFORM':
            return {...state, userInform: action.payload.userInform};
        default:
            return state;
    }
};

// actions
export const setUserInformAC = (userInform: GetAuthMeType) =>
    ({
        type: 'profile/SET_USER_INFORM',
        payload: {userInform},
    } as const);

// thunks

export const addUserInformTC =
    (): AppThunkType => async (dispatch,  getState) => {
        dispatch(setLoaderAC(true));
        try {
            const response = await api.me();

            dispatch(setShowModalFlagAC(true))
            dispatch(setUserInformAC(response.data))
        } catch (e) {
            const error = e as Error | AxiosError;

            dispatch(setShowModalFlagAC(true))
            dispatch(setAppErrorAC(error.message));
        } finally {
            if (getState().app.showModalFlag) {
                setTimeout(() => {
                    dispatch(setResponseModalAC(null));
                    dispatch(setResponseModalMessageAC(null))
                    dispatch(setShowModalFlagAC(false))
                }, 4000)
            }
            dispatch(setLoaderAC(false));
        }
    };

export const editUserInformTC =
    (data: FormProfileType, userId: string): AppThunkType => async (dispatch) => {
        dispatch(setLoaderAC(true));
        try {
            const response = await api.editUserInform(data ,userId);

            dispatch(setUserInformAC(response.data))
            dispatch(setResponseModalAC('success'));
            dispatch(setResponseModalMessageAC('Изменения успешно сохранены!'))
        } catch (e) {
            dispatch(setResponseModalAC('error'));
            dispatch(setResponseModalMessageAC('Изменения не были сохранены. Попробуйте позже!'))
        } finally {
            dispatch(setLoaderAC(false));
        }
    };

export const editCommentTC =
    (data: AddCommentFormType, commentId:string): AppThunkType =>
        async (dispatch) => {
            dispatch(setLoaderAC(true));
            try {
                await api.editComment(data, commentId);
                dispatch(setResponseModalAC('success'));
                dispatch(setResponseModalMessageAC('Спасибо, что нашли время изменить оценку!'))
            } catch (e) {
                dispatch(setResponseModalAC('error'));
                dispatch(setResponseModalMessageAC('Изменения не были сохранены. Попробуйте позже!'))
            } finally {
                dispatch(setLoaderAC(false));
            }
        };

export const editAvatarTC =
    (data: {avatar: number}, userId: string): AppThunkType =>
        async (dispatch) => {
            dispatch(setLoaderAC(true));
            try {
                const response = await api.editAvatar(data, userId);

                dispatch(setUserInformAC(response.data))
                dispatch(setResponseModalAC('success'));
                dispatch(setResponseModalMessageAC('Фото успешно сохранено!'))
            } catch (e) {
                dispatch(setResponseModalAC('error'));
                dispatch(setResponseModalMessageAC('Что-то пошло не так, фото не сохранилось. Попробуйте позже!'))
            } finally {
                dispatch(setLoaderAC(false));
            }
        };

export const uploadAvatarTC =
    (data: object, userId: string): AppThunkType =>
        async (dispatch) => {
            dispatch(setLoaderAC(true));
            try {
               const response = await api.uploadAvatar(data);

               dispatch(editAvatarTC({avatar: response.data[0].id}, userId))

            } catch (e) {
                dispatch(setResponseModalAC('error'));
                dispatch(setResponseModalMessageAC('Что-то пошло не так, фото не сохранилось. Попробуйте позже!'))
            } finally {
                dispatch(setLoaderAC(false));
            }
        };


