import React, {FC} from 'react';

type LightingComponentType = {
    title: string | null
    sortInput?: string
}
export const LightingComponent: FC<LightingComponentType> = ({sortInput, title}) => {

    if (!sortInput) return <span>{title}</span>

    const regexp = new RegExp(sortInput, 'ig')

    const matchValue = title?.match(regexp)

    if (matchValue) {
        console.log(matchValue)
        const arr = title?.split(regexp).map((el, index, array) => {
            if (index < array.length - 1) {
                const value = matchValue.shift()

                console.log(value, 'value')

                // eslint-disable-next-line react/jsx-no-undef
                return <React.Fragment>{el}<span key={el} data-test-id='highlight-matches'
                    style={{color: '#FF5253'}}>{value}</span></React.Fragment>
            }

            return <span>{el}</span>
        })

        return <span>{arr}</span>
    }

    return <span>{title}</span>
}

