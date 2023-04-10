import {FC, useState} from 'react';

import iconCross from '../../../assets/image/cross.svg';
import iconSearch from '../../../assets/image/IconSearch.svg';
import iconSearchFocus from '../../../assets/image/IconSearchFocus.svg';
import iconSortDown from '../../../assets/image/IconSortDown.svg';
import iconSortUp from '../../../assets/image/IconSortUp.svg';
import {ButtonComponent} from '../../../common/components/button';
import {InputComponent} from '../../../common/components/input';

import inputForSearch from '../../../common/styles/input-for-search.module.scss'
import styles from './search-component.module.scss';

type SearchComponentType = {
    setDisplay: (display: boolean) => void
    display: boolean
    sortRating: boolean
    setSortRating: (sortRating: boolean) => void
    sortInput: string
    setSortInput: (sortInput: string) => void
}

export const SearchComponent: FC<SearchComponentType> = ({
                                                             display,
                                                             setDisplay,
                                                             setSortRating,
                                                             sortRating,
                                                             sortInput,
                                                             setSortInput
                                                         }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [inputFocus, setInputFocus] = useState<boolean>(false);

    const onclickHandler = () => {
        setDisplay(!display);
    };
    const buttonIcon1 = display ? `${styles.activeButtonIcon}` : `${styles.buttonIcon}`;
    const buttonIcon2 = display ? `${styles.buttonIcon}` : `${styles.activeButtonIcon}`;

    const svgIcon1 = display ? `${styles.activeSvgIcon}` : `${styles.svgIcon}`;
    const svgIcon2 = display ? `${styles.svgIcon}` : `${styles.activeSvgIcon}`;

    const searchContainer = editMode ? `${styles.searchContainerActive}` : `${styles.searchContainer}`;

    return (
        <div>
            {editMode ? (
                <div className={styles.searchContainerActive}>
                    <InputComponent value={sortInput}
                                    className={inputForSearch.superInput}
                                    onChangeText={setSortInput} autoFocus={true} onBlur={() => {
                        if (!sortInput) {
                            setEditMode(false)
                        }
                    }}/>
                    <button
                        data-test-id='button-search-close'
                        type='button'
                        className={styles.iconCross}
                        onClick={() => setEditMode(false)}
                    >
                        <img src={iconCross} alt='cross'/>
                    </button>
                </div>
            ) : (
                <div className={searchContainer}>
                    <ButtonComponent
                        data-test-id='button-search-open'
                        className={styles.buttonSearch}
                        onClick={() => {
                            setEditMode(true);
                        }}
                    >
                        <img src={iconSearch} alt='sort' className={styles.iconSearch}/>
                    </ButtonComponent>
                    <div className={styles.inputSearch}>
                        <InputComponent value={sortInput}
                                        className={inputForSearch.superInput}
                                        onChangeText={setSortInput}
                                        onFocus={() => setInputFocus(true)}
                                        onBlur={() => setInputFocus(false)}/>
                        {inputFocus
                            ?
                            <img src={iconSearchFocus} alt='search' className={styles.iconSearch}/>
                            : <img src={iconSearch} alt='search' className={styles.iconSearch}/>}
                    </div>
                    <ButtonComponent data-test-id='sort-rating-button'
                                     className={styles.buttonSort}
                                     onClick={() => setSortRating(!sortRating)}>
                        {sortRating
                            ? <img src={iconSortDown} alt='sort' className={styles.iconSort}/>
                            : <img src={iconSortUp} alt='sort' className={styles.iconSort}/>}
                        <span>По рейтингу</span>
                    </ButtonComponent>
                    <ButtonComponent
                        style={{marginRight: '16px'}}
                        className={buttonIcon1}
                        onClick={onclickHandler}
                        data-test-id='button-menu-view-window'
                    >
                        <svg width='20' height='20' viewBox='0 0 20 20' fill='none'
                             xmlns='http://www.w3.org/2000/svg'>
                            <path
                                className={svgIcon1}
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M3.52273 2.875C3.165 2.875 2.875 3.165 2.875 3.52273V8.70455C2.875 9.06228 3.165 9.35227 3.52273 9.35227H8.70455C9.06228 9.35227 9.35227 9.06228 9.35227 8.70455V3.52273C9.35227 3.165 9.06228 2.875 8.70455 2.875H3.52273ZM4.17045 8.05682V4.17045H8.05682V8.05682H4.17045ZM11.2955 2.875C10.9377 2.875 10.6477 3.165 10.6477 3.52273V8.70455C10.6477 9.06228 10.9377 9.35227 11.2955 9.35227H16.4773C16.835 9.35227 17.125 9.06228 17.125 8.70455V3.52273C17.125 3.165 16.835 2.875 16.4773 2.875H11.2955ZM11.9432 8.05682V4.17045H15.8295V8.05682H11.9432ZM2.875 11.2955C2.875 10.9377 3.165 10.6477 3.52273 10.6477H8.70455C9.06228 10.6477 9.35227 10.9377 9.35227 11.2955V16.4773C9.35227 16.835 9.06228 17.125 8.70455 17.125H3.52273C3.165 17.125 2.875 16.835 2.875 16.4773V11.2955ZM4.17045 11.9432V15.8295H8.05682V11.9432H4.17045ZM11.2955 10.6477C10.9377 10.6477 10.6477 10.9377 10.6477 11.2955V16.4773C10.6477 16.835 10.9377 17.125 11.2955 17.125H16.4773C16.835 17.125 17.125 16.835 17.125 16.4773V11.2955C17.125 10.9377 16.835 10.6477 16.4773 10.6477H11.2955ZM11.9432 15.8295V11.9432H15.8295V15.8295H11.9432Z'
                                fill='white'
                            />
                        </svg>
                    </ButtonComponent>

                    <ButtonComponent className={buttonIcon2} onClick={onclickHandler}
                                     data-test-id='button-menu-view-list'>
                        <svg
                            className={svgIcon2}
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                className={svgIcon2}
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M2.0835 10C2.0835 9.56282 2.43794 9.20837 2.87516 9.20837H17.1252C17.5624 9.20837 17.9168 9.56282 17.9168 10C17.9168 10.4373 17.5624 10.7917 17.1252 10.7917H2.87516C2.43794 10.7917 2.0835 10.4373 2.0835 10Z'
                                fill='#A7A7A7'
                            />
                            <path
                                className={svgIcon2}
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M2.0835 5.25004C2.0835 4.81282 2.43794 4.45837 2.87516 4.45837H17.1252C17.5624 4.45837 17.9168 4.81282 17.9168 5.25004C17.9168 5.68727 17.5624 6.04171 17.1252 6.04171H2.87516C2.43794 6.04171 2.0835 5.68727 2.0835 5.25004Z'
                                fill='#A7A7A7'
                            />
                            <path
                                className={svgIcon2}
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M2.0835 14.75C2.0835 14.3128 2.43794 13.9584 2.87516 13.9584H17.1252C17.5624 13.9584 17.9168 14.3128 17.9168 14.75C17.9168 15.1873 17.5624 15.5417 17.1252 15.5417H2.87516C2.43794 15.5417 2.0835 15.1873 2.0835 14.75Z'
                                fill='#A7A7A7'
                            />
                        </svg>
                    </ButtonComponent>
                </div>
            )}
        </div>
    );
};

