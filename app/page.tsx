'use client';

import Image from 'next/image';
import Visual from '@/public/images/visual_1.png';
import { CommunityData } from './_components/communityComponents/commumitySupabase';
import { useEffect, useState } from 'react';
import { formatToLocaleDateTimeString } from './_utils/date';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Index() {
  const { items, loading, error } = CommunityData();
  const [topLikedItems, setTopLikedItems] = useState<any[]>([]);

  useEffect(() => {
    if (items) {
      const sortedByLikes = [...items].sort((a, b) => b.liked - a.liked);
      const top3Items = sortedByLikes.slice(0, 3);
      setTopLikedItems(top3Items);
    }
  }, [items]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main>
      <section>
        <ul>
          <li>
            <Image src={Visual} alt="visual" className="size-full" />
          </li>
        </ul>
      </section>
      <section className="flex text-center pt-10 gap-10 px-10">
        <div className="w-2/4">
          <h2 className="text-lg font-semibold">커뮤니티</h2>
          <ul className="bg-secondaryColor rounded-xl mt-3 mb-10 pt-10 px-10 pb-5">
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
                  <p>{item.content}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/4">
          <h2 className="text-lg font-semibold">중고거래</h2>
          <div className="bg-secondaryColor rounded-xl mt-3 mb-10 p-10">중고거래 내용</div>
        </div>
      </section>
    </main>
  );
}
