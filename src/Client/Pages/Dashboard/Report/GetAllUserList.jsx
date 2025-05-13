import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import UserTableReportList from "./UserTableReportList";
import { useAuth } from "../../../Component/AuthContext";
import { GetAllUser_For_Sub_Admin } from "../../../AdminApi/AxiosAPIService";


export default () => {
  const headers = [
    "userId",
    "name",
    "countryCode",
    "Mobile",
    "email",
    "balance",
    "referralCode",
    "isPhoneVerified",
    "isEmailVerified",
    "last_game_id",
    "Provider History",
    "Date Time",
    "Tnx History",
    "Game History",
    "Password",
    
  ];

    const { isAuthenticated, user, hasRole } = useAuth();
    // console.log(user.referralCode);
  const [data, setData] = useState([]);
  const [referredCode, setReferredCode] = useState(""); // Store the referredCode for filtering
  const [modalShow, setModalShow] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
console.log(data);
 


 
   // Search filters
   const [filters, setFilters] = useState({
     userId: "",
     email: "",
     phone: "",
     
   });
 

   
 
   
   // Fetch withdrawal transactions based on search filters
   const fetchWithdrawals = async () => {
     setLoading(true);
     setError("");
     try {
       const { userId, email, phone } = filters;
 
       const body =  {
         userId,
         email,
         phone,
         referralCode: user.referralCode,
       }
 console.log(body);
 
       const response = await GetAllUser_For_Sub_Admin(body);
       console.log(response.data);
       setData(response.data);
     } catch (err) {
       setError("Error fetching withdrawals");
     } finally {
       setLoading(false);
     }
   };
 
   useEffect(() => {
     fetchWithdrawals();
   }, [filters]);
 
  // const {transactionID, 
  //   userId,
  //   status,
  //   referralCode}=approveDeposit

  // Function to approve a deposit
 
  // Trigger fetching deposits on component mount or when referredCode changes
 

  return (
    <div style={{height:"100vh"}} >
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
          <div className="mx-2">
            <Form.Label className="text-white">Email</Form.Label>
            <Form.Control
              type="number"
              value={filters.email}
              onChange={(e) => setFilters({ ...filters, email: e.target.value })}
            />
          </div>
          <div className="mx-2">
            <Form.Label className="text-white"> Phone</Form.Label>
            <Form.Control
              type="text"
              value={filters.phone}
              onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
            />
          </div>
          
          
          <div className="mx-2 d-flex align-items-end">
            <Button onClick={fetchWithdrawals} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </Card>
      <div className="m-3">
        
          <UserTableReportList data={data} headers={headers}   />
       
      </div>
    </div>
  );
};

