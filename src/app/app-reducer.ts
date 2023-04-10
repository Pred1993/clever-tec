const initialState = {
    error: null as string | null,
    isPreloader: false,
    isInitialized: false,
    responseModal: null as null | ResponseModalType,
    showModal: false,
    responseModalMessage: null as null | string,
    showModalFlag: false
};

// types
type InitialStateType = typeof initialState;
type ResponseModalType = 'error' | 'success'
export type AppActionType = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setLoaderAC> | ReturnType<typeof setInitialisedAC> | ReturnType<typeof setResponseModalAC> | ReturnType<typeof setResponseModalMessageAC> | ReturnType<typeof setShowModalAC> | ReturnType<typeof setShowModalFlagAC>

// reducer
export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'app/SET_ERROR':
            return {...state, error: action.payload.error};
        case 'app/SET_LOADER':
            return {...state, isPreloader: action.payload.isPreloader};
        case 'app/SET_INITIALIZED':
            return { ...state, isInitialized: action.payload.isInitialized };
        case 'app/SET_RESPONSE_MODAL':
            return { ...state, responseModal: action.payload.responseModal };
        case 'app/SET_RESPONSE_MODAL_MESSAGE':
            return { ...state, responseModalMessage: action.payload.responseModalMessage };
        case 'app/SET_SHOW_MODAL':
            return { ...state, showModal: action.payload.showModal};
        case 'app/SET_SHOW_MODAL_FLAG':
            return {...state, showModalFlag: action.payload.showModalFlag};
        default:
            return state;
    }
};

// actions

export const setAppErrorAC = (error: string | null) => ({
    type: 'app/SET_ERROR',
    payload: {error}
} as const);

export const setLoaderAC = (isPreloader: boolean) =>
    ({
        type: 'app/SET_LOADER',
        payload: {isPreloader},
    } as const);

export const setInitialisedAC = (isInitialized: boolean) =>
    ({
        type: 'app/SET_INITIALIZED',
        payload: { isInitialized },
    } as const);

export const setResponseModalAC = (responseModal: ResponseModalType | null) =>
    ({
        type: 'app/SET_RESPONSE_MODAL',
        payload: { responseModal },
    } as const);

export const setResponseModalMessageAC = (responseModalMessage: string | null) =>
    ({
        type: 'app/SET_RESPONSE_MODAL_MESSAGE',
        payload: { responseModalMessage },
    } as const);

export const setShowModalAC = (showModal: boolean) =>
    ({
        type: 'app/SET_SHOW_MODAL',
        payload: { showModal },
    } as const);

export const setShowModalFlagAC = (showModalFlag: boolean) =>
    ({
        type: 'app/SET_SHOW_MODAL_FLAG',
        payload: { showModalFlag },
    } as const);
// thunks
