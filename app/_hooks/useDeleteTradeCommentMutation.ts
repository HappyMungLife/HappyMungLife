import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeTradeComment } from '../_api/comment-api';

const useDeleteTradeCommentMutation = (commentId: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => await removeTradeComment(commentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tradeComments'] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  const deleteComment = async () => {
    mutate();
  };

  return { deleteComment };
};

export default useDeleteTradeCommentMutation;
