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
  image: string;
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

// export type ParcelStatus =
//   | "Pending"
//   | "Pickup Assign"
//   | "Pickup Re-schedule"
//   | "Received by Pickup Man"
//   | "Received by Warehouse"
//   | "Transfer to Hub"
//   | "Received by Hub"
//   | "Delivery Man Assigned"
//   | "Return to Courier"
//   | "Partial Delivered"
//   | "Delivered"
//   | "Return Assigned to Merchant"
//   | "Return Assigned to Merchant Re-schedule"
//   | "Return Received by Merchant";

export interface Amount {
  cod: number;
  totalCharge: number;
  vat: number;
  currentPayable: number;
}

export interface Recipient {
  name: string;
  phone: string;
  address: string;
}

export interface Merchant {
  name: string;
  id: string;
  address: string;
}

// export interface ParcelData {
//   id: number;
//   trackingId: string;
//   recipient: Recipient;
//   merchant: Merchant;
//   amounts: Amount;
//   priority: "High" | "Medium" | "Low";
//   status: ParcelStatus;
//   statusUpdate: string;
//   payment: string;
//   reference: string | null;
// }

export interface ParcelStatus {
  title: string;
  name: string;
  email: string;
  phone: string;
  current: string;
  date: number;
}

export interface ParcelData {
  _id: string;
  TrakingId: string;
  merchant: string;
  pickupPoints: string;
  pickupPhone: string;
  pickupAddress: string;
  cashCollection: number;
  sellingPrice: number;
  invoice: string;
  deliveryType: string;
  Weight: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  note: string;
  packaging: string;
  priority: string;
  paymentMethod: string;
  deliveryCharge: number;
  liquidORFragile: number;
  codCharge: number;
  totalCharge: number;
  vat: number;
  netPayable: number;
  advance: number;
  currentPayable: number;
  parcelStatus: ParcelStatus[];
}
