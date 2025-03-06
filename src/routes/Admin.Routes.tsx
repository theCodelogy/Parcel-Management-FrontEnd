// import React from "react";
// import {
//   Home,
//   Truck,
//   Building2,
//   Building,
//   CreditCard,
//   ListTodo,
//   Users,
//   UserPlus,
//   MessageSquare,
//   Package,
//   Tag,
//   Clock,
//   ShieldAlert,
//   Bell,
//   PackagePlus,
//   Database,
//   Wallet,
//   DollarSign,
//   ArrowDownRight,
//   ArrowUpRight,
//   Send,
//   Folder,
//   FileBox,
//   Puzzle,
//   BellRing,
//   UserCheck,
//   ClipboardCheck,
//   BarChart2,
//   Globe,
//   Section,
//   Settings,
//   Currency,
//   DatabaseBackup,
//   Link,
//   ChevronDown, // used for dropdown indication
//   Edit, // used for edit actions
//   Plus, // used for create actions
// } from "lucide-react";

// import Branch from "../features/admin/pages/branch-manage/BranchPage";
// import BranchPayments from "../features/admin/pages/branch-manage/BranchPaymentsListPage";
// import DeliveryMan from "../features/admin/pages/DeliveryManPage";
// import Merchants from "../features/admin/pages/merchant-manage/MerchantsPage";
// import Payment from "../features/admin/pages/merchant-manage/Payment";
// import TodoList from "../features/admin/pages/TodoListPage";
// import AdminDashboard from "../features/admin/pages/AdminDashboard";
// import Ticket from "../features/admin/pages/Ticket";
// import Parcels from "../features/admin/pages/Parcels";
// import Offers from "../features/admin/pages/Offers";
// import DeceptionCheck from "../features/admin/pages/DeceptionCheck";
// import Subscribe from "../features/admin/pages/Subscribe";
// import PickupRegular from "../features/admin/pages/PickupRegular";
// import PickupExpress from "../features/admin/pages/PickupExpress";
// import Assets from "../features/admin/pages/Assets";
// import WalletRequest from "../features/admin/pages/WalletRequest";
// import PaymentReceived from "../features/admin/pages/PaymentReceived";
// import Payout from "../features/admin/pages/Payout";
// import AccountHeads from "../features/admin/pages/accounts/AccountHeads";
// import AccountsList from "../features/admin/pages/accounts/AccountsList";
// import FundTransfer from "../features/admin/pages/accounts/FundTransfer";
// import Income from "../features/admin/pages/accounts/Income";
// import Expense from "../features/admin/pages/accounts/Expense";
// import PaidInvoice from "../features/admin/pages/accounts/PaidInvoice";
// import Roles from "../features/admin/pages/users-roles/Roles";
// import Designations from "../features/admin/pages/users-roles/Designations";
// import Departments from "../features/admin/pages/users-roles/Departments";
// import UsersRole from "../features/admin/pages/users-roles/UsersRole";
// import SalaryGenerate from "../features/admin/pages/payroll/SalaryGenerate";
// import Salary from "../features/admin/pages/payroll/Salary";
// import ParcelStatusReports from "../features/admin/pages/reports/ParcelStatusReports";
// import ParcelWiseProfit from "../features/admin/pages/reports/ParcelWiseProfit";
// import SalaryReports from "../features/admin/pages/reports/SalaryReports";
// import MerchantBranchDeliveryman from "../features/admin/pages/reports/MerchantBranchDeliveryman";
// import TotalSummery from "../features/admin/pages/reports/TotalSummery";
// import PushNotification from "../features/admin/pages/PushNotification";
// import Addons from "../features/admin/pages/Addons";
// import SocialLink from "../features/admin/pages/front-web/SocialLink";
// import Service from "../features/admin/pages/front-web/Service";
// import WhyCourier from "../features/admin/pages/front-web/WhyCourier";
// import Faq from "../features/admin/pages/front-web/Faq";
// import Partner from "../features/admin/pages/front-web/Partner";
// import Blogs from "../features/admin/pages/front-web/Blogs";
// import Pages from "../features/admin/pages/front-web/Pages";
// import GeneralSettings from "../features/admin/pages/setting/GeneralSettings";
// import DeliveryCharge from "../features/admin/pages/setting/DeliveryCharge";
// import DeliveryCategory from "../features/admin/pages/setting/DeliveryCategory";
// import DeliveryType from "../features/admin/pages/setting/DeliveryType";
// import LiquidFragile from "../features/admin/pages/setting/LiquidFragile";
// import SmsSetting from "../features/admin/pages/setting/SmsSetting";
// import SmsSendSetting from "../features/admin/pages/setting/SmsSendSetting";
// import NotificationSettings from "../features/admin/pages/setting/NotificationSettings";
// import GoogleMapSetting from "../features/admin/pages/setting/GoogleMapSetting";
// import SocialLoginSettings from "../features/admin/pages/setting/SocialLoginSettings";
// import OnlinePaymentSetup from "../features/admin/pages/setting/OnlinePaymentSetup";
// import Packaging from "../features/admin/pages/setting/Packaging";
// import AssetsCategory from "../features/admin/pages/setting/AssetsCategory";
// import InvoiceGenerate from "../features/admin/pages/setting/InvoiceGenerate";
// import LogsDashboard from "../features/admin/components/LogsDashboard";
// import CreateDeliveryMan from "../features/admin/pages/CreateDeliveryManPage";
// import CreateMerchantsPage from "../features/admin/pages/merchant-manage/CreateMerchantsPage";

// export interface RouteItem {
//   label: string;
//   path: string;
//   element?: React.ReactNode;
//   children?: RouteItem[];
//   icon?: React.FC<React.SVGProps<SVGSVGElement>>;
//   // New property for an extra or related icon (e.g. dropdown indicator)
//   relatedIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
// }

// export const adminRoutes: RouteItem[] = [
//   {
//     label: "Dashboard",
//     path: "dashboard",
//     element: <AdminDashboard />,
//     icon: Home,
//   },
//   {
//     label: "Delivery Man",
//     path: "delivery-man",
//     icon: Truck,
//     relatedIcon: ChevronDown,
//     children: [
//       {
//         label: "Delivery Man",
//         path: "delivery-man",
//         element: <DeliveryMan />,
//         icon: Truck,
//       },
//       {
//         label: "Create Delivery Man",
//         path: "create-delivery-man",
//         element: <CreateDeliveryMan />,
//         icon: CreditCard,
//       },
//     ],
//   },
//   {
//     label: "Branch Manage",
//     path: "branch-manage",
//     icon: Building2,
//     relatedIcon: ChevronDown,
//     children: [
//       {
//         label: "Branch",
//         path: "branch",
//         element: <Branch />,
//         icon: Building,
//       },
//       {
//         label: "Payments",
//         path: "payments",
//         element: <BranchPayments />,
//         icon: CreditCard,
//       },
//     ],
//   },
//   {
//     label: "Merchant Manage",
//     path: "merchant-manage",
//     icon: Users,
//     relatedIcon: ChevronDown,
//     children: [
//       {
//         label: "Merchants",
//         path: "merchants",
//         element: <Merchants />,
//         icon: UserPlus,
//       },
//       {
//         label: "Create Merchants",
//         path: "create-merchants",
//         element: <CreateMerchantsPage />,
//         icon: UserPlus,
//       },
//       {
//         label: "Payments",
//         path: "merchant-payment",
//         element: <Payment />,
//         icon: CreditCard,
//       },
//     ],
//   },
//   {
//     label: "Todo List",
//     path: "todo-list",
//     element: <TodoList />,
//     icon: ListTodo,
//   },
//   {
//     label: "Ticket",
//     path: "ticket",
//     element: <Ticket />,
//     icon: MessageSquare,
//   },
//   {
//     label: "Parcels",
//     path: "parcels",
//     element: <Parcels />,
//     icon: Package,
//   },
//   {
//     label: "Offers",
//     path: "offers",
//     element: <Offers />,
//     icon: Tag,
//   },
//   {
//     label: "Active Logs",
//     path: "active-logs",
//     element: <LogsDashboard />,
//     icon: Clock,
//   },
//   {
//     label: "Deception Check",
//     path: "deception-check",
//     element: <DeceptionCheck />,
//     icon: ShieldAlert,
//   },
//   {
//     label: "Subscribe",
//     path: "subscribe",
//     element: <Subscribe />,
//     icon: Bell,
//   },
//   {
//     label: "Pickup Request",
//     path: "pickup-request",
//     icon: PackagePlus,
//     relatedIcon: ChevronDown,
//     children: [
//       {
//         label: "Regular",
//         path: "regular",
//         element: <PickupRegular />,
//         icon: Clock,
//       },
//       {
//         label: "Express",
//         path: "express",
//         element: <PickupExpress />,
//         icon: Truck,
//       },
//     ],
//   },
//   {
//     label: "Assets",
//     path: "assets",
//     element: <Assets />,
//     icon: Database,
//   },
//   {
//     label: "Wallet Request",
//     path: "wallet-request",
//     element: <WalletRequest />,
//     icon: Wallet,
//   },
//   {
//     label: "Payment Received",
//     path: "payment-received",
//     element: <PaymentReceived />,
//     icon: DollarSign,
//   },
//   {
//     label: "Payout",
//     path: "payout",
//     element: <Payout />,
//     icon: DollarSign,
//   },
//   {
//     label: "Accounts",
//     path: "accounts",
//     icon: Folder,
//     relatedIcon: ChevronDown,
//     children: [
//       {
//         label: "Account Heads",
//         path: "account-heads",
//         element: <AccountHeads />,
//         icon: FileBox,
//       },
//       {
//         label: "Accounts",
//         path: "accounts-list",
//         element: <AccountsList />,
//         icon: Folder,
//       },
//       {
//         label: "Fund Transfer",
//         path: "fund-transfer",
//         element: <FundTransfer />,
//         icon: Send,
//       },
//       {
//         label: "Income",
//         path: "income",
//         element: <Income />,
//         icon: ArrowUpRight,
//       },
//       {
//         label: "Expense",
//         path: "expense",
//         element: <Expense />,
//         icon: ArrowDownRight,
//       },
//       {
//         label: "Paid Invoice",
//         path: "paid-invoice",
//         element: <PaidInvoice />,
//         icon: ArrowDownRight,
//       },
//     ],
//   },
//   {
//     label: "Users & Roles",
//     path: "users-roles",
//     icon: UserCheck,
//     relatedIcon: ChevronDown,
//     children: [
//       {
//         label: "Roles",
//         path: "roles",
//         element: <Roles />,
//         icon: ShieldAlert,
//       },
//       {
//         label: "Designations",
//         path: "designations",
//         element: <Designations />,
//         icon: UserPlus,
//       },
//       {
//         label: "Departments",
//         path: "departments",
//         element: <Departments />,
//         icon: Building2,
//       },
//       {
//         label: "Users",
//         path: "users",
//         element: <UsersRole />,
//         icon: Users,
//       },
//     ],
//   },
//   {
//     label: "Payroll",
//     path: "payroll",
//     icon: ClipboardCheck,
//     relatedIcon: ChevronDown,
//     children: [
//       {
//         label: "Salary Generate",
//         path: "salary-generate",
//         element: <SalaryGenerate />,
//         icon: DollarSign,
//       },
//       {
//         label: "Salary",
//         path: "salary",
//         element: <Salary />,
//         icon: Wallet,
//       },
//     ],
//   },
//   {
//     label: "Reports",
//     path: "reports",
//     icon: BarChart2,
//     relatedIcon: ChevronDown,
//     children: [
//       {
//         label: "Parcel Status Reports",
//         path: "parcel-status-reports",
//         element: <ParcelStatusReports />,
//         icon: Package,
//       },
//       {
//         label: "Parcel Wise Profit",
//         path: "parcel-wise-profit",
//         element: <ParcelWiseProfit />,
//         icon: DollarSign,
//       },
//       {
//         label: "Salary Reports",
//         path: "salary-reports",
//         element: <SalaryReports />,
//         icon: ClipboardCheck,
//       },
//       {
//         label: "Merchant/Branch/deliveryman",
//         path: "merchant-branch-deliveryman",
//         element: <MerchantBranchDeliveryman />,
//         icon: Users,
//       },
//       {
//         label: "Total summery",
//         path: "total-summery",
//         element: <TotalSummery />,
//         icon: BarChart2,
//       },
//     ],
//   },
//   {
//     label: "Push Notification",
//     path: "push-notification",
//     element: <PushNotification />,
//     icon: BellRing,
//   },
//   {
//     label: "Addons",
//     path: "addons",
//     element: <Addons />,
//     icon: Puzzle,
//   },
//   {
//     label: "Front Web",
//     path: "front-web",
//     icon: Globe,
//     relatedIcon: ChevronDown,
//     children: [
//       {
//         label: "Social Link",
//         path: "social-link",
//         element: <SocialLink />,
//         icon: Link,
//       },
//       {
//         label: "Service",
//         path: "service",
//         element: <Service />,
//         icon: Settings,
//       },
//       {
//         label: "Why Courier",
//         path: "why-courier",
//         element: <WhyCourier />,
//         icon: Truck,
//       },
//       {
//         label: "FAQ",
//         path: "faq",
//         element: <Faq />,
//         icon: MessageSquare,
//       },
//       {
//         label: "Partner",
//         path: "partner",
//         element: <Partner />,
//         icon: Users,
//       },
//       {
//         label: "Blogs",
//         path: "blogs",
//         element: <Blogs />,
//         icon: FileBox,
//       },
//       {
//         label: "Pages",
//         path: "pages",
//         element: <Pages />,
//         icon: Folder,
//       },
//       {
//         label: "Section",
//         path: "section",
//         element: <Section />,
//         icon: Section,
//       },
//     ],
//   },
//   {
//     label: "Setting",
//     path: "setting",
//     icon: Settings,
//     relatedIcon: ChevronDown,
//     children: [
//       {
//         label: "General Settings",
//         path: "general-settings",
//         element: <GeneralSettings />,
//         icon: Settings,
//       },
//       {
//         label: "Delivery Category",
//         path: "delivery-category",
//         element: <DeliveryCategory />,
//         icon: Tag,
//       },

//       {
//         label: "Delivery Charge",
//         path: "delivery-charge",
//         element: <DeliveryCharge />,
//         icon: DollarSign,
//       },
//       {
//         label: "Create Delivery Charge",
//         path: "create-delivery-charge", // updated path
//         element: <DeliveryCharge />,
//         icon: Plus, // using Plus icon for creation
//       },
//       {
//         label: "Edit Delivery Charge",
//         path: "edit-delivery-charge", // updated path for editing
//         element: <DeliveryCharge />,
//         icon: Edit, // using Edit icon here
//       },
//       {
//         label: "Delivery Type",
//         path: "delivery-type",
//         element: <DeliveryType />,
//         icon: Truck,
//       },
//       {
//         label: "Liquid/Fragile",
//         path: "liquid-fragile",
//         element: <LiquidFragile />,
//         icon: Package,
//       },
//       {
//         label: "SMS Setting",
//         path: "sms-setting",
//         element: <SmsSetting />,
//         icon: MessageSquare,
//       },
//       {
//         label: "SMS Send Setting",
//         path: "sms-send-setting",
//         element: <SmsSendSetting />,
//         icon: Send,
//       },
//       {
//         label: "Notification Settings",
//         path: "notification-settings",
//         element: <NotificationSettings />,
//         icon: Bell,
//       },
//       {
//         label: "GoogleMap Setting",
//         path: "google-map-setting",
//         element: <GoogleMapSetting />,
//         icon: Globe,
//       },
//       {
//         label: "Social login settings",
//         path: "social-login-settings",
//         element: <SocialLoginSettings />,
//         icon: UserCheck,
//       },
//       {
//         label: "Online Payment Setup",
//         path: "online-payment-setup",
//         element: <OnlinePaymentSetup />,
//         icon: CreditCard,
//       },
//       {
//         label: "Packaging",
//         path: "packaging",
//         element: <Packaging />,
//         icon: Package,
//       },
//       {
//         label: "Currency",
//         path: "currency",
//         element: <Currency />,
//         icon: Currency,
//       },
//       {
//         label: "Assets Category",
//         path: "assets-category",
//         element: <AssetsCategory />,
//         icon: Database,
//       },
//       {
//         label: "Database Backup",
//         path: "database-backup",
//         element: <DatabaseBackup />,
//         icon: DatabaseBackup,
//       },
//       {
//         label: "Invoice Generate",
//         path: "invoice-generate",
//         element: <InvoiceGenerate />,
//         icon: FileBox,
//       },
//     ],
//   },
// ];

import React from "react";
import Branch from "../features/admin/pages/branch-manage/BranchPage";
import BranchPayments from "../features/admin/pages/branch-manage/BranchPaymentsListPage";
import DeliveryMan from "../features/admin/pages/DeliveryManPage";
import Merchants from "../features/admin/pages/merchant-manage/MerchantsPage";
import Payment from "../features/admin/pages/merchant-manage/Payment";
import TodoList from "../features/admin/pages/TodoListPage";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import Ticket from "../features/admin/pages/Ticket";
import Parcels from "../features/admin/pages/Parcels";
import Offers from "../features/admin/pages/Offers";
import DeceptionCheck from "../features/admin/pages/DeceptionCheck";
import Subscribe from "../features/admin/pages/Subscribe";
import PickupRegular from "../features/admin/pages/PickupRegular";
import PickupExpress from "../features/admin/pages/PickupExpress";
import Assets from "../features/admin/pages/Assets";
import WalletRequest from "../features/admin/pages/WalletRequest";
import PaymentReceived from "../features/admin/pages/PaymentReceived";
import Payout from "../features/admin/pages/Payout";
import AccountHeads from "../features/admin/pages/accounts/AccountHeads";
import AccountsList from "../features/admin/pages/accounts/AccountsList";
import FundTransfer from "../features/admin/pages/accounts/FundTransfer";
import Income from "../features/admin/pages/accounts/Income";
import Expense from "../features/admin/pages/accounts/Expense";
import PaidInvoice from "../features/admin/pages/accounts/PaidInvoice";
import Roles from "../features/admin/pages/users-roles/Roles";
import Designations from "../features/admin/pages/users-roles/Designations";
import Departments from "../features/admin/pages/users-roles/Departments";
import UsersRole from "../features/admin/pages/users-roles/UsersRole";
import SalaryGenerate from "../features/admin/pages/payroll/SalaryGenerate";
import Salary from "../features/admin/pages/payroll/Salary";
import ParcelStatusReports from "../features/admin/pages/reports/ParcelStatusReports";
import ParcelWiseProfit from "../features/admin/pages/reports/ParcelWiseProfit";
import SalaryReports from "../features/admin/pages/reports/SalaryReports";
import MerchantBranchDeliveryman from "../features/admin/pages/reports/MerchantBranchDeliveryman";
import TotalSummery from "../features/admin/pages/reports/TotalSummery";
import PushNotification from "../features/admin/pages/PushNotification";
import Addons from "../features/admin/pages/Addons";
import SocialLink from "../features/admin/pages/front-web/SocialLink";
import Service from "../features/admin/pages/front-web/Service";
import WhyCourier from "../features/admin/pages/front-web/WhyCourier";
import Faq from "../features/admin/pages/front-web/Faq";
import Partner from "../features/admin/pages/front-web/Partner";
import Blogs from "../features/admin/pages/front-web/Blogs";
import Pages from "../features/admin/pages/front-web/Pages";
import GeneralSettings from "../features/admin/pages/setting/GeneralSettings";
import DeliveryCharge from "../features/admin/pages/setting/DeliveryCharge";
import DeliveryCategory from "../features/admin/pages/setting/DeliveryCategory";
import DeliveryType from "../features/admin/pages/setting/DeliveryType";
import LiquidFragile from "../features/admin/pages/setting/LiquidFragile";
import SmsSetting from "../features/admin/pages/setting/SmsSetting";
import SmsSendSetting from "../features/admin/pages/setting/SmsSendSetting";
import NotificationSettings from "../features/admin/pages/setting/NotificationSettings";
import GoogleMapSetting from "../features/admin/pages/setting/GoogleMapSetting";
import SocialLoginSettings from "../features/admin/pages/setting/SocialLoginSettings";
import OnlinePaymentSetup from "../features/admin/pages/setting/OnlinePaymentSetup";
import Packaging from "../features/admin/pages/setting/Packaging";
import AssetsCategory from "../features/admin/pages/setting/AssetsCategory";
import InvoiceGenerate from "../features/admin/pages/setting/InvoiceGenerate";
import LogsDashboard from "../features/admin/components/LogsDashboard";
import CreateDeliveryMan from "../features/admin/pages/CreateDeliveryManPage";
import CreateMerchantsPage from "../features/admin/pages/merchant-manage/CreateMerchantsPage";

export interface RouteItem {
  path: string;
  element?: React.ReactNode;
  children?: RouteItem[];
}

export const adminRoutes: RouteItem[] = [
  {
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "delivery-man",
    children: [
      {
        path: "delivery-man",
        element: <DeliveryMan />,
      },
      {
        path: "create-delivery-man",
        element: <CreateDeliveryMan />,
      },
    ],
  },
  {
    path: "branch-manage",
    children: [
      {
        path: "branch",
        element: <Branch />,
      },
      {
        path: "payments",
        element: <BranchPayments />,
      },
    ],
  },
  {
    path: "merchant-manage",
    children: [
      {
        path: "merchants",
        element: <Merchants />,
      },
      {
        path: "create-merchants",
        element: <CreateMerchantsPage />,
      },
      {
        path: "merchant-payment",
        element: <Payment />,
      },
    ],
  },
  {
    path: "todo-list",
    element: <TodoList />,
  },
  {
    path: "ticket",
    element: <Ticket />,
  },
  {
    path: "parcels",
    element: <Parcels />,
  },
  {
    path: "offers",
    element: <Offers />,
  },
  {
    path: "active-logs",
    element: <LogsDashboard />,
  },
  {
    path: "deception-check",
    element: <DeceptionCheck />,
  },
  {
    path: "subscribe",
    element: <Subscribe />,
  },
  {
    path: "pickup-request",
    children: [
      {
        path: "regular",
        element: <PickupRegular />,
      },
      {
        path: "express",
        element: <PickupExpress />,
      },
    ],
  },
  {
    path: "assets",
    element: <Assets />,
  },
  {
    path: "wallet-request",
    element: <WalletRequest />,
  },
  {
    path: "payment-received",
    element: <PaymentReceived />,
  },
  {
    path: "payout",
    element: <Payout />,
  },
  {
    path: "accounts",
    children: [
      {
        path: "account-heads",
        element: <AccountHeads />,
      },
      {
        path: "accounts-list",
        element: <AccountsList />,
      },
      {
        path: "fund-transfer",
        element: <FundTransfer />,
      },
      {
        path: "income",
        element: <Income />,
      },
      {
        path: "expense",
        element: <Expense />,
      },
      {
        path: "paid-invoice",
        element: <PaidInvoice />,
      },
    ],
  },
  {
    path: "users-roles",
    children: [
      {
        path: "roles",
        element: <Roles />,
      },
      {
        path: "designations",
        element: <Designations />,
      },
      {
        path: "departments",
        element: <Departments />,
      },
      {
        path: "users",
        element: <UsersRole />,
      },
    ],
  },
  {
    path: "payroll",
    children: [
      {
        path: "salary-generate",
        element: <SalaryGenerate />,
      },
      {
        path: "salary",
        element: <Salary />,
      },
    ],
  },
  {
    path: "reports",
    children: [
      {
        path: "parcel-status-reports",
        element: <ParcelStatusReports />,
      },
      {
        path: "parcel-wise-profit",
        element: <ParcelWiseProfit />,
      },
      {
        path: "salary-reports",
        element: <SalaryReports />,
      },
      {
        path: "merchant-branch-deliveryman",
        element: <MerchantBranchDeliveryman />,
      },
      {
        path: "total-summery",
        element: <TotalSummery />,
      },
    ],
  },
  {
    path: "push-notification",
    element: <PushNotification />,
  },
  {
    path: "addons",
    element: <Addons />,
  },
  {
    path: "front-web",
    children: [
      {
        path: "social-link",
        element: <SocialLink />,
      },
      {
        path: "service",
        element: <Service />,
      },
      {
        path: "why-courier",
        element: <WhyCourier />,
      },
      {
        path: "faq",
        element: <Faq />,
      },
      {
        path: "partner",
        element: <Partner />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "pages",
        element: <Pages />,
      },
      {
        path: "section",
        // element: <Section />,
      },
    ],
  },
  {
    path: "setting",
    children: [
      {
        path: "general-settings",
        element: <GeneralSettings />,
      },
      {
        path: "delivery-category",
        element: <DeliveryCategory />,
      },
      {
        path: "delivery-charge",
        element: <DeliveryCharge />,
      },
      {
        path: "create-delivery-charge",
        element: <DeliveryCharge />,
      },
      {
        path: "edit-delivery-charge",
        element: <DeliveryCharge />,
      },
      {
        path: "delivery-type",
        element: <DeliveryType />,
      },
      {
        path: "liquid-fragile",
        element: <LiquidFragile />,
      },
      {
        path: "sms-setting",
        element: <SmsSetting />,
      },
      {
        path: "sms-send-setting",
        element: <SmsSendSetting />,
      },
      {
        path: "notification-settings",
        element: <NotificationSettings />,
      },
      {
        path: "google-map-setting",
        element: <GoogleMapSetting />,
      },
      {
        path: "social-login-settings",
        element: <SocialLoginSettings />,
      },
      {
        path: "online-payment-setup",
        element: <OnlinePaymentSetup />,
      },
      {
        path: "packaging",
        element: <Packaging />,
      },
      {
        path: "currency",
        // element: <Currency />,
      },
      {
        path: "assets-category",
        element: <AssetsCategory />,
      },
      {
        path: "database-backup",
        // element: <DatabaseBackup />,
      },
      {
        path: "invoice-generate",
        element: <InvoiceGenerate />,
      },
    ],
  },
];
