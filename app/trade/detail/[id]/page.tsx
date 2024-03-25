import { formatToLocaleDateTimeString } from '@/app/_utils/date';
import { createClientJs } from '@/app/_utils/supabase/clientJs';
import NotFoundPage from '@/app/not-found';
import SaveButton from '@/app/_components/detailPageComponents/SaveButton';
import PostEditDeleteButton from '@/app/_components/detailPageComponents/PostEditDeleteButton';
import CommentList from '@/app/_components/detailPageComponents/CommentList';

export const revalidate = 0; // SSR

const TradeDetailPage = async ({ params }: { params: { id: string } }) => {
  const postId = params.id;
  const supabase = createClientJs();

  const fetchPost = async () => {
    try {
      const { data: posts, error } = await supabase
        .from('tradePosts')
        .select('*, postUser:users(nickname,profileImage)')
        .eq('postId', postId);
      if (error) throw error;
      return posts![0];
    } catch (error) {
      console.error(error);
    }
  };

  const userId = 'gpfus'; // 임시 설정 테스트

  const posts = await fetchPost();
  const { title, content, imageUrl, created_at, postUser } = posts ? posts : '';
  const postedDate = formatToLocaleDateTimeString(created_at);

  if (!posts) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex justify-center m-5">
      <div className="flex flex-col items-center bg-primaryColor/10 w-[1280px] min-h-[720px] ">
        <div className="flex w-[1200px] mt-10 mb-3 pl-10 rounded-lg p-2">
          <div className="flex w-11/12 items-center px-1 ">
            <p className="w-[100px] text-gray-500">중고거래</p>
            <p className="text-lg w-9/12 font-bold">{title}</p>
            <p className="text-sm">{postedDate}</p>
          </div>
          <div className="flex justify-start items-center gap-5 ml-5 w-[200px]">
            <img src={postUser.profileImage} alt="userProfileImg" className="rounded-[50%] w-12 h-12" />
            <p>{postUser.nickname}</p>
          </div>
        </div>
        <hr className="bg-gray-300/70 w-[1150px]" />
        <section className="m-20 w-full">
          <div className="flex flex-col gap-10 justify-center items-center ">
            {imageUrl?.map((url: string) => {
              return <img src={url} alt="uploaded-image" className="max-w-[650px]" />;
            })}
          </div>
          <div className="my-10 flex justify-center">
            <p style={{whiteSpace: 'pre-line'}} className="mx-10 text-md w-[1000px] min-h-[50px] p-10 bg-primaryColor/10 rounded">{content}</p>
          </div>
        </section>
        <section className="flex justify-between mt-[30px] px-20 w-full">
          <PostEditDeleteButton postId={postId} />
          <div className="flex">
            <SaveButton userId={userId} postId={postId} />
          </div>
        </section>
        <CommentList postId={postId} userId={userId} mode="trade" />
      </div>
    </div>
  );
};

export default TradeDetailPage;
