import CommunityEditForm from '@/app/_components/communityPageComponents/CommunityEditForm';
import { createClientJs } from '@/app/_utils/supabase/createClientJs';
import React from 'react';

export const revalidate = 0

const EditPage = async ({ params }: { params: { id: string } }) => {
  const postId = params.id;
  const supabase = createClientJs();

  const fetchPost = async () => {
    try {
      const { data: posts, error } = await supabase.from('communityPosts').select('*').eq('postId', postId);
      if (error) throw error;
      console.log(posts);
      return posts![0];
    } catch (error) {
      console.error();
      throw error;
    }
  };

  const posts = await fetchPost();
  const { title, content } = posts;

  return (
    <div className="flex flex-col items-center justify-center m-5 bg-primaryColor/10 border border-black">
      <h1 className="">커뮤니티 글쓰기</h1>
      <CommunityEditForm postId={postId} prevTitle={title} prevContent={content} />
    </div>
  );
};

export default EditPage;
