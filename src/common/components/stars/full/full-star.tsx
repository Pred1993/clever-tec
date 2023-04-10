import {FC} from 'react';

import styles from './full-star.module.scss';

type FullStarType = {
    className?: object
    classNameSvg?: object
}

export const FullStar: FC<FullStarType> = ({ className, classNameSvg}) => (
        <div data-test-id='star-active' className={className ? `${styles.star} ${className}`: styles.star}>
            <svg className={classNameSvg ? `${styles.svg} ${classNameSvg}`: styles.svg} viewBox="0 0 24 24" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.5675 2.28749C11.7275 1.90417 12.2725 1.90417 12.4325 2.28749L14.8634 8.11167C14.9309 8.27326 15.0834 8.38368 15.2585 8.39766L21.5684 8.90174C21.9837 8.93492 22.1521 9.45136 21.8357 9.72144L17.0282 13.8251C16.8948 13.9389 16.8365 14.1176 16.8773 14.2878L18.3461 20.4235C18.4427 20.8274 18.0019 21.1465 17.6463 20.9301L12.2441 17.6421C12.0943 17.5509 11.9057 17.5509 11.7559 17.6421L6.35369 20.9301C5.99814 21.1465 5.55728 20.8274 5.65395 20.4235L7.12271 14.2878C7.16347 14.1176 7.10521 13.9389 6.97182 13.8251L2.16433 9.72144C1.84793 9.45136 2.01632 8.93492 2.43161 8.90174L8.74153 8.39766C8.9166 8.38368 9.06911 8.27326 9.13656 8.11167L11.5675 2.28749Z"
                    fill="#FFBC1F"/>
            </svg>

        </div>
    );

