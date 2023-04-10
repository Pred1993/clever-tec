import { FC } from 'react';

import { EmptyStar } from './empty';
import { FullStar } from './full';

import styles from './stars-component.module.scss';

type StarComponentType = {
  rating: number | null;
  className?: object;
  className2?: object;
  classNameSvg?: object;
};
export const StarsComponent: FC<StarComponentType> = ({ rating, className, className2, classNameSvg }) => {
    const arr = [1, 2, 3, 4, 5];

    if (rating)
        return (
      <div data-test-id='star' className={className ? `${styles.stars} ${className}` : styles.stars}>
        {arr.map((el) =>
          el <= Math.floor(rating) ? (
            <FullStar key={el} className={className2} classNameSvg={classNameSvg} />
          ) : (
            <EmptyStar key={el} classNameSvg={classNameSvg} className={className2} />
          )
        )}
      </div>
    );

  return <div className={className ? `${styles.text} ${className}` : styles.text}>ещё нет оценок</div>;
};
