import {FC} from 'react';

import {EmptyStar} from '../../../stars/empty';
import {FullStar} from '../../../stars/full';

import additionalStyleForStars from '../../../../styles/additional-style-for-stars.module.scss'

type StarPropsType = {
    selected: boolean;
    setValue: (value: number) => void;
    value: number;
};

export const Star: FC<StarPropsType> = ({setValue, value, selected}) => (
    <div data-test-id='star' role='button' tabIndex={0} onKeyDown={() => null} onClick={() => setValue(value)}
         className="Star ">
        {selected ? <FullStar className={additionalStyleForStars.starGetRatting}  classNameSvg={additionalStyleForStars.starGetRattingForSvg} /> : <EmptyStar className={additionalStyleForStars.starGetRatting} classNameSvg={additionalStyleForStars.starGetRattingForSvg}/>}
    </div>
);
