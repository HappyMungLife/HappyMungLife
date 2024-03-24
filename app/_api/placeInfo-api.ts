import axios from 'axios';

// .env.local에 넣기
const URL =
  'https://api.odcloud.kr/api/15111389/v1/uddi:41944402-8249-4e45-9e9d-a52d0a7db1cc?page=1&perPage=30&serviceKey=9L5HwXwc21vzjZElotvS2os724s6JtXyr%2FVsac%2BpQrJ1TV6Vc4IVvN9HxQcWAQH3qMLi9GvMQOLLtzrftdJjcQ%3D%3D';

// 모든 의료기관 정보
export const fetchMedicalList = async () => {
  const { data } = await axios.get(URL);
  const placeInfos: [] = data.data;
  const medicalList = placeInfos.filter((placeInfo: any) => placeInfo['카테고리2'] == '반려의료'); // 전체 10개면 7개/ 100개면 88개는 반려의료
  // console.log(medicalList.length);
  return medicalList;
};

// 모든 약국 정보
export const fetchPharmacysList = async () => {
  const { data } = await axios.get(URL);
  const placeInfos: [] = data.data;
  const pharmacysList = placeInfos.filter((placeInfo: any) => placeInfo['카테고리3'] == '동물약국');
  return pharmacysList;
};

// 모든 병원 정보
export const fetchHospitalsList = async () => {
  const { data } = await axios.get(URL);
  const placeInfos: [] = data.data;
  const hospitalsList = placeInfos.filter((placeInfo: any) => placeInfo['카테고리3'] == '동물병원'); // 많이 안뜸 10개당 1개
  return hospitalsList;
};
