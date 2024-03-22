'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { TradeData } from '@/app/_components/communityComponents/tradeSupabase';
import { formatToLocaleDateTimeString } from '../_utils/date';
import Image from 'next/image';

const Trade = () => {
  const { items, loading, error } = TradeData();
  const [sortedItems, setSortedItems] = useState<any[]>([]);
  const [isActive, setIsActive] = useState('latest');

  console.log(items);
  useEffect(() => {
    setSortedItems([...items].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
  }, [items]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const onClickLatestHandle = () => {
    setSortedItems([...items].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    setIsActive('latest');
  };

  const onClickLikeHandle = () => {
    setSortedItems([...items].sort((a, b) => b.saved - a.saved));
    setIsActive('like');
  };

  return (
    <section className="w-full px-10 py-20">
      <div className="flex justify-between items-center mb-10">
        <div>
          <button
            onClick={onClickLatestHandle}
            className={`hover:text-primaryColor mr-5 font-semibold ${isActive === 'latest' ? 'active' : ''}`}
          >
            최신순
          </button>
          <button
            onClick={onClickLikeHandle}
            className={`hover:text-primaryColor font-semibold ${isActive === 'saved' ? 'active' : ''}`}
          >
            인기순
          </button>
        </div>
        <button className="hover:text-primaryColor">작성하기</button>
      </div>
      <div>
        <ul>
          {sortedItems.map((item) => (
            <li key={item.postId} className="flex border border-primaryColor rounded-2xl mb-5">
              <Link href="" className="flex p-10 w-full">
                <figure>
                  {item.imageUrl ? (
                    <figcaption>
                      <Image src={item.imageUrl} alt={item.userId} />
                    </figcaption>
                  ) : null}
                </figure>
                <div className="w-full relative">
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {/* <p>닉네임이미지</p> */}
                      <h2 className="mr-3">{item.userId}</h2>
                      <p>
                        <span>{item.liked}</span>
                      </p>
                    </div>
                    <time className="text-[#ccc] mr-14">{formatToLocaleDateTimeString(item.created_at)}</time>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-2">{item.content}</p>
                  </div>
                  <div></div>
                  <button className="w-4 absolute right-0 top-0 flex gap-1 items-center mr-5">
                    <FontAwesomeIcon className="size-5 text-primaryColor" icon={faHeartRegular} />
                    <p>{item.saved}</p>
                  </button>
                  {/* <button className="w-4 absolute right-0 top-0 flex gap-1 items-center">
                      <FontAwesomeIcon className="size-5 text-primaryColor" icon={faHeartSolid} />
                      <p>{item.saved}</p>
                  </button> */}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Trade;
