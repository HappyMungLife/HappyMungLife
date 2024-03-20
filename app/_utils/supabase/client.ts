'use client';
import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';
// import { createClient } from '@supabase/supabase-js';

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // export const createClient = async () => { ?
  createBrowserClient(supabaseUrl!, supabaseKey!); // !

  // const { error } = await supabase.from('communityPosts').insert({
  //   userId: '00',
  //   nickname: '강쥐',
  //   title: '우리 집 강아지에요~',
  //   content: '귀엽죠?',
  //   imageUrl: '{http://..}'
  // });
  // console.log('🐰 ~ const{error}=awaitsupabase.from ~ error : ', error);
  // const { data, error } = await supabase.from('communityPosts').select('*');
  // console.log('🐰 ~ DDcreateClient ~ error : ', error);
  // console.log('🐰 ~ DDcreateClient ~ data : ', data);
  // return createBrowserClient; // return 해줘야/.?  - 원래거엔 return 없었는데.
};
