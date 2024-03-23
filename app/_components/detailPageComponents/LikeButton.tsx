'use client';

import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import Image from 'next/image';
import likedImg from '@/public/images/thumbs-up-fill.png';
import nonLikedImg from '@/public/images/thumbs-up.png';
import {
  addLikedPost,
  decreaseLikesCount,
  fetchLikedPosts,
  fetchLikesCount,
  increaseLikesCount,
  removeLikedPost
} from '@/app/_api/detailPage-api';

const LikeButton = ({ userId, postId }: { userId: string; postId: string }) => {
  const queryClient = useQueryClient();

  // 내가 좋아요한 게시글 목록 가져오기
  const {
    data: likedPosts,
    isLoading: isFetchPostsLoading,
    error: fetchPostsError
  } = useQuery({
    queryKey: ['likedPosts', userId],
    queryFn: () => fetchLikedPosts(userId)
  });

  // 게시글의 좋아요 수
  const {
    data: likesCount,
    isLoading: isFetchCountLoading,
    error: fetchCountError
  } = useQuery({
    queryKey: ['likesCount', postId],
    queryFn: () => fetchLikesCount(postId)
  });

  // 내 좋아요 목록에 해당 글 추가
  const { mutate: addPostMutate } = useMutation({
    mutationFn: async () => await addLikedPost(userId, postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['likedPosts'] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  // 내 좋아요 목록에서 해당 글 삭제
  const { mutate: removePostMutate } = useMutation({
    mutationFn: async () => await removeLikedPost(userId, postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['likedPosts'] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  const { mutate: increaseLikeMutate } = useMutation({
    mutationFn: async () => await increaseLikesCount(postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['likesCount'] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  const { mutate: decreaseLikeMutate } = useMutation({
    mutationFn: async () => await decreaseLikesCount(postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['likesCount'] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  const toggleLikeClick = async () => {
    if (!likedPosts?.includes(postId)) {
      try {
        await addPostMutate();
        await increaseLikeMutate();
      } catch (error) {
        alert('좋아요 추가가 제대로 되지 않았어요. 다시 시도해주세요 !');
        console.error(error);
      }
    } else {
      try {
        await removePostMutate();
        await decreaseLikeMutate();
      } catch (error) {
        alert('좋아요 해제가 제대로 되지 않았어요. 다시 시도해주세요 !');
        console.error(error);
      }
    }
  };

  if (isFetchPostsLoading || isFetchCountLoading) {
    <div>로딩 중입니다. 잠시만 기다려주세요!</div>;
  }

  if (fetchPostsError || fetchCountError) {
    console.error(fetchPostsError);
    return <div>처리에 오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <div className="flex gap-3 items-center text-md border-2 border-gray-300 rounded p-2">
      <button onClick={toggleLikeClick}>
        <Image src={likedPosts?.includes(postId) ? likedImg : nonLikedImg} alt="like_img" width={30} />
      </button>
      <p>{likesCount}</p>
    </div>
  );
};

export default LikeButton;
