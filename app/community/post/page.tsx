import CommunityForm from "@/app/_components/communityPageComponents/CommunityForm";
import { createClientJs } from "@/app/_utils/supabase/createClientJs";

export const CommunityPostPage = () => {
  const supabase = createClientJs();



  return (
  <div className="flex flex-col items-center justify-center m-5 bg-primaryColor/10 border border-black">
    <h1 className="">커뮤니티 글쓰기</h1>
    <CommunityForm />
  </div>
  );
};

export default CommunityPostPage;
