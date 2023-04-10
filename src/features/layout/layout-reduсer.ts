import {AxiosError} from 'axios';

import {api, GetBooksType, GetGenresType} from '../../app/app-api';
import {
    setAppErrorAC,
    setLoaderAC,
    setResponseModalAC, setResponseModalMessageAC,
    setShowModalFlagAC
} from '../../app/app-reducer';
import {AppThunkType} from '../../app/store';

const initialState = {
    genres: [] as GetGenresType[],
    books: [] as GetBooksType[],
    url: 'all',
    visibility: true,
    navigation: false,
    showChevron: true,
};

// types
type InitialStateType = typeof initialState;
export type LayoutActionType =
    | ReturnType<typeof setGenresAC>
    | ReturnType<typeof setBooksAC>
    | ReturnType<typeof setUrlAC>
    | ReturnType<typeof setVisibilityAC>
    | ReturnType<typeof setNavigationAC>
    | ReturnType<typeof setShowChevronAC>

// reducer
export const layoutReducer = (state: InitialStateType = initialState, action: LayoutActionType): InitialStateType => {
    switch (action.type) {
        case 'layout/SET_GENRES':
            return {...state, genres: action.payload.genres.map((el) => ({...el}))};
        case 'layout/SET_BOOKS':
            return {...state, books: action.payload.books};
        case 'layout/SET_URL':
            return {...state, url: action.payload.url};
        case 'layout/SET_VISIBILITY':
            return {...state, visibility: action.payload.visibility};
        case 'layout/SET_NAVIGATION':
            return {...state, navigation: action.payload.navigation};
        case 'layout/SET_SHOW_CHEVRON':
            return {...state, showChevron: action.payload.showChevron};
        default:
            return state;
    }
};
// actions

export const setGenresAC = (genres: GetGenresType[]) =>
    ({
        type: 'layout/SET_GENRES',
        payload: {genres},
    } as const);

export const setUrlAC = (url: string) =>
    ({
        type: 'layout/SET_URL',
        payload: {url},
    } as const);

export const setBooksAC = (books: GetBooksType[]) =>
    ({
        type: 'layout/SET_BOOKS',
        payload: {books},
    } as const);

export const setVisibilityAC = (visibility: boolean) =>
    ({
        type: 'layout/SET_VISIBILITY',
        payload: {visibility},
    } as const);

export const setNavigationAC = (navigation: boolean) =>
    ({
        type: 'layout/SET_NAVIGATION',
        payload: {navigation},
    } as const);

export const setShowChevronAC = (showChevron: boolean) =>
    ({
        type: 'layout/SET_SHOW_CHEVRON',
        payload: {showChevron},
    } as const);

// thunks

export const setBooksTC = (): AppThunkType => async (dispatch,  getState) => {
    dispatch(setLoaderAC(true));
    try {
        const response = await api.books();

        dispatch(setShowModalFlagAC(true))
        dispatch(setBooksAC(response.data));
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

export const setGenresTC = (): AppThunkType => async (dispatch) => {
    dispatch(setLoaderAC(true));
    try {
        const response = await api.genres();

        dispatch(setGenresAC(response.data));

    } catch (e) {
        const error = e as Error | AxiosError;

        dispatch(setAppErrorAC(error.message));
    }
};
