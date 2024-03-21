'use client';

import { createClientJs } from '@/app/_utils/supabase/createClientJs';
import { useState } from 'react';

export const CommunityForm = () => {
  const supabase = createClientJs();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const titleHandler = (e: any) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e: any) => {
    setContent(e.target.value);
  };

  const addPostHandler = async (e: any) => {
    e.preventDefault();
    console.log('title', title);
    console.log('content', content);

    const { data, error } = await supabase
      .from('communityPosts')
      .insert([{ title, content, userId : "12341" }])
      .select();
  };

  return (
    <form onSubmit={addPostHandler} className="m-5 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 h-full md:h-96 lg:h-80 xl:h-64">
      <div>
        <label>제목</label>
        <input type="text" value={title} onChange={titleHandler} placeholder='제목'/>
      </div>
      <div>
        <label>내용</label>
        <textarea
          placeholder='내용'
          name=""
          id=""
          style={{ resize: 'none' }}
          value={content}
          onChange={contentHandler}
          className="h-full w-full"
        />
      </div>
      <div className="flex justify-center space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">취소</button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          작성
        </button>
      </div>
    </form>
  );
};

export default CommunityForm;
