// 'use client';
import { createClient } from '@/utils/supabase/server';
import { createBrowserClient } from '@supabase/ssr';
// import { createClient } from '@/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
// import { createClient } from '@/utils/supabase/client';
// import { createClient } from '@/utils/supabase/server';
// import { DDcreateClient } from '@/utils/supabase/client';
// import { createClient } from '@supabase/supabase-js';
import React from 'react';

const CommunityDetailPage = async () => {
  // useParam?  - postId
  // const supabase =
  //   createClient();
  // process.env.NEXT_PUBLIC_SUPABASE_URL!,
  // process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  // createClient(); // client 컴포넌트에서느 ㄴlcient 걸로 import 해야되는듯 - 그러니까 작동안하는?
  // const supabase = createBrowserClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  // ); // 이렇게 하니까 from 에러는 없이 된다!

  const supabase = createClient(); // 여기에 데이터베이스 타입 < >

  const { data: posts, error } = await supabase.from('communityPosts').select('*'); // postId 해당하는
  console.log('🐰 ~ t ~ error : ', error);
  console.log('🐰 ~ t ~ data : ', posts[0].userId);
  if (error) {
    console.log(error);
  }

  // 타입 넣기 ! e

  return (
    <div className="m-20">
      <div className="flex">
        <div className="flex gap-10">
          <p>{JSON.stringify(data, null, 1)}</p>
          <p>{data[0].userId}</p>
          <p>작성일</p>
        </div>
        <div>
          <image src=".." alt="유저프로필이미지" />
          <p>닉네임</p>
        </div>
      </div>
      <section className="mt-10">
        <image src="http://" alt="업로드한이미지" />
        <p>내용 ....</p>
      </section>
      <section className="mt-10">
        <p>댓글 10</p>
        <hr />
        <div>
          <textarea></textarea>
          <button>등록</button>
        </div>
        <div className="mt-20">
          <div className="flex gap-10">
            <image alt="유저프로필이미지" />
            <p>닉네임</p>
            <p>날짜</p>
          </div>
          <p>내용</p>
        </div>
      </section>
    </div>
  );
};

export default CommunityDetailPage;
