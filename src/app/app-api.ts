import axios from 'axios';

import {loadToken} from '../common/utils/utils-for-local-storage';
import {FormProfileType} from '../features/profile/form-for-profile/form-for-profile';

const instance = axios.create({
    baseURL: 'https://strapi.cleverland.by',
});
const exceptionRequest = ['/api/auth/local', '/api/auth/local/register', '/api/auth/forgot-password', '/api/auth/reset-password']

instance.interceptors.request.use( (config) => {
    if (config.url && exceptionRequest.includes(config.url)) {
        return config
    }
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${loadToken()}`

    return config
})

export const api = {
    genres() {
        return instance.get('/api/categories');
    },
    books() {
        return instance.get('/api/books');
    },
    book(bookId: string) {
        return instance.get(`/api/books/${bookId}`);
    },
    register(data: DataFormType) {
        return instance.post('/api/auth/local/register', data)
    },
    login(data: LoginFormType) {
        return instance.post('/api/auth/local', data)
    },
    forgot(data: ForgotPassFormType) {
        return instance.post('/api/auth/forgot-password', data)
    },
    reset(data: ResetPassFormType) {
        return instance.post('/api/auth/reset-password', data)
    },
    addComment(data: AddCommentFormType) {
        return instance.post('/api/comments', data)
    },
    addBooking(data: AddBookFormType) {
        return instance.post('/api/bookings', data)
    },
    editBooking(data: AddBookFormType, bookingId: string) {
        return instance.put(`/api/bookings/${bookingId}`, data)
    },
    deleteBooking(bookingId: string) {
        return instance.delete(`/api/bookings/${bookingId}`)
    },
    me() {
        return instance.get('/api/users/me')
    },
    editUserInform(data: FormProfileType, userId: string) {
        return instance.put(`/api/users/${userId}`, data)
    },
    editComment(data: AddCommentFormType, commentId: string) {
        return instance.put(`/api/comments/${commentId}`, data)
    },
    uploadAvatar(file: object) {
        return instance.postForm('/api/upload', {
            files: file
        })
    },
    editAvatar(data: {avatar: number}, userId: string) {
        return instance.put(`/api/users/${userId}`, data)
    },
    forTest(bookId: string) {
        return instance.get(`/api/books/${bookId}`);
    },
};

// types

export type PostUserType = {
    id: number,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string,
    firstName: string,
    lastName: string,
    phone: string
}

export type GetGenresType = {
    name: NameGenreType
    path: string;
    id: number;
};

export type GetBooksType = {
    issueYear: string | null;
    rating: number | null;
    title: string;
    authors: string[] | null;
    image: ImageType | null;
    categories: string[] | null;
    id: number;
    booking: BookingType | null;
    delivery: DeliveryType | null;
    histories: HistoriesType[] | null;
};

export type GetBookType = {
    description: string | null;
    publish: string | null;
    pages: string | null;
    cover: string | null;
    weight: string | null;
    format: string | null;
    ISBN: string | null;
    producer: string | null;
    images: ImageType[] | null;
    comments: CommentsBookType[] | null;
} & Omit<GetBooksType, 'image'>;


export type ImageType = {
    url: string | null
};

export type BookingType = {
    id: number;
    order: boolean;
    dateOrder: string | null;
    customerId: number | null;
    customerFirstName: string | null;
    customerLastName: string | null;
};

export type DeliveryType = {
    id: number;
    handed: boolean;
    dateHandedFrom: string | null;
    dateHandedTo: string | null;
    recipientId: number | null;
    recipientFirstName: string | null;
    recipientLastName: string | null;
};

type HistoriesType = {
    id: number | null;
    userId: number | null;
};

export type CommentsBookType = {
    id: number | null;
    rating: number;
    text: string | null;
    createdAt: string;
    user: UserBookType;
};

type UserBookType = {
    commentUserId: number;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
};

export type SortBooksType = {
    [key: string]: GetBooksType[],
}

export type SortGenresType = {
    [key: string]: [];
};


export type NameGenreType =
    | 'Бизнес'
    | 'Психология'
    | 'Родителям'
    | 'Нон-фикшн'
    | 'Художественная литература'
    | 'Программирование'
    | 'Хобби'
    | 'Дизайн'
    | 'Детские'
    | 'Другое'

export type DataFormType = {
    username?: string
    password?: string
    firstName?: string
    lastName?: string
    phone?: string
    email?: string
}

export type LoginFormType = {
    identifier: string
    password: string
}

export type ForgotPassFormType = {
    email: string
}

export type ResetPassFormType = {
    password: string
    passwordConfirmation: string
}

export type AddCommentFormType = {
    data: {
        rating: number,
        text: string,
        book: string,
        user: string
    }
}

export type AddBookFormType = {
    data: {
        order: boolean,
        dateOrder: string,
        book: string,
        customer: string
    }
}
export type GetAuthMeRoleType =
{
    id: number,
    name: string,
    description: string,
    type: string
}

export type GetAuthMeCommentsType =
    {
        id: number,
        rating: number,
        text:string | null,
        bookId: number
    }

export type GetAuthMeBookingType =
    {
        id: number,
        order: true,
        dateOrder: string,
        book: GetAuthMeCommonType
    }

export type GetAuthMeDeliveryType =
    {
        id: number,
        handed: true,
        dateHandedFrom: string,
        dateHandedTo: string
        book: GetAuthMeCommonType
    }

export type GetAuthMeHistoryType =
    {
        id: number,
        books: GetAuthMeCommonType[]
    }

 export type GetAuthMeCommonType = {
     id: number,
     title: string,
     rating: number,
     issueYear: string | null,
     authors: string[],
     image: string | null
 }
export type GetAuthMeType = {
    id: number,
    username: string,
    email: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string,
    firstName: string,
    lastName: string,
    phone: string,
    role: GetAuthMeRoleType,
    comments: GetAuthMeCommentsType[]
    avatar: string | null,
    booking: GetAuthMeBookingType
    delivery: GetAuthMeDeliveryType
    history: GetAuthMeHistoryType
}

export type PostUploadAvatarCommonType = {
    name: string,
    hash: string,
    ext: string,
    mime: string,
    path: string | null,
    width: number,
    height: number,
    size: number,
    url: string
}

export type PostUploadAvatarType = {
            id: number,
            name: string,
            alternativeText: string | null,
            caption: string | null,
            width: number,
            height: number,
            formats: {
                thumbnail: PostUploadAvatarCommonType,
                large: PostUploadAvatarCommonType,
                medium: PostUploadAvatarCommonType,
                small: PostUploadAvatarCommonType
            },
            hash: string,
            ext: string,
            mime: string,
            size: number,
            url: string,
            previewUrl: string | null,
            provider: string,
            provider_metadata: string | null,
            createdAt: string,
            updatedAt: string
}
