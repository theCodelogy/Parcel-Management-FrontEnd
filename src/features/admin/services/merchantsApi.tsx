import axios from "axios";

export const fetchMerchantsApi = async () => {
  const response = await axios.get(
    "https://parcel-management-back-end.vercel.app/api/v1/merchant"
  );
  return response.data.data;
};
