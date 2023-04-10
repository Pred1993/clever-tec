import {FC} from 'react';

import {BookingType, DeliveryType, GetAuthMeCommentsType, ImageType} from '../../../app/app-api';

import {ListComponent} from './list';
import {TileComponent} from './tile';

export type BookComponentPropsType = {
    image: ImageType | null;
    authors: string[] | null;
    title: string;
    rating: number | null;
    year: string | null;
    display: boolean;
    bookId: number;
    booking?: BookingType | null;
    delivery?: DeliveryType | null;
    sortInput?: string
    orderForProfile?: boolean
    handedForProfile?: boolean
    dateHandedTo? : string
    lengthHistoryForProfile? : number | null
    expired?: boolean
    yourComment?: GetAuthMeCommentsType
};

export const BookComponent: FC<BookComponentPropsType> = ({display, ...restProps}) => {
    if (display)
        return (
            <TileComponent
                {...restProps}
            />
        );

    return (
        <ListComponent
            {...restProps}
        />
    );
};
