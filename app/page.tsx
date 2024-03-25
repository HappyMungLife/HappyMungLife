'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import visual1 from '@/public/images/visual_1.png';
import visual2 from '@/public/images/visual_2.png';
import visual3 from '@/public/images/visual_3.png';
import { CommunityData } from './_components/communityPageComponents/CommumityData';
import { TradeData } from './_components/tradePageComponents/TradeData';
import { formatToLocaleDateTimeString } from './_utils/date';
//Font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
//Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '@/app/_style/mainSwiper.css';
import CommunityCommentsData from './_components/communityPageComponents/CommunityCommentsData';
import TradeCommentData from './_components/tradePageComponents/TradeCommentData';

export default function Index() {
  const { items, loading, error } = CommunityData();
  const { comments } = CommunityCommentsData();
  const { tradecomments } = TradeCommentData();
  const { tradeItems, tradeLoading, tradeError } = TradeData();
  const [topLikedItems, setTopLikedItems] = useState<any[]>([]);
  const [topSavedItems, setTopSavedItems] = useState<any[]>([]);

  useEffect(() => {
    if (items) {
      const sortedByLikes = [...items].sort((a, b) => b.liked - a.liked);
      const top3Items = sortedByLikes.slice(0, 3);
      setTopLikedItems(top3Items);
    }
  }, [items]);

  useEffect(() => {
    if (tradeItems) {
      const sortedByLikes = [...tradeItems].sort((a, b) => b.saved - a.saved);
      const top3Items = sortedByLikes.slice(0, 3);
      setTopSavedItems(top3Items);
    }
  }, [tradeItems]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (tradeLoading) return <div>Loading...</div>;
  if (tradeError) return <div>Error: {tradeError.message}</div>;

  return (
    <main>
      <section>
        <div>
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false
            }}
            pagination={{
              clickable: true
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Image src={visual1} alt="어서와요 해피멍생 만나서 반가워요!" className="size-full" />
              <h2>
                어서와요 해피멍생<span>만나서 반가워요!</span>
              </h2>
            </SwiperSlide>
            <SwiperSlide>
              <Image src={visual2} alt="우리모두 해피멍생 커뮤니티에서 공유해요" className="size-full" />
              <h2 className="community">
                우리모두 해피멍생<span>커뮤니티에서 공유해요!</span>
              </h2>
            </SwiperSlide>
            <SwiperSlide>
              <Image src={visual3} alt="우리아이 반려용품 우리모두 해피멍터" className="size-full" />
              <h2 className="trade">
                우리아이 반려용품<span>이제부터 해피멍터</span>
              </h2>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      <section className="flex text-center pt-10 gap-10 px-10">
        <div className="w-2/4">
          <h2 className="text-xl font-semibold">커뮤니티</h2>
          <ul className="bg-secondaryColor rounded-xl mt-5 mb-10 pt-10 px-10 pb-5">
            {topLikedItems.map((item) => (
              <li key={item.postId} className="mb-5 bg-white text-left rounded-xl">
                <Link href={`/community/detail/${item.postId}`} className="p-7 block">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h2 className="mr-3 font-semibold text-xl">{item.userId}</h2>
                      <p className="mr-2">
                        <FontAwesomeIcon className="mr-1 text-primaryColor" icon={faHeartSolid} />
                        <span>{item.liked}</span>
                      </p>
                      <p>
                        <FontAwesomeIcon className="mr-1 text-primaryColor -scale-x-100 size-4" icon={faCommentDots} />
                        {comments.filter((comment) => comment.postId === item.postId).length}
                      </p>
                    </div>
                    <time className="text-[#ccc] text-sm">{formatToLocaleDateTimeString(item.created_at)}</time>
                  </div>
                  <h2 className="mt-3">{item.title}</h2>
                  <p className="overflow-hidden whitespace-nowrap truncate ...">{item.content}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/4">
          <h2 className="text-xl font-semibold">해피멍터</h2>
          <ul className="bg-secondaryColor rounded-xl mt-5 mb-10 pt-10 px-10 pb-5">
            {topSavedItems.map((item) => (
              <li key={item.postId} className="mb-5 bg-white text-left rounded-xl">
                <Link href={`/trade/detail/${item.postId}`} className="p-7 block">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h2 className="mr-3 font-semibold text-xl">{item.userId}</h2>
                      <p className="mr-2">
                        <FontAwesomeIcon className="mr-1 text-primaryColor" icon={faHeartSolid} />
                        <span>{item.saved}</span>
                      </p>
                      <p>
                        <FontAwesomeIcon className="mr-1 text-primaryColor -scale-x-100 size-4" icon={faCommentDots} />
                        {tradecomments.filter((comment) => comment.postId === item.postId).length}
                      </p>
                    </div>
                    <time className="text-[#ccc] text-sm">{formatToLocaleDateTimeString(item.created_at)}</time>
                  </div>
                  <h2 className="mt-3">{item.title}</h2>
                  <p className="overflow-hidden whitespace-nowrap truncate ...">{item.content}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
