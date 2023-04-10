import {GetBooksType, GetGenresType, SortBooksType, SortGenresType} from './app-api';

const initialState = {
    sortBooks: {} as SortBooksType,
};

// types
type InitialStateType = typeof initialState;
export type SortActionType =
    | ReturnType<typeof setSortBooksAC>

// reducer
export const sortReducer = (state: InitialStateType = initialState, action: SortActionType): InitialStateType => {
    switch (action.type) {
        case 'main/SET_SORT_BOOKS':
            return { ...state, sortBooks: {...action.payload.sortBooks}};
        default:
            return state;
    }
};

// actions

export const setSortBooksAC = (allBooks: GetBooksType[], genres: GetGenresType[]) =>  {

    const sortGenres = genres.reduce((acc: SortGenresType, el) => {
        const property = el.name

        acc[property] = []

        return acc
    }, {});

    const sortBooks = allBooks.reduce((acc: SortBooksType, el) => {
        el.categories?.map(category => acc[category].push(el))

        return acc
    }, sortGenres);

    return ({
        type: 'main/SET_SORT_BOOKS',
        payload: {sortBooks}
    } as const);
}

