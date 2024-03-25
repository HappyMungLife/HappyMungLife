'use client';

import useAddCommunityCommentMutation from '@/app/_hooks/useAddCommunityCommentMutation';
import useAddTradeCommentMutation from '@/app/_hooks/useAddTradeCommentMutation';
import React, { useState } from 'react';

const CommentForm = ({ userId, postId, mode }: { userId: string; postId: string; mode: string }) => {
  const [content, setContent] = useState('');

  const { addComment } =
    mode === 'community'
      ? useAddCommunityCommentMutation(userId, postId, content)
      : useAddTradeCommentMutation(userId, postId, content);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) {
      return alert('댓글을 입력해주세요.');
    }
    await addComment();
    setContent('');
  };

  return (
    <form onSubmit={handleCommentSubmit} className="flex flex-col gap-5 my-5">
      <textarea
        placeholder="댓글을 입력해주세요 (최대 200자)"
        value={content}
        onChange={handleCommentChange}
        className="w-[1000px] h-[100px] border-2 border-gray-300 rounded-3xl p-5 resize-none focus:outline-none focus:ring-1 focus:ring-gray-300"
        maxLength={200}
      />
      <div className="flex justify-end">
        <button type="submit" className="bg-primaryColor font-semibold text-white rounded p-2 w-20">
          등록
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
