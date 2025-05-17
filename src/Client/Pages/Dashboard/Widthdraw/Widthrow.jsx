import React, { useState, useEffect } from "react";

import { Card, Form, Button } from "react-bootstrap";

import { searchDepositTransactions, searchWidthdrawTransactions, UpdateDeposits_list, UpdateDeposits_listStutas, UpdateWidthdraw_listStutas } from "../../../AdminApi/AxiosAPIService";


import WidthTableList from "./WidthTableList";
import { useAuth } from "../../../Component/AuthContext";
import DatePicker from "react-datepicker";

export default () => {
  const headers = [
    "serial",
    "Amount",
    "Mobile",
    "Gateway Name",
    "Transaction ID",
    "Status",
    "User ID",
    "Date Time",
    "Update Time",
    "Actions",
  ];

    const { isAuthenticated, user, hasRole } = useAuth();
    console.log(user.referralCode);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [referredCode, setReferredCode] = useState(""); // Store the referredCode for filtering
  const [modalShow, setModalShow] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
console.log(data);
 
 
   // Search filters
   const [filters, setFilters] = useState({
     userId: "",
     amount: "",
     gateway_name: "",
     status: "",
     startDate: null,
     endDate: null,
   });
 
 
   
   // Fetch withdrawal transactions based on search filters
   const fetchWithdrawals = async () => {
     setLoading(true);
     setError("");
     try {
       const { userId, amount, gateway_name, status, startDate, endDate } = filters;
 
       const params =  {
         userId,
         amount,
         gateway_name,
         status,
         startDate: startDate ? startDate.toISOString() : "",
         endDate: endDate ? endDate.toISOString() : "",
         referredBy: user.referralCode,
       }
 console.log(params);
 
       const response = await searchWidthdrawTransactions(params);
       console.log(response.data.total.total);
       setData(response.data.transactions);
       setTotal(response.data.total.total);
     } catch (err) {
       setError("Error fetching withdrawals");
     } finally {
       setLoading(false);
     }
   };
 
   useEffect(() => {
     fetchWithdrawals();
   }, [filters,]);
 
  // const {transactionID, 
  //   userId,
  //   status,
  //   referralCode}=approveDeposit

  // Function to approve a deposit
  const approveWidthdraw = async (transactionID, userId,status,referralCode) => {

      
    console.log(transactionID, 
      userId,
      status,
      referralCode,
  
    );
       setLoading(true);
       setError(""); // Clear previous error
      
       try {
         const response = await UpdateWidthdraw_listStutas(transactionID, 
           userId,
           status,
           referralCode ,
         );
         alert(response.data.message);
         console.log(response);
         fetchWithdrawals()
         return response
       } catch (err) {
         setError(err.response?.data?.message || "Error processing transaction");
         return err
       } finally {
         setLoading(false);
       }
  };

  // Trigger fetching deposits on component mount or when referredCode changes
 

  return (
    <div  >
      <Card body style={{ background: "#38094d" }} className="mx-3 ">
        <div className="d-flex">
          <div className="mx-2">
            <Form.Label className="text-white">User ID</Form.Label>
            <Form.Control
              type="text"
              value={filters.userId}
              onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
            />
          </div>
          
          <div className="mx-3">
            <Form.Label className="text-white">Gateway</Form.Label>
            <Form.Control
              type="text"
              value={filters.gateway_name}
              onChange={(e) => setFilters({ ...filters, gateway_name: e.target.value })}
            />
          </div>
          <div className="mx-3 ">
            <Form.Label className="text-white">Status</Form.Label>
            {/* <Form.Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value={""}>All</option>
              <option value="0">Pending</option>
              <option value="1">Accepted</option>
              <option value="2">Rejected</option>
            </Form.Select> */}
          </div>
          <div className="mx-3 d-flex-row">
            <Form.Label className="text-white">Start Date</Form.Label>
            <DatePicker
              selected={filters.startDate}
              onChange={(date) => setFilters({ ...filters, startDate: date })}
              className="form-control"
            />
          </div>
          <div className="mx-3 d-flex-row">
            <Form.Label className="text-white">End Date</Form.Label>
            <DatePicker
              selected={filters.endDate}
              onChange={(date) => setFilters({ ...filters, endDate: date })}
              className="form-control"
            />
          </div>
          <div className="mx-3 d-flex align-items-end">
            <Button onClick={fetchWithdrawals} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </Card>
      <div className="m-3">
        <Card  style={{ background: "transparent",color:"white" ,border:"1px solid white"}} className="my-3">
          <h3 className="p-3">Total Widthraw: {total}</h3>
        </Card>
        <Card  style={{ background: "transparent" }}>
          <WidthTableList data={data} headers={headers} approveWidthdraw={approveWidthdraw}  style={{ background: "transparent" }}/>
        </Card>
      </div>
    </div>
  );
};
