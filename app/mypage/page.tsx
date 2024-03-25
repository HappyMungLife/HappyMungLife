'use client';

import React from 'react';
import { createClientJs } from '../_utils/supabase/clientJs';

const MyPage = () => {
  const supabase = createClientJs();

  const userUid = 'cf9237c2-53f6-4142-a8e3-efc696084b86';

  const fetchUserInfo = async () => {
    try {
      // 나중에 따로 분리하기
      const { data: userInfo, error } = await supabase.from('users').select('*').eq('userUId', userUid);
      if (error) throw error;
      return userInfo![0];
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex items-center justify-center text-sm">
      <div className="flex flex-col items-center bg-primaryColor/10 w-[1280px] min-h-[500px] ">
        <hr className="bg-gray-300/70 w-[1150px]" />
        <section className="m-20 flex flex-wrap justify-center items-center gap-5"></section>
        <section className="flex justify-center my-[30px] px-20 w-full"></section>
      </div>
    </section>
  );
};

export default MyPage;
