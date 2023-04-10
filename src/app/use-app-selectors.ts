import {AppRootStateType} from './store';

// main
export const mainSelector = (state: AppRootStateType) => state.main

// layout
export const layoutSelector = (state: AppRootStateType) => state.layout

// app
export const appSelector = (state: AppRootStateType) => state.app

// auth
export const authSelector = (state: AppRootStateType) => state.auth

// profile
export const profileUserInformSelector = (state: AppRootStateType) => state.profile.userInform
export const userIdSelector = (state: AppRootStateType) => state.profile.userInform.id
export const bookingSelector = (state: AppRootStateType) => state.profile.userInform.booking

// sort
export const sortSelector = (state: AppRootStateType) => state.sort

// book
export const bookSelector = (state: AppRootStateType) => state.book




