import { createClientJs } from '../_utils/supabase/clientJs';

const supabase = createClientJs();

// 커뮤니티 글 삭제
export const removeCommunityPost = async (postId: string) => {
  const { error } = await supabase.from('communityPosts').delete().eq('postId', postId);
  if (error) {
    console.error(`Failed to delete data from Supabase - ${error.message}`);
  }
};

// 중고거래 글 삭제
export const removeTradePost = async (postId: string) => {
  const { error } = await supabase.from('tradePosts').delete().eq('postId', postId);
  if (error) {
    console.error(`Failed to delete data from Supabase - ${error.message}`);
  }
};

// 스크랩 글 목록 (배열) 가져오기
export const fetchScrappedPosts = async (userId: string) => {
  const { data, error } = await supabase.from('users').select('scrappedCommunityPosts').eq('userId', userId);
  if (error) {
    console.error(`Failed to fetch data from Supabase - ${error.message}`);
  }
  return data![0].scrappedCommunityPosts; // 배열
};

export const addScrappedPost = async (userId: string, postId: string) => {
  const { error } = await supabase.rpc('add_post_to_scrapped_posts', { post_id: postId, user_id: userId });
  if (error) {
    console.error(`Failed to add data to Supabase - ${error.message}`);
  }
};

export const removeScrappedPost = async (userId: string, postId: string) => {
  const { error } = await supabase.rpc('remove_post_from_scrapped_posts', { post_id: postId, user_id: userId });
  if (error) {
    console.error(`Failed to remove data from Supabase - ${error.message}`);
  }
};

// 좋아요 글 목록 (배열) 가져오기
export const fetchLikedPosts = async (userId: string) => {
  const { data, error } = await supabase.from('users').select('likedCommunityPosts').eq('userId', userId);
  if (error) {
    console.error(`Failed to fetch data from Supabase - ${error.message}`);
  }
  return data![0].likedCommunityPosts;
};

export const addLikedPost = async (userId: string, postId: string) => {
  const { error } = await supabase.rpc('add_post_to_liked_posts', { post_id: postId, user_id: userId });
  if (error) {
    console.error(`Failed to add data to Supabase - ${error.message}`);
  }
};

export const removeLikedPost = async (userId: string, postId: string) => {
  const { error } = await supabase.rpc('remove_post_from_liked_posts', { post_id: postId, user_id: userId });
  if (error) {
    console.error(`Failed to remove data from Supabase - ${error.message}`);
  }
};

// 좋아요 카운트수 가져오기
export const fetchLikesCount = async (postId: string) => {
  const { data, error } = await supabase.from('communityPosts').select('liked').eq('postId', postId);
  if (error) {
    console.error(`Failed to fetch data from Supabase - ${error}`);
  }
  return data![0].liked;
};

export const increaseLikesCount = async (postId: string) => {
  const { error } = await supabase.rpc('increment_likes_count', { post_id: postId });
  if (error) {
    console.error(`Failed to increase count to Supabase - ${error.message}`);
  }
};

export const decreaseLikesCount = async (postId: string) => {
  const { error } = await supabase.rpc('decrement_likes_count', { post_id: postId });
  if (error) {
    console.error(`Failed to decrease count to Supabase - ${error.message}`);
  }
};

// 찜 글 목록 (배열) 가져오기
export const fetchStoredPosts = async (userId: string) => {
  const { data, error } = await supabase.from('users').select('savedTradePosts').eq('userId', userId);
  if (error) {
    console.error(`Failed to fetch data from Supabase - ${error.message}`);
  }
  return data![0].savedTradePosts; // 배열
};

// 찜 글 목록 추가
export const addStoredPost = async (userId: string, postId: string) => {
  const { error } = await supabase.rpc('add_post_to_saved_posts', { post_id: postId, user_id: userId });
  if (error) {
    console.error(`Failed to add data to Supabase - ${error.message}`);
  }
};

// 찜 글 목록 삭제
export const removeStoredPost = async (userId: string, postId: string) => {
  const { error } = await supabase.rpc('remove_post_from_saved_posts', { post_id: postId, user_id: userId });
  if (error) {
    console.error(`Failed to remove data from Supabase - ${error.message}`);
  }
};

// 찜 카운트수 가져오기
export const fetchSaveCount = async (postId: string) => {
  const { data, error } = await supabase.from('tradePosts').select('saved').eq('postId', postId);
  if (error) {
    console.error(`Failed to fetch data from Supabase - ${error}`);
  }
  return data![0].saved;
};

// 찜 수 + 1
export const increaseSaveCount = async (postId: string) => {
  const { error } = await supabase.rpc('increment_save_count', { post_id: postId });
  if (error) {
    console.error(`Failed to increase count to Supabase - ${error.message}`);
  }
};

// 찜 수 - 1
export const decreaseSaveCount = async (postId: string) => {
  const { error } = await supabase.rpc('decrement_save_count', { post_id: postId });
  if (error) {
    console.error(`Failed to decrease count to Supabase - ${error.message}`);
  }
};
