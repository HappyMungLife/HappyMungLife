import { Database, communityPosts } from '@/app/_types/communityPosts.types';
import { formatToLocaleDateTimeString } from '@/app/_utils/date';
import { createClientJs } from '@/app/_utils/supabase/clientJs';
import ScrapButton from '@/app/_components/detailPageComponents/ScrapButton';
import LikeButton from '@/app/_components/detailPageComponents/LikeButton';
import NotFoundPage from '@/app/not-found';
import PostEditDeleteButton from '@/app/_components/detailPageComponents/PostEditDeleteButton';
import CommentList from '@/app/_components/detailPageComponents/CommentList';

export const revalidate = 0; // SSR

// TODO userId 여기서 받아와서 scrapbutton 등 props 로 넘겨주기!
const CommunityDetailPage = async ({ params }: { params: { id: string } }) => {
  const postId = params.id;
  const supabase = createClientJs();

  const fetchPost = async () => {
    // : Promise<communityPosts> 타입 외래키 comment 까지 다시 생성해야
    try {
      // 나중에 따로 분리하기
      const { data: posts, error } = await supabase
        .from('communityPosts')
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
  // * 이미지 우선 한 장으로 할 지?
  // imageUrl : [' ..' , '.. '] - 이미지 아예 없는 경우 (빈배열) / 1장, 2장? 처리하기
  const postedDate = formatToLocaleDateTimeString(created_at);

  // NOTE 이미지 하나 가져오기
  const firstImgUrl = imageUrl ? imageUrl![0] : ''; // 이미지 없는 경우 처리해주기

  if (!posts) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex justify-center m-5">
      <div className="flex flex-col items-center bg-primaryColor/10 w-[1280px] min-h-[720px] ">
        <div className="flex w-[1200px] mt-10 mb-3 pl-10 rounded-lg p-2">
          <div className="flex w-11/12 items-center px-1 ">
            <p className="w-[100px] text-gray-500">커뮤니티</p>
            <p className="text-lg w-9/12 font-bold ">{title}</p>
            <p className="text-sm">{postedDate}</p>
          </div>
          <div className="flex justify-start items-center gap-5 ml-5 w-[200px]">
            {/* 유저 프로필에서 업로드 한 이미지 가져올 예정  / 기본이미지 : 개 발자국*/}
            <img src={postUser.profileImage} alt="userProfileImg" className="rounded-[50%] w-12 h-12" />
            <p>{postUser.nickname}</p>
          </div>
        </div>
        <hr className="bg-gray-300/70 w-[1150px]" />
        <section className="m-20 w-full">
          <div className="flex justify-center">
            {imageUrl && <img src={firstImgUrl} alt="uploaded-image" className="max-w-[800px]" />}
          </div>
          <div className="my-10 flex justify-center">
            <p className="mx-10 text-md w-[1000px] min-h-[50px] p-10 bg-primaryColor/10 rounded">{content}</p>
          </div>
        </section>
        <section className="flex justify-between mt-[30px] px-20 w-full">
          {/* 해당 유저의 글이면 아래 컴포넌트 뜨도록 (수정,삭제) */}
          <PostEditDeleteButton postId={postId} mode="community" />
          <div className="flex gap-5">
            {/* 로그인 X 상태면 눌렀을 때 로그인 후 이용해주세요 뜨게하기 */}
            <LikeButton postId={postId} userId={userId} />
            <ScrapButton postId={postId} userId={userId} />
          </div>
        </section>
        {/* 유저 로그인 상태, 해당 유저일 시 뜨게함 */}
        <CommentList postId={postId} userId={userId} mode="community" />
      </div>
    </div>
  );
};

export default CommunityDetailPage;
