'use client';

import { deleteCommunityPost } from '@/app/_api/detailPage-api';
import { useRouter } from 'next/navigation';
import React from 'react';

const EditDeleteButton = ({ postId }: { postId: string }) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/community/detail/${postId}/edit`); // trade 도
  };

  const handleDeleteClick = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteCommunityPost(postId); // 여기서 리쿼를 쓸 필요가 있을까?
        router.replace('/community');
      } catch (error) {
        throw error;
      }
    }
  };

  return (
    <div className="flex gap-5">
      <button className=" border-2 border-gray-300 rounded p-2" onClick={handleEditClick}>
        수정
      </button>
      <button className=" border-2 border-gray-300 rounded p-2" onClick={handleDeleteClick}>
        삭제
      </button>
    </div>
  );
};

export default EditDeleteButton;
