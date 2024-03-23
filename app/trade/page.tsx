'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { TradeData } from '@/app/_api/tradeApi';
import { formatToLocaleDateTimeString } from '../_utils/date';
import Image from 'next/image';

const Trade = () => {
  const { tradeItems, tradeLoading, tradeError } = TradeData();
  const [sortedItems, setSortedItems] = useState<any[]>([]);
  const [isActive, setIsActive] = useState('latest');

  useEffect(() => {
    setSortedItems([...tradeItems].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
  }, [tradeItems]);

  if (tradeLoading) return <div>Loading...</div>;
  if (tradeError) return <div>Error: {tradeError.message}</div>;

  const onClickLatestHandle = () => {
    setSortedItems([...tradeItems].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    setIsActive('latest');
  };

  const onClickLikeHandle = () => {
    setSortedItems([...tradeItems].sort((a, b) => b.saved - a.saved));
    setIsActive('saved');
  };

  const onClickTradeHandle = () => {
    alert('로그인해야 쓸 수 있습니다.');
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
        <button className="hover:text-primaryColor" onClick={onClickTradeHandle}>
          작성하기
        </button>
      </div>
      <div>
        <ul>
          {sortedItems.map((item) => (
            <li key={item.postId} className="flex border border-primaryColor rounded-2xl mb-5">
              <Link href={`/trade/detail/${item.postId}`} className="flex items-center p-10 w-full">
                <figure>
                  {item.imageUrl ? (
                    <figcaption className="mr-10">
                      <Image src={item.imageUrl[0]} alt={item.title} width={250} height={0} />
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
