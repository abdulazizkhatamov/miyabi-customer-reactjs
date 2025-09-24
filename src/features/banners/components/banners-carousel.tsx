/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import type { Banner } from '../schema/banner.schema'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'

interface BannersCarouselProps {
  banners: Array<Banner>
}

export default function BannersCarousel({ banners }: BannersCarouselProps) {
  return (
    <Swiper
      pagination={{ clickable: true }}
      navigation
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop
      modules={[Pagination, Navigation, Autoplay]}
      css={swiperStyles}
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <img
            src={banner.images[0]?.path}
            alt=""
            decoding="async"
            style={{
              width: '100%',
              height: '400px', // ✅ fixed height for all slides
              objectFit: 'cover', // ✅ ensures fill + crop
              display: 'block',
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

const swiperStyles = css`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  overflow: hidden;

  /* ✅ pagination bullets */
  .swiper-pagination-bullet {
    background: var(--lightgray-3);
    opacity: 1;
    transition: all 0.2s ease;
  }
  .swiper-pagination-bullet-active {
    background: var(--primary-color);
    transform: scale(1.2);
  }

  /* ✅ navigation arrows */
  .swiper-button-next,
  .swiper-button-prev {
    width: 18px; /* bigger circle */
    height: 18px;
    padding: 10px;
    border-radius: 50%;
    background: var(--lightgray-2);
    color: var(--black-2);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease;
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    background: var(--darkgray-3);
    color: var(--background);
  }
`
