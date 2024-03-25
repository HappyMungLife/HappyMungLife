'use client';

import { createClientJs } from '@/app/_utils/supabase/createClientJs';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export const TradeForm = () => {
  const supabase = createClientJs();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('- 거래 희망 지역 : \n' + '- 가격 : \n' + '- 연락처 : 010-\n' + '- 내용 : ');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

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

    setIsLoading(true);

    const bucket = 'trade-image-bucket';

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
    setIsLoading(false);
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
    if (!imageUrls || imageUrls.length === 0) {
      alert('이미지를 최소 1개 첨부해 주세요.');
      return;
    }

    const { data, error } = await supabase
      .from('tradePosts')
      .insert([{ title, content, imageUrl: imageUrls, userId: 'riri@r.com' }])
      .select('*');

    if (data) {
      const postId = data[0].postId;
      router.push(`/trade/detail/${postId}`);
    } else {
      console.log('데이터가 없습니다.');
    }

    if (error) {
      console.error('게시물 추가 중 오류가 발생했습니다:', error.message);
      alert('게시물 추가 중 오류가 발생했습니다.');
    } else {
      alert('게시물이 등록되었습니다.');
    }
  };

  return (
    <form onSubmit={addPostHandler} className="w-full lg:w-2/3 h-full lg:h-80">
      <div className="my-10 flex">
        <label className="text-xl mr-2 w-12 font-medium">제목</label>
        <input
          ref={titleRef}
          className="max-h-8 h-8 w-full pl-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 "
          type="text"
          value={title}
          onChange={titleHandler}
          placeholder=" 제목을 입력해 주세요."
        />
      </div>
      <div className="h-[300px]">
        <textarea
          className="h-full w-full p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
          placeholder=" 내용을 입력해 주세요."
          name=""
          id=""
          style={{ resize: 'none' }}
          value={content}
          onChange={contentHandler}
        />
      </div>
      <div>
        <div className="flex items-center mt-8">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mr-auto file-input file-input-bordered file-input-sm w-full max-w-xs"
          />
          <button
            className="px-4 py-2 bg-primaryColor font-semibold text-white rounded"
            onClick={addImageHandler}
            type="button"
          >
            이미지 업로드
          </button>
        </div>
        <h1 className="font-semibold mt-6 mb-2 text-lg">이미지 미리보기</h1>
        <div className="flex flex-wrap max-h-28 h-24">
          {imageUrls.map((imageUrl, index) => (
            <img key={index} className="w-32 h-32 object-cover mr-2" src={imageUrl} alt={`Uploaded ${index}`} />
          ))}
          <h1 className="flex items-center ml-2 font-semibold">{isLoading && <p> 🐾 이미지 업로드 중...</p>}</h1>
        </div>
      </div>
      <div className="flex justify-center space-x-20 mt-24">
        <button className="text-lg px-4 py-2 bg-primaryColor font-semibold text-white rounded w-32 h-12">취소</button>
        <button type="submit" className="text-lg px-4 py-2 bg-primaryColor font-semibold text-white rounded w-32 h-12">
          작성
        </button>
      </div>
    </form>
  );
};

export default TradeForm;
