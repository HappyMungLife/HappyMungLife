'use server';

import { redirect } from 'next/navigation';
import { createClient } from './_utils/supabase/server';

export const updatePostHandler = async (postId: string, title: string, content: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('communityPosts')
    .update({ title, content })
    .eq('postId', postId)
    .select();

  if (data && !error) {
    // router.push(`/community/detail/${postId}`);
    redirect(`/community/detail/${postId}`);
  }
  // if (error) throw error;
};
