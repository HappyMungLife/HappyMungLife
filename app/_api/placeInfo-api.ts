import axios from 'axios';

// .env.local에 넣기 perPage=20
const URL = `https://api.odcloud.kr/api/15111389/v1/uddi:41944402-8249-4e45-9e9d-a52d0a7db1cc?page=1&perPage=2000&serviceKey=${process.env.NEXT_PUBLIC_GOVERNDATA_KEY}`;

// 모든 식당카페 정보
export const fetchMealList = async () => {
  const { data } = await axios.get(URL); // 40개 정도 뜨려면 1000 perpage는 필요
  const placeInfos: [] = data.data;
  const mealList = placeInfos.filter((placeInfo: any) => placeInfo['카테고리2'] == '반려동물식당카페');
  return mealList;
};

// 모든 의료기관 정보
export const fetchMedicalList = async () => {
  const { data } = await axios.get(URL);
  const placeInfos: [] = data.data;
  const medicalList = placeInfos.filter((placeInfo: any) => placeInfo['카테고리2'] == '반려의료'); // 전체 10개면 7개/ 100개면 88개는 반려의료
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
