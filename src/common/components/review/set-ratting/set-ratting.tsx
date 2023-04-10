import {FC} from 'react';

import {Star} from './star';

import styles from './set-ratting.module.scss'

export type RatingPropsType = {
    setValue: (value: number) => void;
    value: number;
};
const arr = [1, 2, 3, 4, 5]

export const SetRatting: FC<RatingPropsType> = ({value, setValue}) => (
    <div data-test-id='rating' className={styles.starsContainer}>
        {arr.map((el, index) => <Star key={el} selected={value > index} setValue={setValue} value={el}/>)}
    </div>

);



