import {ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react';

import styles from './button-component.module.scss';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean;
};

export const ButtonComponent: FC<SuperButtonPropsType> = ({
                                                                    red,
                                                                    className, ...restProps
                                                                }) => {
    const finalClassName = `${red ? styles.red : styles.default} ${className}`;

    return (
        <button
            type='button'
            className={finalClassName}
            {...restProps}
        />
    );
};
