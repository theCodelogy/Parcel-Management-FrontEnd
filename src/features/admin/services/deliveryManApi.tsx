import axios from "axios";
import { DeliveryManData } from "../types";

interface ApiResponse {
  data: DeliveryManData[];
}

export const fetchdeliveryManApi = async (): Promise<DeliveryManData[]> => {
  const response = await axios.get<ApiResponse>(
    "https://parcel-management-back-end.vercel.app/api/v1/deliveryMan"
  );
  return response.data.data;
};
