import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { removeCommuntiyComment } from '../_api/comment-api';

const useDeleteCommunityCommentMutation = (commentId: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => await removeCommuntiyComment(commentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['communityComments'] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  const deleteComment = async () => {
    mutate();
  };

  return { deleteComment };
};

export default useDeleteCommunityCommentMutation;
