'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkSolid, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import {
  faBookmark as faBookmarkRegular,
  faHeart as faHeartRegular,
  faCommentDots
} from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CommunityData } from '@/app/_components/communityPageComponents/CommumityData';
import { formatToLocaleDateTimeString } from '../_utils/date';
import Image from 'next/image';
import CommunityCommentsData from '../_components/communityPageComponents/CommunityCommentsData';

const Community = () => {
  const { items, loading, error } = CommunityData();
  const { comments } = CommunityCommentsData();
  const [sortedItems, setSortedItems] = useState<any[]>([]);
  const [isActive, setIsActive] = useState('latest');

  useEffect(() => {
    setSortedItems([...items].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
  }, [items]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(comments);
  const onClickLatestHandle = () => {
    setSortedItems([...items].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    setIsActive('latest');
  };

  const onClickLikeHandle = () => {
    setSortedItems([...items].sort((a, b) => b.liked - a.liked));
    setIsActive('like');
  };

  const onClickWhiteHandle = () => {
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
            className={`hover:text-primaryColor font-semibold ${isActive === 'like' ? 'active' : ''}`}
          >
            인기순
          </button>
        </div>
        <button className="hover:text-primaryColor" onClick={onClickWhiteHandle}>
          작성하기
        </button>
      </div>
      <div>
        <ul>
          {sortedItems.map((item) => (
            <li key={item.postId} className="flex border border-primaryColor rounded-2xl mb-5">
              <Link href={`community/detail/${item.postId}`} className="flex items-center p-10 w-full">
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
                      <h2 className="mr-3">{item.userId}</h2>
                      <div className="flex items-center">
                        <FontAwesomeIcon className="mr-1 text-primaryColor" icon={faHeartSolid} />
                        <p className="mr-3">{item.liked}</p>
                        <p>
                          <FontAwesomeIcon
                            className="mr-1 text-primaryColor -scale-x-100 size-4"
                            icon={faCommentDots}
                          />
                          {comments.filter((comment) => comment.postId === item.postId).length}
                        </p>
                      </div>
                    </div>
                    <time className="text-[#ccc] mr-10">{formatToLocaleDateTimeString(item.created_at)}</time>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-2">{item.content}</p>
                  </div>
                  <button className="w-4 absolute right-0 top-0 text-primaryColor">
                    <FontAwesomeIcon className="size-5 " icon={faBookmarkRegular} />
                  </button>
                  {/* <button className="w-4 absolute right-0 top-0 ">
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
