import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTradeComment } from '../_api/comment-api';

const useAddTradeCommentMutation = (userId: string, postId: string, content: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => await addTradeComment(userId, postId, content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tradeComments'] }),
    onError: () => {
      alert('처리에 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  const addComment = async () => {
    mutate();
  };

  return { addComment };
};

export default useAddTradeCommentMutation;
