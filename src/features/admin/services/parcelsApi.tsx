
import axios from "axios";
import { ParcelData } from "../types";

// Define the shape of the API response
interface ApiResponse {
  data: ParcelData[];
}

export const fetchParcelsApi = async (): Promise<ParcelData[]> => {
  const response = await axios.get<ApiResponse>(
    "https://parcel-management-back-end.vercel.app/api/v1/parcel"
  );
  return response.data.data;
};
