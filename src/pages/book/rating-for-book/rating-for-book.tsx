import { FC } from 'react';

import { StarsComponent } from '../../../common/components/stars';
import { EmptyStar } from '../../../common/components/stars/empty';

import additionalStyleForStars from '../../../common/styles/additional-style-for-stars.module.scss';
import styles from './rating-for-book.module.scss';

type RatingForBookType = {
  rating: number | null;
};
export const RatingForBook: FC<RatingForBookType> = ({ rating }) => {

  const arrForEmptyRating = [1, 2, 3, 4, 5];

  return (
    <div>
      <div className={styles.ratingContainer}>
        <div className={styles.rating}>
          <h5>Рейтинг</h5>
          <div className={styles.border}>{true}</div>
          {rating ? (
            <div className={styles.container}>
              <StarsComponent
                rating={rating}
                className={additionalStyleForStars.starsBookPage}
                className2={additionalStyleForStars.starBookPage}
                classNameSvg={additionalStyleForStars.starBookPageForSvg}
              />
              <div className={styles.number}>{rating}</div>
            </div>
          ) : (
            <div className={styles.container1}>
              <div className={styles.stars}>
                {arrForEmptyRating.map((el) => (
                  <EmptyStar
                    key={el}
                    className={additionalStyleForStars.starBookPage}
                    classNameSvg={additionalStyleForStars.starBookPageForSvg}
                  />
                ))}
              </div>
              <div className={styles.text}>ещё нет оценок</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
