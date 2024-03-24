'use server';

import { redirect } from 'next/navigation';
import { createClient } from './_utils/supabase/server';

export const updatePostHandler = async (postId: string, title: string, content: string, imageUrl:string[] ) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('communityPosts')
    .update({ title, content, imageUrl })
    .eq('postId', postId)
    .select();

  if (data && !error) {
    redirect(`/community/detail/${postId}`);
  }
};

