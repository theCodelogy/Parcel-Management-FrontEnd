export interface DeliveryManData {
  id: number;
  name: string;
  email: string;
  hub: string;
  deliveryCharge: string;
  pickupCharge: string;
  returnCharge: string;
  currentBalance: string;
  openingBalance: string;
  status: string;
  avatar: string;
}

export interface BranchData {
  id: number;
  name: string;
  phone: string;
  address: string;
  status: "Active" | "Inactive";
}

export interface MerchantData {
  id: number;
  details: string;
  hub: string;
  businessName: string;
  uniqueId: string;
  phone: string;
  status: "Active" | "Inactive";
  currentBalance: string;
  avatar: string;
}
