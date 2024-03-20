// 'use client';

// SSR?  CSR? - DB데이터변할수. SSR
import { Database, communityPosts } from '@/app/_types/communityPosts.types';
import { createClient } from '@/app/_utils/supabase/server';

// 댓글은 따로 communityComments 로 테이블만들어서 foreign key 로 이 테이블과 연결해야할거같음

export const revalidate = 0; // SSR

// not-found 페이지 필요
const CommunityDetailPage = async ({ params }: { params: { id: string } }) => {
  const postId = params.id;
  const supabase = createClient();

  const fetchPost = async (): Promise<communityPosts> => {
    try {
      const { data: posts, error } = await supabase.from('communityPosts').select(`*`).eq('postId', postId);
      if (error) throw error;
      return posts![0];
    } catch (error) {
      console.error();
      throw error;
    }
  };

  const posts = await fetchPost();
  const { nickname, title, content, imageUrl, created_at, liked } = posts;
  // * 이미지 우선 한 장으로 할 지?
  // imageUrl : [' ..' , '.. '] - 이미지 아예 없는 경우 (빈배열) / 1장, 2장? 처리하기
  const firstImgUrl = imageUrl![0];

  if (!posts) {
    // posts 없어도 안뜸  - 에러 처리 수정하기
    return <div>없는 페이지입니다.</div>;
  }

  return (
    <div className="flex justify-center m-5">
      <div className="flex flex-col items-center bg-primaryColor/10 w-[1280px] min-h-[720px] px-5">
        <div className="flex w-[1100px] my-10 pl-10 bg-orange-200/10 rounded-lg">
          <div className="flex gap-10 w-10/12 items-center px-1 ">
            <p className="text-lg w-10/12 font-bold ">{title}</p>
            <p>{created_at}</p>
            {/* 날짜 변경예정 _utils 통해 */}
          </div>
          <div className="flex justify-center items-center gap-5 p-2  w-[200px]">
            {/* 유저 프로필에서 업로드 한 이미지 가져올 예정  / 기본이미지 : 개 발자국*/}
            <img
              src="https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg"
              alt="userProfileImg"
              className="rounded-[50%] w-12 h-12" // ratio-square  ratio-w-.. 등 다 안먹히고 w-, h- 로 가세비율1:1 맞춤
            />
            {/*(TODO) 유저닉네임 등 누르면 -> 유저 프로필 자기소개/(쓴글) 페이지로 이동? (마이페이지 외 별도로 만들어야..) */}
            <p>{nickname}</p>
          </div>
        </div>
        <section className="px-20 w-full">
          {/* 게시글에 업로드 한 이미지 가져올 예정 */}
          <div className="flex justify-center">
            <img
              src="https://mblogthumb-phinf.pstatic.net/MjAyMjAyMDdfMjEy/MDAxNjQ0MTk0Mzk2MzY3.WAeeVCu2V3vqEz_98aWMOjK2RUKI_yHYbuZxrokf-0Ug.sV3LNWlROCJTkeS14PMu2UBl5zTkwK70aKX8B1w2oKQg.JPEG.41minit/1643900851960.jpg?type=w800"
              alt="업로드한이미지"
              width={400}
            />
          </div>
          <div className="my-10 flex justify-center">
            <p className="mx-10 text-md w-[1000px] min-h-[50px] p-10 bg-primaryColor/10 rounded">{content}</p>
          </div>
        </section>
        <section className="flex justify-between mt-[100px] px-20 w-full">
          {/*  bg-fuchsia-300 */}
          <div className="flex gap-5">
            <button className=" border-2 border-gray-300 rounded p-2">수정</button>
            <button className=" border-2 border-gray-300 rounded p-2">삭제</button>
          </div>
          <div className="flex gap-5">
            {/* 아이콘,이미지로 대체 예정 */}
            <button className="text-lg border-2 border-gray-300 rounded p-2">👍 {liked}</button>
            <button className="text-lg border-2 border-gray-300 rounded p-2">🔖</button>
          </div>
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

export default CommunityDetailPage;
