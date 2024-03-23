'use client';

import React from 'react';
import unSavedImg from '@/public/images/heart.png';
import savedImg from '@/public/images/heart-fill.png';
import Image from 'next/image';
import {
  addStoredPost,
  decreaseSaveCount,
  fetchStoredPosts,
  increaseSaveCount,
  removeStoredPost
} from '@/app/_api/detailPage-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const SaveButton = ({ userId, postId, saved }: { userId: string; postId: string; saved: number }) => {
  const queryClient = useQueryClient();
  // 내가 찜한 게시글 목록 가져오기
  const {
    data: storedPosts,
    isLoading: isFetchPostsLoading,
    error: fetchPostsError
  } = useQuery({
    queryKey: ['storedPosts', userId],
    queryFn: () => fetchStoredPosts(userId)
  });

  // 내 좋아요 목록에 해당 글 추가
  const { mutate: addPostMutate } = useMutation({
    mutationFn: async () => await addStoredPost(userId, postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [storedPosts] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  // 내 좋아요 목록에서 해당 글 삭제
  const { mutate: removePostMutate } = useMutation({
    mutationFn: async () => await removeStoredPost(userId, postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [storedPosts] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  const toggleSaveClick = async () => {
    if (!storedPosts?.includes(postId)) {
      try {
        await addPostMutate();
        // await addStoredPost(userId, postId);
        await increaseSaveCount(postId);
        window.location.reload();
      } catch (error) {
        alert('찜 추가가 제대로 되지 않았어요. 다시 시도해주세요 !');
        console.error(error);
      }
    } else {
      try {
        await removePostMutate();
        // await removeStoredPost(userId, postId);
        await decreaseSaveCount(postId);
        window.location.reload();
      } catch (error) {
        alert('찜 해제가 제대로 되지 않았어요. 다시 시도해주세요 !');
        console.error(error);
      }
    }
  };

  if (isFetchPostsLoading) {
    <div>로딩 중입니다. 잠시만 기다려주세요!</div>;
  }

  if (fetchPostsError) {
    console.error(fetchPostsError);
    return <div>처리에 오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <div className="flex gap-3 items-center text-md border-2 border-gray-300 rounded p-2">
      <button onClick={toggleSaveClick}>
        <Image src={storedPosts?.includes(postId) ? savedImg : unSavedImg} alt="like_img" width={25} />
      </button>
      <p>{saved}</p>
    </div>
  );
};

export default SaveButton;
