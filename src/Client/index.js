import { lazy } from "react";
import AffiliateList from "./Pages/Dashboard/Affiliate/AffiliateList/AffiliateList.jsx";
import AffiliateWidthrow from "../Client/Pages/Dashboard/Affiliate/AffiliateWidthraw/AffiliateWidthrow.jsx";
import AffiliateUsers from "./Pages/Dashboard/Affiliate/AffiliateUser/AffiliateUsers.jsx";
import Deposit from "./Pages/Dashboard/Deposit/Deposit.jsx";
import Widthrow from "./Pages/Dashboard/Widthdraw/Widthrow.jsx";
import Getway from "./Pages/Dashboard/DepositGetWay/Getway.jsx";
import MyDeposit from "./Pages/Dashboard/MyDeposit/MyDeposit.jsx";
import Profile from "./Pages/Dashboard/Profile/Profile.jsx";
import Login from "./Pages/Login.jsx";
import Registration from "../Client/Pages/Registration.jsx";
import DepositReportApproved from "./Pages/Dashboard/Report/DepositApproved/DepositReportApproved.jsx";
import WidthrowReportapproved from "./Pages/Dashboard/Report/WidthdrawApproved/WidthrowReportapproved.jsx";
import GetAllUserList from "./Pages/Dashboard/Report/GetAllUserList.jsx";
import AffiliateCommissionReport from "./Pages/Dashboard/Affiliate/Report/AffiliateCommissionReport.jsx";
import ProtectedRoute from "./Component/ProtectedRoute.jsx";
import WidthrowReportRejected from "./Pages/Dashboard/Report/WidthdrawRejected/WidthrowReportRejected.jsx";
import DepositReportRejects from "./Pages/Dashboard/Report/Depositrejected/DepositReportRejects.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import UpdatePassword from "./Pages/UpdatePassword.jsx";
import WidthrawGetway from "./Pages/Dashboard/withdrawGetWay/WidthrawGetway.jsx";

const ClientLayout = lazy(() => import("./Component/ClientLayout.jsx"));
const SubAdminHome = lazy(() => import("./Pages/Home/SubAdminHome.jsx"));

export default  [
  {
    path: "/",
    element:
    (<ProtectedRoute requiredRole="subAdmin">
    <ClientLayout style={{
    
    backgroundImage: `url(${`https://ik.imagekit.io/fjs420h8f/WhatsApp%20Image%202025-02-26%20at%2022.48.56_a42eedca.jpg?updatedAt=1740595143122`})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    }}/>
    </ProtectedRoute>),
    errorElement: <div>Loading Agent Error</div>,
    children: [
      {
        path: "/",
        element: (<ProtectedRoute requiredRole="subAdmin"><SubAdminHome /></ProtectedRoute>),
      },

      {
        path: "subAdminDeposit",
        element: (<ProtectedRoute requiredRole="subAdmin"><Deposit /></ProtectedRoute>),
      },
      {
        path: "subAdminwidthrow",
        element: (<ProtectedRoute requiredRole="subAdmin"><Widthrow /></ProtectedRoute>),
      },
      {
        path: "subAdmingetway",
        element: (<ProtectedRoute requiredRole="subAdmin"><Getway /></ProtectedRoute>),
      },
      {
        path: "SubAdminGetwayWidthraw",
        element: (<ProtectedRoute requiredRole="subAdmin"><WidthrawGetway /></ProtectedRoute>),
      },
      // {
      //   path: "affiliate-list",
      //   element: (<ProtectedRoute requiredRole="subAdmin"><AffiliateList /></ProtectedRoute>),
      // },

      // {
      //   path: "AffiliateWidthrow",
      //   element: <AffiliateWidthrow />,
      // },

      // {
      //   path: "Affiliate-User",
      //   element: (<ProtectedRoute requiredRole="subAdmin"><AffiliateUsers /></ProtectedRoute>),
      // },
      {
        path: "MyDepisit",
        element: (<ProtectedRoute requiredRole="subAdmin"><MyDeposit /></ProtectedRoute>),
      },
      {
        path: "depositReportApproved",
        element: (<ProtectedRoute requiredRole="subAdmin"><DepositReportApproved /></ProtectedRoute>),
      },
      {
        path: "depositReportReject",
        element: (<ProtectedRoute requiredRole="subAdmin"><DepositReportRejects /></ProtectedRoute>),
      },
      {
        path: "widthrawReportAccept",
        element: (<ProtectedRoute requiredRole="subAdmin"><WidthrowReportapproved /></ProtectedRoute>),
      },
      {
        path: "widthrawReportreject",
        element: (<ProtectedRoute requiredRole="subAdmin"><WidthrowReportRejected /></ProtectedRoute>),
      },
      {
        path: "userReport",
        element: (<ProtectedRoute requiredRole="subAdmin"><GetAllUserList /></ProtectedRoute>),
      },
      // {
      //   path: "affiliateCommissionReport",
      //   element: (<ProtectedRoute requiredRole="subAdmin"><AffiliateCommissionReport /></ProtectedRoute>),
      // },

      {
        path: "profile",
        element: (<ProtectedRoute requiredRole="subAdmin"><Profile /></ProtectedRoute>),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/forgot_password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset_password",
    element: <ResetPassword />,
  },
  {
    path: "/update_password",
    element: <UpdatePassword/>,
  },
];
