import React, {FC, useState} from 'react';

import {ButtonComponent} from '../../../../common/components/button';

import styles from './button-draw.module.scss';

type ButtonDrawType = {
    bookedTill?: boolean | null;
    isBooked?: boolean | null;
    child1?: string;
    child2?: string;
    className?: object;
};

export const ButtonDraw: FC<ButtonDrawType> = ({
                                                   bookedTill,
                                                   isBooked,
                                                   child1,
                                                   child2,
                                                   className
                                               }) => {
    const [active, setActive] = useState(isBooked);

    const onclickHandler = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActive(!active);
    };

    const button = active
        ? className
            ? `${styles.buttonNotBooked} ${className}`
            : `${styles.buttonNotBooked}`
        : className
            ? `${styles.buttonBooked} ${className}`
            : `${styles.buttonBooked}`;

    if (bookedTill)
        return (
            <ButtonComponent
                onClick={onclickHandler}
                className={className ? `${styles.buttonDisabled} ${className}` : styles.buttonDisabled}
                disabled={!bookedTill}
            >
                {bookedTill}
            </ButtonComponent>
        );

    return (
        <ButtonComponent className={button} onClick={onclickHandler}>
            {active ? child1 : child2}
        </ButtonComponent>
    );
};
