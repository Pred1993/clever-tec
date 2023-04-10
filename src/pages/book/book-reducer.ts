import {AxiosError} from 'axios';

import {AddBookFormType, AddCommentFormType, api, GetBookType} from '../../app/app-api';
import {
    setAppErrorAC,
    setLoaderAC,
    setResponseModalAC,
    setResponseModalMessageAC, setShowModalFlagAC
} from '../../app/app-reducer';
import {AppThunkType} from '../../app/store';

const initialState = {} as GetBookType;


// types
type InitialStateType = typeof initialState;
export type BookActionType = ReturnType<typeof setBookAC> | ReturnType<typeof setBookAC>;

// reducer
export const bookReducer = (state: InitialStateType = initialState, action: BookActionType): InitialStateType => {
    switch (action.type) {
        case 'book/SET_BOOK':
            return {...state, ...action.payload.book};
        default:
            return state;
    }
};
// actions

export const setBookAC = (book: GetBookType) =>
    ({
        type: 'book/SET_BOOK',
        payload: {book},
    } as const);

// thunks

export const setBookTC =
    (bookId: string): AppThunkType =>
        async (dispatch,  getState,) => {
            dispatch(setLoaderAC(true));
            try {
                const response = await api.book(bookId);
                let data

                if (Array.isArray(response.data)) {
                    data = response.data.find((el: GetBookType) => el.id.toString() === bookId.toString())
                } else {
                    data = response.data
                }

                dispatch(setShowModalFlagAC(true))
                dispatch(setBookAC(data));
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

export const addCommentTC =
    (data: AddCommentFormType): AppThunkType =>
        async (dispatch, ) => {
            dispatch(setLoaderAC(true));
            try {
                await api.addComment(data);
                dispatch(setResponseModalAC('success'));
                dispatch(setResponseModalMessageAC('Спасибо, что нашли время оценить книгу!'))
            } catch (e) {
                dispatch(setResponseModalAC('error'));
                dispatch(setResponseModalMessageAC('Оценка не была отправлена. Попробуйте позже!'))
            } finally {
                dispatch(setLoaderAC(false));
            }
        };

export const addBookingTC =
    (data: AddBookFormType): AppThunkType =>
        async (dispatch) => {
            dispatch(setLoaderAC(true));
            try {
                await api.addBooking(data);

                dispatch(setResponseModalAC('success'));
                dispatch(setResponseModalMessageAC('Книга забронирована. Подробности можно посмотреть на странице Профиль'))
            } catch (e) {
                dispatch(setResponseModalAC('error'));
                dispatch(setResponseModalMessageAC('Что-то пошло не так, книга не забронирована. Попробуйте позже!'))
            } finally {
                dispatch(setLoaderAC(false));
            }
        };

export const editBookingTC =
    (data: AddBookFormType, bookingId: string): AppThunkType =>
        async (dispatch) => {
            dispatch(setLoaderAC(true));
            try {
                await api.editBooking(data, bookingId);

                dispatch(setResponseModalAC('success'));
                dispatch(setResponseModalMessageAC('Изменения успешно сохранены!'))
            } catch (e) {
                dispatch(setResponseModalAC('error'));
                dispatch(setResponseModalMessageAC('Изменения не были сохранены. Попробуйте позже!'))
            } finally {
                dispatch(setLoaderAC(false));
            }
        };

export const deleteBookingTC =
    (data: AddBookFormType, bookingId: string): AppThunkType =>
        async (dispatch) => {
            dispatch(setLoaderAC(true));
            try {
                await api.deleteBooking(bookingId);

                dispatch(setResponseModalAC('success'));
                dispatch(setResponseModalMessageAC('Бронирование книги успешно отменено!'))
            } catch (e) {
                dispatch(setResponseModalAC('error'));
                dispatch(setResponseModalMessageAC('Не удалось снять бронирование книги. Попробуйте позже!'))
            } finally {
                dispatch(setLoaderAC(false));
            }
        };
