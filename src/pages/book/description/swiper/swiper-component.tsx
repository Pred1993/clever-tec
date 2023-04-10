import { FC, useState } from 'react';
// import required modules
import { FreeMode, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import basicImage from '../../../../assets/image/bookPageBasicImage.svg';
import { showPicture } from '../../../../common/utils/utils-for-image';

import styles from './swiper-component.module.scss';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type SwiperComponentType = {
  images: Array<{ url: string | null}>;
};

export const SwiperComponent: FC<SwiperComponentType> = ({ images }) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<any>();

  const slidesPerView = 5;
  const scrollVariables =
    images.length >= slidesPerView
      ? {
          hide: false,
          draggable: true,
          dragSize: 190,
        }
      : false;

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        data-test-id='slide-big'
        pagination={{
          clickable: true,
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        scrollbar={false}
        controller={thumbsSwiper}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Pagination, FreeMode, Navigation, Thumbs]}
        className='mySwiper2'
      >
        {images.map((el) => (
          <SwiperSlide  data-test-id='slide-mini' key={el.url}>
            <img src={showPicture(el.url, basicImage)} alt='slide' />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        scrollbar={scrollVariables}
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        loop={true}
        spaceBetween={30}
        slidesPerView={slidesPerView}
        freeMode={false}
        slideToClickedSlide={true}
        centeredSlides={true}
        centerInsufficientSlides={true}
        centeredSlidesBounds={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs, Scrollbar]}
        className='mySwiper'
      >
        {images.map((el) => (
          <SwiperSlide key={el.url}>
            <img src={showPicture(el.url, basicImage)} alt='slide' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
