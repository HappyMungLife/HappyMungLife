'use client';

import React from 'react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import useFetchCommunityCommentsQuery from '@/app/_hooks/useFetchCommunityCommentsQuery';
import useFetchTradeCommentsQuery from '@/app/_hooks/useFetchTradeCommentsQuery';

const CommentList = ({ postId, userId, mode }: { postId: string; userId: string; mode: string }) => {
  let comments = [];
  let isLoading = false;
  let error = null;

  if (mode === 'community') {
    const {
      data,
      isLoading: isCommunityLoading,
      error: communityError
    } = useFetchCommunityCommentsQuery(userId, postId);
    comments = data || [];
    isLoading = isCommunityLoading;
    error = communityError;
  } else {
    const { data, isLoading: isTradeLoading, error: tradeError } = useFetchTradeCommentsQuery(userId, postId);
    comments = data || [];
    isLoading = isTradeLoading;
    error = tradeError;
  }

  if (isLoading) {
    <div>로딩 중입니다. 잠시만 기다려주세요!</div>;
  }

  if (error) {
    console.error(error);
    return <div>처리에 오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <section className="mt-20 px-10 w-full flex flex-col items-center">
      <p className="p-2 pr-[1030px] items-start">댓글 {comments?.length}</p>
      <hr className="bg-gray-400 w-[1100px]" />
      {/* 유저 로그인 상태, 해당 유저일 시 뜨게함 */}
      <div className="my-10 flex flex-col justify-center items-center">
        <CommentForm userId={userId} postId={postId} mode={mode} />
        {comments?.map((comment) => {
          // 타입 재설정
          return <CommentItem comment={comment} userId={userId} mode={mode} />;
        })}
      </div>
    </section>
  );
};

export default CommentList;
