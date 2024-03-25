'use client';

import React, { useEffect, useState } from 'react';
import { fetchMealList } from '../_api/placeInfo-api';

const MealListPage = () => {
  const [totalList, setTotalList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetchMealList();
      setTotalList(data);
      setFilteredList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 수
  const totalNum = filteredList.length; // 총 데이터 수
  const pageRange = 10;
  const btnRange = 5;
  const currentSet = Math.ceil(currentPage / btnRange);
  const startPage = (currentSet - 1) * btnRange + 1;
  const endPage = Math.min(startPage + btnRange - 1, Math.ceil(totalNum / pageRange));

  const totalSet = Math.ceil(Math.ceil(totalNum / pageRange) / btnRange); // 전체 버튼 세트 수

  const indexOfLastItem = currentPage * pageRange;
  const indexOfFirstItem = indexOfLastItem - pageRange;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

  const regionMap: { [key: string]: string } = {
    서울: '서울특별시',
    경기: '경기도',
    인천: '인천광역시',
    강원: '강원도',
    세종: '세종특별자치시',
    대전: '대전광역시',
    대구: '대구광역시',
    울산: '울산광역시',
    부산: '부산광역시',
    광주: '광주광역시',
    충북: '충청북도',
    충남: '충청남도',
    경북: '경상북도',
    경남: '경상남도',
    전북: '전라북도',
    전남: '전라남도',
    제주: '제주특별자치도'
  };

  const regions = Object.keys(regionMap);

  const handleFilterRegionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selected = e.currentTarget.textContent;
    const selectedRegion = selected === '전체' ? '' : regionMap[selected || ''];

    if (selected === '전체') {
      setFilteredList(totalList);
    }

    if (selectedRegion) {
      setFilteredList(totalList.filter((item) => item['시도 명칭'] === selectedRegion));
    }
    setCurrentPage(1); // 필터가 변경되면 페이지를 다시 1로 설정
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredList.length / pageRange); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <button key={number} onClick={() => setCurrentPage(number)}>
      {number}
    </button>
  ));

  if (!totalList || totalList.length === 0) {
    <div>데이터를 가져오지 못했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <section className="flex items-center justify-center text-sm">
      <div className="flex flex-col items-center bg-primaryColor/10 w-[1280px] min-h-[500px] ">
        <nav className="flex justify-center w-[1200px] mt-16 mb-5 rounded-lg p-2">
          <ul className="flex gap-5 items-center justify-center px-1">
            <li className="w-10">
              <button onClick={(e) => handleFilterRegionClick(e)}>전체</button>
            </li>
            {regions.map((region) => {
              return (
                <li className="w-10">
                  <button onClick={(e) => handleFilterRegionClick(e)}>{region}</button>
                </li>
              );
            })}
          </ul>
        </nav>
        <hr className="bg-gray-300/70 w-[1150px]" />
        <section className="m-20 flex-wrap flex justify-center items-center gap-5">
          {currentItems?.map((item, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-col gap-1 justify-center items-start border-[1px] border-gray-300 rounded-lg p-5 w-[500px]"
              >
                <p>{item['카테고리3']}</p>
                <p className="font-bold text-lg">{item['시설명']}</p>
                <p>전화번호 : {item['전화번호']}</p>
                <p>운영시간 : {item['운영시간']}</p>
                <p>주소 : {item['도로명주소']}</p>
                <p>휴무일 : {item['휴무일']}</p>
                <p>홈페이지 : {item['홈페이지']}</p>
              </div>
            );
          })}
        </section>
        <section className="flex justify-center my-[30px] px-20 w-full">
          <nav className="flex gap-5">
            {currentSet > 1 && <button onClick={() => setCurrentPage(startPage - 1)}>&lt;</button>}
            {Array(btnRange)
              .fill(startPage)
              .map((_, i) => {
                return (
                  <button key={i} onClick={() => setCurrentPage(startPage + i)} className="text-[16px] font-bold">
                    {startPage + i}
                  </button>
                );
              })}
            {totalSet > currentSet && <button onClick={() => setCurrentPage(endPage + 1)}>&gt;</button>}
          </nav>
        </section>
      </div>
    </section>
  );
};

export default MealListPage;
