import React from 'react';
import {useDispatch} from 'react-redux';

import {GetBooksType} from '../../app/app-api';
import {AppDispatchType, useAppSelector} from '../../app/store';
import {appSelector, layoutSelector, mainSelector} from '../../app/use-app-selectors';

import {SearchComponent} from './search/search-component';
import {BookComponent} from './book';
import {setDisplayAC, setSortInputAC, setSortRatingAC} from './main-reducer';

import styles from './main-page.module.scss';

export const MainPage = () => {

    const dispatch = useDispatch<AppDispatchType>();
    const {sortRating, sortInput, display} = useAppSelector(mainSelector);
    const {url, genres, books} = useAppSelector(layoutSelector)
    const {error, isPreloader} = useAppSelector(appSelector)

    const commonContainer = isPreloader ? styles.commonContainerNone : styles.commonContainer
    const setDisplay = (value: boolean) => {
        dispatch(setDisplayAC(value))
    }

    const setSortRating = (value: boolean) => {
        dispatch(setSortRatingAC(value))
    }

    const setSortInput = (value: string) => {
        dispatch(setSortInputAC(value))
    }
// sort by categories
    const sortBooks = useAppSelector((state) => state.sort.sortBooks);
    const genre = genres.find((el) => el.path === url);

    let drawingBooks

    if (genre) {
        drawingBooks = sortBooks[genre.name]
    } else {
        drawingBooks = books
    }

// sort by rating
    const sortForRatingArr = [...drawingBooks].sort((a, b) => {
        if (!a.rating && b.rating) return 1;
        if (!b.rating && a.rating) return -1;
        if (!b.rating && !a.rating) return 0;

        return a.rating && b.rating && b.rating >= a.rating ? 1 : -1

    })

    if (!sortRating) {
        sortForRatingArr.reverse()
    }
// sort by input
    let finallyArray = sortForRatingArr

    if (sortInput) {
        finallyArray = sortForRatingArr.filter((el) => el.title.toLowerCase().includes(sortInput.toLowerCase()));
    }

    if (finallyArray.length && !error) {
        return (
            <div className={commonContainer}>
                <SearchComponent setDisplay={setDisplay} display={display} sortRating={sortRating}
                                 setSortRating={setSortRating} sortInput={sortInput}
                                 setSortInput={setSortInput}/>
                <main data-test-id='content' className={styles.booksContainer}>
                    {finallyArray.map((el: GetBooksType) => (
                        <BookComponent
                            sortInput={sortInput}
                            key={el.id}
                            image={el.image}
                            authors={el.authors}
                            title={el.title}
                            rating={el.rating}
                            year={el.issueYear}
                            booking={el.booking}
                            delivery={el.delivery}
                            display={display}
                            bookId={el.id}
                        />
                    ))}
                </main>
            </div>
        );
    }

    return <div className={commonContainer}>
        {!error &&
            // eslint-disable-next-line react/jsx-no-undef
            <React.Fragment><SearchComponent setDisplay={setDisplay} display={display}
                                             sortRating={sortRating}
                                             setSortRating={setSortRating} sortInput={sortInput}
                                             setSortInput={setSortInput}/>
                <div className={styles.text}>
                    {sortInput
                        ? <p data-test-id='search-result-not-found'>По запросу <br
                            className={styles.br}/>ничего
                            не найдено</p>
                        : <p data-test-id='empty-category'>В этой категории книг <br
                            className={styles.br}/>ещё нет</p>
                    }
                </div>
            </React.Fragment>}
    </div>;
}
