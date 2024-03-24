'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updatePostHandler } from '@/app/actions';
import { createClientJs } from '@/app/_utils/supabase/createClientJs';

//TODO : 이미지 수정 기능 추가해야함

type CommunityEditFormProps = {
  postId: string;
  prevTitle: string;
  prevContent: string;
};

const supabase = createClientJs();

export const communityEditForm = ({ postId, prevTitle, prevContent }: CommunityEditFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(prevTitle);
  const [content, setContent] = useState(prevContent);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const titleHandler = (e: any) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e: any) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e: any) => {
    const files = e.target.files;

    if (files.length > 3) {
      alert('이미지는 최대 3개까지 첨부할 수 있습니다.');
      e.target.value = null;
      return;
    }

    setImageFiles([...files]);
  };

  const addImageHandler = async () => {
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

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await updatePostHandler(postId, title, content);
        alert('수정이 완료되었습니다.');
      }}
      className="m-5 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 h-full md:h-96 lg:h-80 xl:h-64"
    >
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

export default communityEditForm;
