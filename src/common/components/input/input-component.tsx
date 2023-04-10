import {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes} from 'react';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type InputComponentPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void;
    onEnter?: () => void;
    error?: string | null;
    spanClassName?: string;
};

export const InputComponent: FC<InputComponentPropsType> = ({
                                                                onChangeText,
                                                                className, ...restProps
                                                            }) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChangeText) {
            onChangeText(e.currentTarget.value);
        }

    };

    return (
        <input
            data-test-id='input-search'
            type='text'
            onChange={onChangeCallback}
            className={className}
            placeholder='Поиск книги или автора…'
            {...restProps}
        />
    );
};

