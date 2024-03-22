'use client';

import Image from 'next/image';
import visual1 from '@/public/images/visual_1.png';
import visual2 from '@/public/images/visual_2.png';
import visual3 from '@/public/images/visual_3.png';
import { CommunityData } from './_components/communityComponents/commumitySupabase';
import { useEffect, useState } from 'react';
import { formatToLocaleDateTimeString } from './_utils/date';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TradeData } from './_components/communityComponents/tradeSupabase';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider

export default function Index() {
  //커뮤니티
  const { items, loading, error } = CommunityData();
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
      const sortedByLikes = [...tradeItems].sort((a, b) => b.liked - a.liked);
      const top3Items = sortedByLikes.slice(0, 3);
      setTopSavedItems(top3Items);
    }
  }, [tradeItems]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (tradeLoading) return <div>Loading...</div>;
  if (tradeError) return <div>Error: {tradeError.message}</div>;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <main>
      <section className="slider-container">
        <Slider {...settings}>
          <ul>
            <li>
              <Image src={visual1} alt="어서와요 해피멍생 만나서 반가워요!" className="size-full" />
            </li>
            <li>
              <Image src={visual2} alt="우리모두 해피멍생 커뮤니티에서 공유해요" className="size-full" />
            </li>
            <li>
              <Image src={visual3} alt="우리아이 반려용품 우리모두 해피멍터" className="size-full" />
            </li>
          </ul>
        </Slider>
      </section>
      <section className="flex text-center pt-10 gap-10 px-10">
        <div className="w-2/4">
          <h2 className="text-xl font-semibold">커뮤니티</h2>
          <ul className="bg-secondaryColor rounded-xl mt-5 mb-10 pt-10 px-10 pb-5">
            {topLikedItems.map((item) => (
              <li key={item.postId} className="mb-5 bg-white text-left rounded-xl">
                <Link href="/" className="p-7 block">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h2 className="mr-3 font-semibold text-xl">{item.userId}</h2>
                      <p>
                        <FontAwesomeIcon className="mr-1 text-primaryColor" icon={faHeartSolid} />
                        <span>{item.liked}</span>
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
          <h2 className="text-xl font-semibold">중고거래</h2>
          <ul className="bg-secondaryColor rounded-xl mt-5 mb-10 pt-10 px-10 pb-5">
            {topSavedItems.map((item) => (
              <li key={item.postId} className="mb-5 bg-white text-left rounded-xl">
                <Link href="/" className="p-7 block">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h2 className="mr-3 font-semibold text-xl">{item.userId}</h2>
                      <p>
                        <FontAwesomeIcon className="mr-1 text-primaryColor" icon={faHeartSolid} />
                        <span>{item.saved}</span>
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
