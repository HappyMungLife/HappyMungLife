import { createClientJs } from '../_utils/supabase/clientJs';

const supabase = createClientJs();

// 커뮤니티 댓글 가져오기
export const fetchCommunityComments = async (postId: string) => {
  const { data: comments, error } = await supabase
    .from('communityComments')
    .select('*, commentUser:users(nickname,profileImage)')
    .eq('postId', postId)
    .order('created_at', { ascending: false });
  if (error) {
    console.error(`Failed to fetch data from Supabase - ${error.message}`);
  }
  return comments;
};

// 중고거래 댓글 가져오기
export const fetchTradeComments = async (postId: string) => {
  const { data: comments, error } = await supabase
    .from('tradeComments')
    .select('*, commentUser:users(nickname,profileImage)')
    .eq('postId', postId)
    .order('created_at', { ascending: false });
  if (error) {
    console.error(`Failed to fetch data from Supabase - ${error.message}`);
  }
  return comments;
};

// 댓글 추가
export const addCommunityComment = async (userId: string, postId: string, content: string) => {
  const { error } = await supabase
    .from('communityComments')
    .insert({ userId: userId, postId: postId, content: content });
  if (error) {
    console.error(`Failed to insert data to Supabase - ${error.message}`);
  }
};

export const addTradeComment = async (userId: string, postId: string, content: string) => {
  const { error } = await supabase.from('tradeComments').insert({ userId: userId, postId: postId, content: content });
  if (error) {
    console.error(`Failed to insert data to Supabase - ${error.message}`);
  }
};

// 댓글 수정
export const updateCommunityComment = async (commentId: string, editedContent: string) => {
  const { error } = await supabase
    .from('communityComments')
    .update({ content: editedContent })
    .eq('commentId', commentId)
    .select();
  if (error) {
    console.error(`Failed to update data to Supabase - ${error.message}`);
  }
};

export const updateTradeComment = async (commentId: string, editedContent: string) => {
  const { error } = await supabase
    .from('tradeComments')
    .update({ content: editedContent })
    .eq('commentId', commentId)
    .select();
  if (error) {
    console.error(`Failed to update data to Supabase - ${error.message}`);
  }
};

// 댓글 삭제
export const removeCommuntiyComment = async (commentId: string) => {
  const { error } = await supabase.from('communityComments').delete().eq('commentId', commentId);
  if (error) {
    console.error(`Failed to delete data from Supabase - ${error.message}`);
  }
};

export const removeTradeComment = async (commentId: string) => {
  const { error } = await supabase.from('tradeComments').delete().eq('commentId', commentId);
  if (error) {
    console.error(`Failed to delete data from Supabase - ${error.message}`);
  }
};
