import {FC} from 'react';
// import required modules
import {Pagination} from 'swiper';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

import {GetAuthMeCommonType} from '../../../app/app-api';
import {useAppSelector} from '../../../app/store';
import {profileUserInformSelector} from '../../../app/use-app-selectors';
import {TileComponent} from '../../../pages/main/book/tile';

import styles from './swiper-for-history.scss';

type SwiperForHistoryType = {
    historyBooks: GetAuthMeCommonType[]
}

export const SwiperForHistory: FC<SwiperForHistoryType> = ({historyBooks}) => {

    const {comments} = useAppSelector(profileUserInformSelector);

    let slidesPerView

    if (window.innerWidth > 320 && window.innerWidth <= 768) {
        slidesPerView = 3
    } else if (window.innerWidth > 768) {
        slidesPerView = 4
    } else slidesPerView = 1


    return (
        <div className={styles.swiperForHistoryContainer}>
            <Swiper
                loop={true}
                slidesPerView={slidesPerView}
                pagination={true}
                spaceBetween={window.innerWidth > 768 ? 30 : 35}
                modules={[Pagination]}
                className='mySwiperForHistory'
            >
                {historyBooks.map((el) => {
                        const yourComment = comments.find((com) => com.bookId === el.id)

                        return <SwiperSlide key={el.id} data-test-id='history-slide'>
                            <TileComponent
                                image={{url: el.image}}
                                bookId={el.id}
                                title={el.title}
                                rating={el.rating}
                                year={el.issueYear}
                                authors={el.authors}
                                lengthHistoryForProfile={historyBooks.length}
                                yourComment={yourComment}
                            />
                        </SwiperSlide>
                    }
                )}
            </Swiper>
        </div>
    );
}
