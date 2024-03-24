'use client';

import React from 'react';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addScrappedPost, fetchScrappedPosts, removeScrappedPost } from '@/app/_api/detailPage-api';
import bookMarkedImg from '@/public/images/bookmark-fill.png';
import unBookMarkedImg from '@/public/images/bookmark.png';
import Image from 'next/image';

const ScrapButton = ({ userId, postId }: { userId: string; postId: string }) => {
  const queryClient = useQueryClient();

  const {
    data: scrappedPosts,
    isLoading,
    error
  } = useQuery({
    queryKey: ['scrappedPosts', userId],
    queryFn: () => fetchScrappedPosts(userId)
  });

  const { mutate: addPostMutate } = useMutation({
    mutationFn: async () => await addScrappedPost(userId, postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['scrappedPosts'] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.'); // toast 사용?
    }
  });

  const { mutate: removePostMutate } = useMutation({
    mutationFn: async () => await removeScrappedPost(userId, postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['scrappedPosts'] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  const toggleBookMarkClick = async () => {
    if (!scrappedPosts?.includes(postId)) {
      await addPostMutate();
    } else {
      await removePostMutate();
    }
  };

  if (isLoading) {
    <div>로딩 중입니다. 잠시만 기다려주세요!</div>;
  }

  if (error) {
    console.error(error);
    return <div>처리에 오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <button onClick={toggleBookMarkClick} className="text-lg mt-1 p-2">
      <Image src={scrappedPosts?.includes(postId) ? bookMarkedImg : unBookMarkedImg} alt="bookmark_img" width={20} />
    </button>
  );
};

export default ScrapButton;
