import { useQuery } from '@tanstack/react-query';
import { fetchCommunityComments } from '../_api/comment-api';

const useFetchCommunityCommentsQuery = (userId: string, postId: string) => {
  return useQuery({
    queryKey: ['communityComments', userId],
    queryFn: () => fetchCommunityComments(postId)
  });
};

export default useFetchCommunityCommentsQuery;
