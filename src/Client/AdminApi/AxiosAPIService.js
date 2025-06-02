
import axios from "axios";

const API = axios.create({ baseURL: "https://api.kingbaji.live/api/v1" });

// Interceptor to attach token to all requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('authSubAdminToken')
console.log(token)
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // Use Bearer token standard
  }
  return req;
});

// API Calls
export const verify_sub_admin = async () => {
  const token = localStorage.getItem("authSubAdminToken");
  const response = await API.get("/verify_sub_admin", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(response);
  return response.data;
};

export const CreateUser = (data) => API.post("/register_sub_admin", data);
export const LoginUser =async (email, password) => await API.post("/login_sub_admin",email, password );
export const UpdateName = (name, userId) => API.post("/update-name", { name, userId });
export const CreateUserNormal = (data) => API.post("/createUser", data);

export const searchDepositTransactions = (params) => API.post("/searchDepositTransactions", params);
export const searchDepositTransactionsReportAprove = (params) => API.post("/searchDepositTransactionsReportAprove", params);
export const searchDepositTransactionsReportreject = (params) => API.post("/searchDepositTransactionsReportreject", params);






export const searchWidthdrawTransactions = (params) => API.post("/searchWidthdrawTransactions", params);
export const searchWidthdrawTransactionsReportAprove = (params) => API.post("/searchWidthdrawTransactionsReportAprove", params);
export const searchWidthdrawTransactionsReportReject = (params) => API.post("/searchWidthdrawTransactionsReportReject", params);






export const searchTransactionsbyUserId = (data) => API.post("/searchTransactionsbyUserId", data);
export const totalDeposit = (referredBy) => API.post("/sub_admin_deposit_total", referredBy);
export const totalWidthraw = (referredBy) => API.post("/sub_admin_widthraw_total", referredBy);


export const UpdateDeposits_list = (referredBy) => API.post("/deposits_list", {referredBy});
export const UpdateWidthdraw_list = (referredBy) => API.post("/widthdraw_with_transaction", {referredBy});



export const GetAllUser_For_Sub_Admin = (params) => API.post("/get_all_user_For_Sub_Admin", params);

export const UpdateDeposits_listStutas = (transactionID, userId, status, referralCode ) => 
  API.post(`/deposit_with_approveDeposit_subadmin/${transactionID}`, { userId, status, referralCode });
export const UpdateWidthdraw_listStutas = ( transactionID, userId, status, referralCode ) => 
  API.post(`/widthraw_with_approvewidthraw_subadmin/${transactionID}`, { userId, status, referralCode });



export const UpdateDepositsgatway_list = (data) => API.post("/subadmingetwaylist", data);
export const UpdateWidthdrawgatway_list = (data) => API.post("/subadmin_getway_list_Widthraw", data);
export const updateWidthrawGatewayStatus = (data) => API.post("/update_widthraw_gateway_status", data);



export const updateDepositGatewayStatus = (data) => API.post("/update_deposit_gateway_status", data);
export const updateDepositGatewaytype = (formData) => API.post("/update_deposit_gateway_type", {formData});




export const AdminVerifyPhone = (data) => API.post("/admin_verify_phone", data);
export const AdminVerifyEmail = (data) => API.post("/admin_verify_email", data);
export const ChangeEmailByAdmin = (data) => API.post("/admin_change_email_by_user", data);
export const changePasswordUserByAdmin = (data) => API.post("/admin_change_password_by_user", data);




export const UpdategetWay_list = (formData) => API.post("/add_payment_Method_deposit", {formData});



export const updateWithdrawalGatewayType = (formData) => API.post("/update_withdrawal_gateway_type", {formData});
export const UpdategetWay_listWidthdraw = (formData) => API.post("/add_payment_Method_Widthral", {formData});



export const Sub_Admin_User_Details = (email) => API.post("/sub_admin_User_details", {email});


export const getTransactionDepositTotals = (referredBy) => API.post("/sub_admin_tnx_deposit_details_summary", referredBy);
export const getTransactionWidthrawTotals = (referredBy) => API.post("/sub_admin_tnx_widthraw_details_summary", referredBy);



export const chatsSummary = (referredBy) => API.post("/sub_admin_chats_deposit_Summary", referredBy);



export const verifyEmail = (formData) => API.post("/verify-email", formData);
export const Emailsend = (formData) => API.post("/send-otp", formData);
export const GetGameProvider = () => API.get("/get_all_providers");
export const GetGameCategory= () => API.get("/get_all_category");
export const getNewChatList = (senderId) => API.get(`/contacts/${senderId}`);
export const getNewChatHistory = (senderId,receiverId) => API.get(`/history/${senderId}/${receiverId}`);
export const GetBettingHistoryByMember = (data) => API.post("/bettingHistory-member-summary", data);
export const updateAndcreateSocialLinks = (data) => API.post("/update_and_create_socialLinks", data);
export const getSocialLinks = (data) => API.post("/get_socialLinks", data);
export const updateSocialLinks = (data) => API.post("/update_socialLinks", data);
export const deleteSocialLinks = (data) => API.post("/delete_socialLinks", data);