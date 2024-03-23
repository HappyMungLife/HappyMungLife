'use client';

import { createClientJs } from '@/app/_utils/supabase/clientJs';
import React, { useEffect } from 'react';

// 리렌더링 하기 - 리쿼 사용?
const CommentForm = ({ userId, postId }: { userId: string; postId: string }) => {
  const supabase = createClientJs();

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const content = formData.get('content') as string;

    if (!content.trim()) {
      return alert('댓글을 입력해주세요.');
    }

    try {
      const { error } = await supabase
        .from('communityComments')
        .insert({ content: content, userId: userId, postId: postId });
      e.currentTarget?.reset();
      if (error) throw error.message;
    } catch (error) {
      console.error(error);
      alert('정상적으로 댓글 입력이 되지 않았습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {}, [handleSubmitComment]);

  return (
    <form onSubmit={handleSubmitComment} className="flex flex-col gap-5 my-5">
      <textarea
        placeholder="댓글을 입력해주세요 (최대 200자)"
        name="content"
        className="w-[1000px] h-[100px] border-2 border-gray-300 rounded-3xl p-5 resize-none"
        maxLength={200}
      />
      <div className="flex justify-end">
        <button type="submit" className="border-2 border-gray-300 rounded p-2 w-20">
          등록
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
