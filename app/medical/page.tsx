'use client';

import React, { useEffect, useState } from 'react';
import { fetchMedicalList } from '../_api/placeInfo-api';

const Medical = () => {
  const [medicalList, setMedicalList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const medicalList = await fetchMedicalList();
      setMedicalList(medicalList);
    };
    fetchData();
  }, []);

  const [page, setPage] = useState<number>(1); // 현재 페이지 수
  const totalNum = medicalList.length; // 총 게시물 수
  const pageRange = 2; // 페이지당 보여줄 게시물 수 -   바꾸기
  const btnRange = 7; // 보여질 페이지 버튼의 개수
  const currentSet = Math.ceil(page / btnRange); // 현재 페이지 세트
  const startPage = (currentSet - 1) * btnRange + 1; // 시작 페이지 번호
  const endPage = Math.min(startPage + btnRange - 1, Math.ceil(totalNum / pageRange)); // 마지막 페이지 번호

  if (!medicalList || medicalList.length === 0) {
    <div>데이터를 가져오지 못했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <section className="flex items-center justify-center">
      <div className="flex flex-col items-center bg-primaryColor/10 w-[1280px] min-h-[500px] ">
        <nav className="flex justify-center w-[1200px] mt-16 mb-5 rounded-lg p-2">
          <ul className="flex gap-10 items-center justify-center px-1">
            <li>전체</li>
            <li>서울</li>
          </ul>
        </nav>
        <hr className="bg-gray-300/70 w-[1150px]" />
        <section className="m-20 w-full flex flex-col justify-center items-center gap-5">
          {medicalList?.map((medicalItem, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-col gap-2 justify-center items-start border-[1px] border-gray-300 rounded-lg p-5 w-10/12"
              >
                <p>{medicalItem['카테고리3']}</p>
                <p>시설명 : {medicalItem['시설명']}</p>
                <p>전화번호 : {medicalItem['전화번호']}</p>
                <p>운영시간 : {medicalItem['운영시간']}</p>
                <p>주소 : {medicalItem['도로명주소']}</p>
                <p>휴무일 : {medicalItem['휴무일']}</p>
                <p>홈페이지 : {medicalItem['홈페이지']}</p>
              </div>
            );
          })}
        </section>
        <section className="flex justify-between mt-[30px] px-20 w-full">
          <nav className="flex gap-5">
            {currentSet > 1 && <button onClick={() => setPage(startPage - 1)}>&lt;</button>}
            {Array(btnRange)
              .fill(startPage)
              .map((_, i) => {
                return (
                  <button key={i} onClick={() => setPage(startPage + i)}>
                    {/* // $active={page === startPage + i} */}
                    {startPage + i}
                  </button>
                );
              })}
            {totalSet > currentSet && (
              <button onClick={() => setPage(endPage + 1)} $active={false}>
                &gt;
              </button>
            )}
          </nav>
        </section>
      </div>
    </section>
  );
};

export default Medical;
