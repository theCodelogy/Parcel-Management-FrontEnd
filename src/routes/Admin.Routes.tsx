import React from "react";
import BranchPayments from "../features/admin/pages/branch-manage/BranchPaymentsListPage";
import DeliveryMan from "../features/admin/pages/delivery-man/DeliveryManPage";
import Merchants from "../features/admin/pages/merchant-manage/MerchantsPage";
import TodoList from "../features/admin/pages/TodoListPage";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import Ticket from "../features/admin/pages/Ticket";
import Parcels from "../features/admin/pages/parcel/AllParcelPageAdmin";
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
import CreateDeliveryMan from "../features/admin/pages/delivery-man/CreateDeliveryManPage";
import CreateMerchantsPage from "../features/admin/pages/merchant-manage/CreateMerchantsPage";
import EditDeliveryManPage from "@/features/admin/pages/delivery-man/EditDeliveryManPage";
import BranchPage from "../features/admin/pages/branch-manage/BranchPage";
import EditMerchantPage from "@/features/admin/pages/merchant-manage/EditMerchantPage";
import MerchantPaymentPage from "../features/admin/pages/merchant-manage/MerchantPaymentPage";
import EditParcelPage from "@/features/admin/pages/EditParcelPage";
import CreateParcelAdmin from "@/features/admin/pages/parcel/CreateParcelAdmin";
import AdminProfilePage from "@/features/admin/pages/AdminProfilePage";

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
    path: "profile",
    element: <AdminProfilePage />,
  },
  {
    path: "deliveryman",
    children: [
      {
        path: "",
        element: <DeliveryMan />,
      },
      {
        path: "create",
        element: <CreateDeliveryMan />,
      },
      {
        path: "edit",
        element: <EditDeliveryManPage />,
      },
    ],
  },
  {
    path: "branch-manage",
    children: [
      {
        path: "branch",
        element: <BranchPage />,
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
        path: "create",
        element: <CreateMerchantsPage />,
      },
      {
        path: "edit",
        element: <EditMerchantPage />,
      },
      {
        path: "merchant-payment",
        element: <MerchantPaymentPage />,
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
    children: [
      {
        path: "",
        element: <Parcels />,
      },
      {
        path: "create",
        element: <CreateParcelAdmin />,
      },
      {
        path: "edit",
        element: <EditParcelPage />,
      },
    ],
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
      // {
      //   path: "create-delivery-charge",
      //   element: <DeliveryCharge />,
      // },
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
