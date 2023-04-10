import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';

import {LayoutActionType, layoutReducer} from '../features/layout/layout-reduсer';
import {ProfileActionType, profileReducer} from '../features/profile/profile-reducer';
import {BookActionType, bookReducer} from '../pages/book/book-reducer';
import {MainActionType, mainReducer} from '../pages/main/main-reducer';

import {AppActionType, appReducer} from './app-reducer';
import {ActionAuthType, authReducer} from './auth-reducer';
import {SortActionType, sortReducer} from './sort-reducer';

const rootReducer = combineReducers({
    app: appReducer,
    layout: layoutReducer,
    book: bookReducer,
    sort: sortReducer,
    main: mainReducer,
    auth: authReducer,
    profile: profileReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// types
type ActionsType = AppActionType | LayoutActionType | BookActionType | SortActionType | MainActionType | ActionAuthType | ProfileActionType;

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsType>;
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, ActionsType>;
