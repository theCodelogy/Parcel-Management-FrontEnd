import axios from "axios";
import { BranchData } from "../types";

// Option 2: Fetch from your API using Axios
export const fetchBranchApi = async (): Promise<BranchData[]> => {
  const response = await axios.get<BranchData[]>(
    "https://parcel-management-back-end.vercel.app/api/v1/branch"
  );
  return response.data;
};
