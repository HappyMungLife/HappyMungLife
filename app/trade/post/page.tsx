import TradeForm from '@/app/_components/tradePageComponents/TradeForm';
import { createClientJs } from '@/app/_utils/supabase/createClientJs';

export const revalidate = 0;

export const CommunityPostPage = () => {
  const supabase = createClientJs();

  return (
    <div className="flex justify-center m-5">
      <div className="flex flex-col items-center bg-primaryColor/10 w-[1280px] min-h-[930px]">
        <h1 className="text-3xl font-semibold mt-12 mb-4 w-8/12">해피멍터 글쓰기</h1>
        <div className="border-gray-300 border-b w-8/12"></div>
        <TradeForm />
      </div>
    </div>
  );
};

export default CommunityPostPage;
