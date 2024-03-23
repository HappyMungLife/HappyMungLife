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
    if (!imageFiles || imageFiles.length === 0) {
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

    const { data, error } = await supabase
      .from('communityPosts')
      .insert([{ title, content, imageUrl: imageUrls, userId: '1234' }])
      .select();

      if (error) {
        console.error('게시물 추가 중 오류가 발생했습니다:', error.message);
        alert('게시물 추가 중 오류가 발생했습니다.');
      } else {
        alert("게시물이 등록되었습니다.")
      }
  };

  return (
    <form onSubmit={addPostHandler} className="w-full lg:w-2/3 h-full lg:h-80">
      <div className="my-10 flex">
        <label className="text-xl mr-2 w-12 font-medium">제목</label>
        <input
          className="max-h-8 h-8 w-full pl-2 rounded-lg"
          type="text"
          value={title}
          onChange={titleHandler}
          placeholder=" 제목을 입력해 주세요"
        />
      </div>
      <div className='h-4/5' >
        <label></label>
        <textarea
          className="h-full w-full p-2.5 rounded-lg"
          placeholder=" 내용을 입력해 주세요"
          name=""
          id=""
          style={{ resize: 'none' }}
          value={content}
          onChange={contentHandler}
        />
      </div>
      <div>
        <div className='flex items-center mt-8'>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} className="mr-auto bg-white w-auto" />
          <button className="px-4 py-2 bg-primaryColor text-white rounded" onClick={addImageHandler} type="button">
            이미지 업로드
          </button>
        </div>
        <div className="flex flex-wrap mt-8">
          {imageUrls.map((imageUrl, index) => (
            <img key={index} className="w-16 h-auto mr-2" src={imageUrl} alt={`Uploaded ${index}`} />
          ))}
        </div>
      </div>
      <div className="flex justify-center space-x-20 mt-12">
        <button className="text-lg px-4 py-2 bg-primaryColor text-white rounded w-32 h-12">취소</button>
        <button type="submit" className="text-lg px-4 py-2 bg-primaryColor text-white rounded w-32 h-12">
          작성
        </button>
      </div>
    </form>
  );
};

export default CommunityForm;
