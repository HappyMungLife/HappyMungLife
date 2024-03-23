'use client';

import { createClientJs } from '@/app/_utils/supabase/createClientJs';
import { useState } from 'react';

export const CommunityForm = () => {
  const supabase = createClientJs();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const titleHandler = (e: any) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e: any) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e: any) => {
    setImageFiles([...e.target.files]);
  };

  const addImageHandler = async (e: any) => {
    if (!imageFiles) {
      alert('이미지를 첨부해 주세요.');
      return;
    }

    const bucket = 'community-image-bucket';

    const publicImageUrls = await Promise.all(
      imageFiles.map(async (imageFile) => {
        const fileName = crypto.randomUUID();

        const { error } = await supabase.storage.from(bucket).upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false
        });
        if (error) {
          console.error('이미지 업로드 중 오류가 발생했습니다:', error.message);
        } else {
          console.log('이미지가 성공적으로 업로드되었습니다.');
        }
        return getImageUrl(bucket, fileName);
      })
    );
    setImageUrls(publicImageUrls);
  };

  const getImageUrl = (bucket: string, fileName: string) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const addPostHandler = async (e: any) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }
    if (!imageUrls) {
      alert('이미지를 첨부해주세요.');
      return;
    }

    // TODO : 에러 처리 로직 + 유효성 검사 로직 필요
    const { data, error } = await supabase
      .from('communityPosts')
      .insert([{ title, content, imageUrl: imageUrls, userId: '1234' }])
      .select();
  };

  return (
    <form onSubmit={addPostHandler} className="m-5 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 h-full md:h-96 lg:h-80 xl:h-64">
      <div className="my-10">
        <label className="text-2xl mr-5">제목</label>
        <input
          className="max-h-8 h-8 max-w-2xl w-full"
          type="text"
          value={title}
          onChange={titleHandler}
          placeholder="제목"
        />
      </div>
      <div>
        <label></label>
        <textarea
          placeholder="내용"
          name=""
          id=""
          style={{ resize: 'none' }}
          value={content}
          onChange={contentHandler}
          className="h-full w-full"
        />
      </div>
      <div>
        <div className='flex items-center mt-8'>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} className="mr-auto" />
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={addImageHandler} type="button">
            이미지 업로드
          </button>
        </div>
        <div className="flex flex-wrap mt-8">
          {imageUrls.map((imageUrl, index) => (
            <img key={index} className="w-36 h-auto mr-2" src={imageUrl} alt={`Uploaded ${index}`} />
          ))}
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-12">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">취소</button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          작성
        </button>
      </div>
    </form>
  );
};

export default CommunityForm;
