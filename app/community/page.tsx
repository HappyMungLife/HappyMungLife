'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkSolid, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular, faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CommunityData } from '@/app/_components/communityComponents/commumitySupabase';
import { getFormattedDate } from '../_hooks/formattedDate';
import Image from 'next/image';

const Community = () => {
  const { items, loading, error } = CommunityData();
  const [sortedItems, setSortedItems] = useState<any[]>([]);
  const [isActive, setIsActive] = useState('latest');

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
    setSortedItems([...items].sort((a, b) => b.liked - a.liked));
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
            className={`hover:text-primaryColor font-semibold ${isActive === 'like' ? 'active' : ''}`}
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
                        <FontAwesomeIcon className="mr-1 text-primaryColor" icon={faHeartSolid} />
                        <span>{item.liked}</span>
                      </p>
                    </div>
                    <time className="text-[#ccc] mr-10">{getFormattedDate(item.created_at)}</time>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-2">{item.content}</p>
                  </div>
                  <button className="w-4 absolute right-0 top-0">
                    <FontAwesomeIcon className="size-5" icon={faBookmarkRegular} />
                  </button>
                  {/* <button className="w-4 absolute right-0 top-0 text-primaryColor">
                    <FontAwesomeIcon className="size-5" icon={faBookmarkSolid} />
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

export default Community;
