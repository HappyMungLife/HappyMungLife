// 'use client';

// SSR?  CSR? - DB데이터변할수. SSR
import { Database, communityPosts } from '@/app/_types/communityPosts.types';
import { createClient } from '@/app/_utils/supabase/server';
// import React from 'react';

// 댓글도 supabase 저장? - 좋아요까진 같이 저장했는데
// 댓글은 많아질 수 있어서, 따로 communityComments 로 테이블만들어서 foreign key 로 이 테이블과 연결해야할거같음.

export const revalidate = 0; // SSR

// not-found 페이지 필요
const CommunityDetailPage = async ({ params }: { params: { id: string } }) => {
  // 페이지단위 컴포넌트는 route에 특화된 ui라, page의 props로 params 등 받아올 수 있다
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
  // console.log('🐰 ~ CommunityDetailPage ~ imageUrl : ', imageUrl); // imageUrl : [' ..' , '.. '] - 이미지 아예 없는 경우 (빈배열) / 1장, 2장? 처리하기
  const firstImgUrl = imageUrl![0];
  console.log('🐰 ~ CommunityDetailPage ~ firstImgUrl : ', firstImgUrl);

  // 원래는 이미지 첨부 => (이미지주소도 가능하게할까?)

  if (!posts) {
    // posts 없어도 안뜸  - 에러 처리 수정하기
    return <div>없는 페이지입니다.</div>;
  }

  return (
    <div className="flex justify-center m-5">
      <div className="flex flex-col items-center bg-primaryColor/10 w-[1280px] min-h-[720px] px-5">
        <div className="flex w-full m-10 bg-pink-100">
          <div className="flex gap-10 bg-gray-100 w-4/5 items-center px-5">
            <p className="w-4/5">{title}</p>
            <p>{created_at}</p>
            {/* 날짜 변경예정 _utils 통해 */}
          </div>
          <div className="flex items-center p-2">
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
          {/*  bg-slate-400 */}
          {/* 게시글에 업로드 한 이미지 가져올 예정 */}
          <div className="flex justify-center">
            <img
              src="https://mblogthumb-phinf.pstatic.net/MjAyMjAyMDdfMjEy/MDAxNjQ0MTk0Mzk2MzY3.WAeeVCu2V3vqEz_98aWMOjK2RUKI_yHYbuZxrokf-0Ug.sV3LNWlROCJTkeS14PMu2UBl5zTkwK70aKX8B1w2oKQg.JPEG.41minit/1643900851960.jpg?type=w800"
              alt="업로드한이미지"
              width={500}
            />
          </div>
          <div className="my-20">
            <p>{content}</p>
          </div>
        </section>
        <section className="flex justify-between mt-[100px] px-20 w-full">
          {/*  bg-fuchsia-300 */}
          <div className="flex gap-5">
            <button className="text-lg border-2 border-gray-300 rounded p-2">수정</button>
            <button className="text-lg border-2 border-gray-300 rounded p-2">삭제</button>
          </div>
          <div className="flex gap-5">
            {/* 아이콘,이미지로 대체 예정 */}
            <button className="text-2xl border-2 border-gray-300 rounded p-2">👍 {liked}</button>
            <button className="text-2xl border-2 border-gray-300 rounded p-2">🔖</button>
          </div>
        </section>
        <section className="mt-20 px-10 w-full">
          <p>댓글 10</p>
          <hr className="bg-gray-400 w-full" />
          <div>
            {/* 유저 로그인 상태, 해당 유저일 시 뜨게함 */}
            {/* <button>수정</button>
            <button>삭제</button> */}
          </div>
          <div className="mt-10 flex flex-col justify-center items-center">
            <div className="flex flex-col gap-5">
              <textarea className="w-[1000px] h-[100px]"></textarea>
              <div className="flex justify-end">
                <button className="text-lg border-2 border-gray-300 rounded p-2 w-20">등록</button>
              </div>
            </div>
            <div className="m-10">
              <div className="flex gap-5 mt-10 justify-between items-center w-[1000px]">
                <div className="flex items-center gap-5">
                  <img
                    src="https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg"
                    alt="userProfileImg"
                    className="rounded-[50%] w-12 h-12"
                  />
                  <p>닉네임</p>
                </div>
                <p>날짜</p>
              </div>
              <div className="mt-3 bg-primaryColor/30 rounded p-5 min-h-[100px]">
                <p>내용dfsdfsdfsdfsdfsdfsdㅁ라믜라믱라ㅡ미아릐마ㅡ리마ㅡ니라ㅢ</p>
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
