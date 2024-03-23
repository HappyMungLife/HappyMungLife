import CommunityForm from '@/app/_components/communityPageComponents/CommunityForm';
import { createClientJs } from '@/app/_utils/supabase/createClientJs';

export const CommunityPostPage = () => {
  const supabase = createClientJs();

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center bg-primaryColor/10 w-[1280px] min-h-[720px]">
        <h1 className="text-4xl mt-12 mb-4 w-8/12">커뮤니티 글쓰기</h1>
        <div className='border-blue-100 border w-8/12'></div>
        <CommunityForm />
      </div>
    </div>
  );
};

export default CommunityPostPage;
