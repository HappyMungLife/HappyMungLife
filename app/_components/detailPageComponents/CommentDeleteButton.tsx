'use client';

import { removeComment } from '@/app/_api/comment-api';
import React from 'react';

const CommentDeleteButton = ({ commentId }: { commentId: string }) => {
  const handleDeleteClick = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await removeComment(commentId);
        // useEffect 로 렌더링?
      } catch (error) {
        throw error;
      }
    } else return;
  };

  return <button onClick={handleDeleteClick}>삭제</button>;
};

export default CommentDeleteButton;
