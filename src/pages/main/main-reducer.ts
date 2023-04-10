const initialState = {
    display: true,
    sortRating: true,
    sortInput: '' as string,
};

// types
type InitialStateType = typeof initialState;
export type MainActionType =
    | ReturnType<typeof setDisplayAC>
    | ReturnType<typeof setSortRatingAC>
    | ReturnType<typeof setSortInputAC>


// reducer
export const mainReducer = (state: InitialStateType = initialState, action: MainActionType): InitialStateType => {
    switch (action.type) {
        case 'main/SET_DISPLAY':
            return {...state, display: action.payload.display};
        case 'main/SET_SORT_RATING':
            return {...state, sortRating: action.payload.sortRating};
        case 'main/SET_SORT_INPUT':
            return {...state, sortInput: action.payload.sortInput};
        default:
            return state;
    }
};
// actions

export const setDisplayAC = (display: boolean) =>
    ({
        type: 'main/SET_DISPLAY',
        payload: {display},
    } as const);

export const setSortRatingAC = (sortRating: boolean) =>
    ({
        type: 'main/SET_SORT_RATING',
        payload: {sortRating},
    } as const);

export const setSortInputAC = (sortInput: string) =>
    ({
        type: 'main/SET_SORT_INPUT',
        payload: {sortInput},
    } as const);
