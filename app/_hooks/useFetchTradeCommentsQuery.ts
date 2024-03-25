import { useQuery } from '@tanstack/react-query';
import { fetchTradeComments } from '../_api/comment-api';

const useFetchTradeCommentsQuery = (userId: string, postId: string) => {
  return useQuery({
    queryKey: ['tradeComments', userId],
    queryFn: () => fetchTradeComments(postId)
  });
};

export default useFetchTradeCommentsQuery;
