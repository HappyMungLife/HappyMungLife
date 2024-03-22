import { formatToLocaleDateTimeString } from '@/app/_utils/date';
import EditDeleteButton from '@/app/_components/detailPageComponents/EditDeleteButton';
import { createClientJs } from '@/app/_utils/supabase/clientJs';
import NotFoundPage from '@/app/not-found';

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
      console.error();
      throw error;
    }
  };

  const userId = 'gpfus'; // 임시 설정 테스트

  const posts = await fetchPost();
  const { title, content, imageUrl, created_at, saved, postUser } = posts ? posts : '';
  const postedDate = formatToLocaleDateTimeString(created_at);

  // NOTE 이미지 하나 가져오기 / 이미지 없는 경우 글만 뜨게하기 - 완료
  const firstImgUrl = imageUrl ? imageUrl![0] : '';

  if (!posts) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex justify-center m-5">
      <div className="flex flex-col items-center bg-primaryColor/10 w-[1280px] min-h-[720px] ">
        <div className="flex w-[1200px] mt-10 mb-3 pl-10  rounded-lg p-2">
          <div className="flex w-10/12 items-center px-1 ">
            <p className="w-[100px] text-gray-500">중고거래</p>
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
            {imageUrl && <img src={firstImgUrl} alt="업로드한이미지" width={400} />}
          </div>
          <div className="my-10 flex justify-center">
            <p className="mx-10 text-md w-[1000px] min-h-[50px] p-10 bg-primaryColor/10 rounded">{content}</p>
          </div>
        </section>
        <section className="flex justify-between mt-[30px] px-20 w-full">
          {/* 해당 유저의 글이면 아래 컴포넌트 뜨도록 (수정,삭제) */}
          <EditDeleteButton postId={postId} />
          <div className="flex gap-5"></div>
        </section>
        <section className="mt-20 px-10 w-full">
          <p>댓글 10</p>
          <hr className="bg-gray-400 w-full" />
          <div>{/* 유저 로그인 상태, 해당 유저일 시 뜨게함 */}</div>
          <div className="mt-10 flex flex-col justify-center items-center">
            <div className="flex flex-col gap-5">
              <textarea className="w-[1000px] h-[100px] border-2 border-gray-300 rounded-xl"></textarea>
              <div className="flex justify-end">
                <button className="border-2 border-gray-300 rounded p-2 w-20">등록</button>
              </div>
            </div>
            <div className="m-10">
              <div className="flex gap-5 mt-10 justify-between items-center w-[1000px]">
                <div className="flex items-center gap-5 px-3">
                  <img
                    src="https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg"
                    alt="userProfileImg"
                    className="rounded-[50%] w-12 h-12"
                  />
                  <p>닉네임</p>
                </div>
                <p className="px-3">날짜</p>
              </div>
              <div className="mt-3 bg-primaryColor/30 rounded p-5 min-h-[100px]">
                <p>내용</p>
              </div>
              <div className="flex justify-end gap-10 m-5">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TradeDetailPage;
