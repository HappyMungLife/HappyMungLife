'use client';

import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import Image from 'next/image';
// import likedImg from '@/public/images/like_colored_image.png';
import likedImg from '@/public/images/rating_2636589.png';
// import nonLikedImg from '@/public/images/like_gray_image.png';
import nonLikedImg from '@/public/images/rating_2636609.png';
import {
  addLikedPost,
  decreaseLikesCount,
  fetchLikedPosts,
  increaseLikesCount,
  removeLikedPost
} from '@/app/_api/detailPage-api';

// liked (좋아요수)- props로 받아와야 매끄럽게 렌더링된다
const LikeButton = ({ userId, postId, liked }: { userId: string; postId: string; liked: number }) => {
  const queryClient = useQueryClient();

  // 내가 좋아요한 게시글 목록 가져오기
  const {
    data: likedPosts,
    isLoading: isFetchPostsLoading,
    error: fetchPostsError
  } = useQuery({
    queryKey: ['likedPosts', userId],
    queryFn: () => fetchLikedPosts(userId)
    // placeholderData: keepPreviousData // 리쿼 버전5 - 근데해봤자.
  });

  // 내 좋아요 목록에 해당 글 추가
  const { mutate: addPostMutate } = useMutation({
    mutationFn: async () => await addLikedPost(userId, postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [likedPosts] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  // 내 좋아요 목록에서 해당 글 삭제
  const { mutate: removePostMutate } = useMutation({
    mutationFn: async () => await removeLikedPost(userId, postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [likedPosts] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  const toggleLikeClick = async () => {
    if (!likedPosts?.includes(postId)) {
      try {
        await addPostMutate();
        await increaseLikesCount(postId);
        window.location.reload();
      } catch (error) {
        alert('좋아요 추가가 제대로 되지 않았어요. 다시 시도해주세요 !');
        console.error(error);
      }
    } else {
      try {
        await removePostMutate();
        await decreaseLikesCount(postId);
        window.location.reload();
      } catch (error) {
        alert('좋아요 해제가 제대로 되지 않았어요. 다시 시도해주세요 !');
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
      <button onClick={toggleLikeClick}>
        <Image src={likedPosts?.includes(postId) ? likedImg : nonLikedImg} alt="like_img" width={30} />
      </button>
      <p>{liked}</p>
    </div>
  );
};

export default LikeButton;
