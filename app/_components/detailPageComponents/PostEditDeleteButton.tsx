'use client';

import { removeCommunityPost, removeTradePost } from '@/app/_api/detailPage-api';
import { useRouter } from 'next/navigation';
import React from 'react';

const PostEditDeleteButton = ({ postId, mode }: { postId: string; mode?: string }) => {
  const router = useRouter();

  const handleEditClick = () => {
    mode === 'community'
      ? router.push(`/community/detail/${postId}/edit`)
      : router.push(`/trade/detail/${postId}/edit`);
  };

  const handleDeleteClick = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      if (mode === 'community') {
        try {
          await removeCommunityPost(postId);
          router.replace('/community');
        } catch (error) {
          throw error;
        }
      } else {
        try {
          await removeTradePost(postId);
          router.replace('/trade');
        } catch (error) {
          throw error;
        }
      }
    } else return;
  };

  return (
    <div className="flex gap-5 ml-[470px]">
      <button className="bg-primaryColor font-semibold text-white rounded p-2 w-20" onClick={handleEditClick}>
        수정
      </button>
      <button className="bg-red-400/60 font-semibold text-white rounded p-2 w-20" onClick={handleDeleteClick}>
        삭제
      </button>
    </div>
  );
};

export default PostEditDeleteButton;
