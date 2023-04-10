import React, { ChangeEvent,DetailedHTMLProps, SelectHTMLAttributes } from 'react';

import styles from './select-component.module.scss';

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: string[];
    onChangeOption?: (option: string) => void;
};

export const SelectComponent: React.FC<SuperSelectPropsType> = ({ options, onChange, onChangeOption, value, ...restProps }) => {
    const mappedOptions: JSX.Element[] = options
        ? options.map((el, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <option className={styles.option} key={`${el  }-${  index}`} value={el}>
                {el}
            </option>
        ))
        : [];

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChangeOption) {
            onChangeOption(e.currentTarget.value);
        }
    };

    return (
        <select data-test-id='month-select' value={value} className={styles.select} onChange={onChangeCallback} {...restProps}>
            {mappedOptions}
        </select>
    );
};

