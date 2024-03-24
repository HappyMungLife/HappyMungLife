import axios from 'axios';

const URL =
  'https://api.odcloud.kr/api/15111389/v1/uddi:41944402-8249-4e45-9e9d-a52d0a7db1cc?page=1&perPage=10&serviceKey=9L5HwXwc21vzjZElotvS2os724s6JtXyr%2FVsac%2BpQrJ1TV6Vc4IVvN9HxQcWAQH3qMLi9GvMQOLLtzrftdJjcQ%3D%3D';

export const fetchAniPharms = async () => {
  // 페이지네이션 어케하지 ㅠ 데이터..일단 다 가져오나보자..
  const { data } = await axios.get(URL);
  const placeInfos: [] = data.data;
  const aniPharms = placeInfos.filter((placeInfo: any) => placeInfo['카테고리3'] == '동물약국'); // map 처럼 안에 () => {} 중괄호 쓰면안됨 .

  //   console.log(placeInfos[0]);
  //   console.log(da);
  return aniPharms;
};
