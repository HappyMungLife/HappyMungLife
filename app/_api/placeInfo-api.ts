import axios from 'axios';

// .env.local에 넣기
const URL =
  'https://api.odcloud.kr/api/15111389/v1/uddi:41944402-8249-4e45-9e9d-a52d0a7db1cc?page=1&perPage=10&serviceKey=9L5HwXwc21vzjZElotvS2os724s6JtXyr%2FVsac%2BpQrJ1TV6Vc4IVvN9HxQcWAQH3qMLi9GvMQOLLtzrftdJjcQ%3D%3D';

export const fetchPharmsList = async () => {
  const { data } = await axios.get(URL);
  const placeInfos: [] = data.data;
  const pharmsList = placeInfos.filter((placeInfo: any) => placeInfo['카테고리3'] == '동물약국');
  return pharmsList;
};

export const fetchMedicalList = async () => {
  const { data } = await axios.get(URL);
  const placeInfos: [] = data.data;
  const medicalList = placeInfos.filter((placeInfo: any) => placeInfo['카테고리2'] == '반려의료'); // 전체 10개면 7개/ 100개면 88개는 반려의료
  // console.log(medicalList.length);
  return medicalList;
};
