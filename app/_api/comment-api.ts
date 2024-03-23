import { createClientJs } from '../_utils/supabase/clientJs';

const supabase = createClientJs();

// 커뮤니티 댓글 수정 -  새로 다시 업뎃. 그 칼럼 만 넣으면
export const updateComment = async (commentId: string, content: string) => {
  const { error } = await supabase.from('communityComments').update({ content }).eq('commentId', commentId).select();
  if (error) {
    console.error(`Failed to update data to Supabase - ${error.message}`);
  }
};
// 커뮤니티 댓글 삭제
export const removeComment = async (commentId: string) => {
  const { error } = await supabase.from('communityComments').delete().eq('commentId', commentId);
  if (error) {
    console.error(`Failed to delete data from Supabase - ${error.message}`);
  }
};
