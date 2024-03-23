'use client';

import React, { useEffect, useState } from 'react';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addScrappedPost, fetchScrappedPosts, removeScrappedPost } from '@/app/_api/detailPage-api';
import bookMarkedImg from '@/public/images/bookmark-fill.png';
import unBookMarkedImg from '@/public/images/bookmark.png';
import Image from 'next/image';

const ScrapButton = ({ userId, postId }: { userId: string; postId: string }) => {
  const queryClient = useQueryClient();

  // 원활한 렌더링 방법 강구해볼 것
  const {
    data: scrappedPosts, // 배열
    isLoading,
    error
  } = useQuery({
    queryKey: ['scrappedPosts', userId],
    queryFn: () => fetchScrappedPosts(userId),
    placeholderData: keepPreviousData // 리쿼 버전5 - 근데해봤자.
  });

  const { mutate: addPostMutate } = useMutation({
    mutationFn: async () => await addScrappedPost(userId, postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [scrappedPosts] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.'); // toast 사용?
    }
  });

  const { mutate: removePostMutate } = useMutation({
    mutationFn: async () => await removeScrappedPost(userId, postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [scrappedPosts] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  useEffect(() => {
    scrappedPosts?.includes(postId);
  }, [scrappedPosts]);

  const toggleBookMarkClick = async () => {
    if (!scrappedPosts?.includes(postId)) {
      try {
        await addPostMutate();
        window.location.reload(); // 뺄방법 생각해보기? 다른컴포넌트까지 페이지전체 리렌더링돼서 ㅠㅠ
      } catch (error) {
        alert('북마크 추가가 제대로 되지 않았어요. 다시 시도해주세요 !');
        console.error(error);
      }
    } else {
      try {
        await removePostMutate();
        window.location.reload(); // 새로고침해 삭제된 목록으로 갱신
      } catch (error) {
        alert('북마크 삭제가 제대로 되지 않았어요. 다시 시도해주세요 !');
        console.error(error);
      }
    }
  };

  if (isLoading) {
    <div>잠시만 기다려주세요!</div>;
  }

  if (error) return <div>error</div>;

  return (
    <button onClick={toggleBookMarkClick} className="text-lg border-2 border-gray-300 rounded p-2">
      <Image src={scrappedPosts?.includes(postId) ? bookMarkedImg : unBookMarkedImg} alt="bookmark_img" width={23} />
    </button>
  );
};

export default ScrapButton;
