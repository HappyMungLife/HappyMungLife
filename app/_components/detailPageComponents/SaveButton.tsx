'use client';

import React from 'react';
import unSavedImg from '@/public/images/heart.png';
import savedImg from '@/public/images/heart-fill.png';
import Image from 'next/image';
import {
  addStoredPost,
  decreaseSaveCount,
  fetchSaveCount,
  fetchStoredPosts,
  increaseSaveCount,
  removeStoredPost
} from '@/app/_api/detailPage-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const SaveButton = ({ userId, postId }: { userId: string; postId: string }) => {
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

  const {
    data: saveCount,
    isLoading: isFetchCountLoading,
    error: fetchCountError
  } = useQuery({
    queryKey: ['saveCount', postId],
    queryFn: () => fetchSaveCount(postId)
  });

  const { mutate: addPostMutate } = useMutation({
    mutationFn: async () => await addStoredPost(userId, postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['storedPosts'] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  const { mutate: removePostMutate } = useMutation({
    mutationFn: async () => await removeStoredPost(userId, postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['storedPosts'] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  const { mutate: increaseSaveMutate } = useMutation({
    mutationFn: async () => await increaseSaveCount(postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['saveCount'] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  const { mutate: decreaseSaveMutate } = useMutation({
    mutationFn: async () => await decreaseSaveCount(postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['saveCount'] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  const toggleSaveClick = async () => {
    if (!storedPosts?.includes(postId)) {
      await addPostMutate();
      // await increaseSaveCount(postId);
      await increaseSaveMutate();
    } else {
      await removePostMutate();
      await decreaseSaveMutate();
      // await decreaseSaveCount(postId);
    }
  };

  if (isFetchPostsLoading || isFetchCountLoading) {
    <div>로딩 중입니다. 잠시만 기다려주세요!</div>;
  }

  if (fetchPostsError || fetchCountError) {
    console.error(fetchPostsError || fetchCountError);
    return <div>처리에 오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <div className="flex gap-3 items-center text-md border-2 border-gray-300 rounded p-2">
      <button onClick={toggleSaveClick}>
        <Image src={storedPosts?.includes(postId) ? savedImg : unSavedImg} alt="like_img" width={25} />
      </button>
      <p>{saveCount}</p>
    </div>
  );
};

export default SaveButton;
