'use client';

import useDeleteCommunityCommentMutation from '@/app/_hooks/useDeleteCommunityCommentMutation';
import useDeleteTradeCommentMutation from '@/app/_hooks/useDeleteTradeCommentMutation';
import React from 'react';

const CommentDeleteButton = ({ commentId, mode }: { commentId: string; mode: string }) => {
  const { deleteComment } =
    mode === 'community' ? useDeleteCommunityCommentMutation(commentId) : useDeleteTradeCommentMutation(commentId);

  const handleDeleteClick = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteComment();
    } else return;
  };

  return <button onClick={handleDeleteClick}>삭제</button>;
};

export default CommentDeleteButton;
