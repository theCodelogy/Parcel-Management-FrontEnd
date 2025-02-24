import axios from "axios";
import { ParcelData } from "../types";

// Option 1: Simulate demo data using Axios with a delay
export const fetchParcelsApi = async (): Promise<ParcelData[]> => {
  // Fetch the demo data from the public folder
  const response = await axios.get<ParcelData[]>("/parcelsData.json");

  // Simulate a delay of 1 second (1000ms)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return response.data;
};

// // Option 2: Fetch from your API using Axios
// export const fetchReturns = async (): Promise<TableData[]> => {
//   const response = await axios.get<TableData[]>(
//     "https://your-backend.com/api/returns"
//   );
//   return response.data;
// };
