import { createClientJs } from '../_utils/supabase/clientJs';

const supabase = createClientJs();

export const deleteCommunityPost = async (postId: string) => {
  console.log(postId);
  const { error } = await supabase.from('communityPosts').delete().eq('postId', postId);
  if (error) {
    console.error(`Failed to fetch data from Supabase - ${error}`);
  }
};
