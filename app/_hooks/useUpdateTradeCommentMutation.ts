import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTradeComment } from '../_api/comment-api';

const useUpdateTradeCommentMutation = (commentId: string, editedContent: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => await updateTradeComment(commentId, editedContent),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tradeComments'] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  const updateComment = async () => {
    mutate();
  };

  return { updateComment };
};

export default useUpdateTradeCommentMutation;
