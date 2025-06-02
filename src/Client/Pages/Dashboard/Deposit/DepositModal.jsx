import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { UpdateDeposits_listStutas } from "../../../AdminApi/AxiosAPIService";
import { useAuth } from "../../../Component/AuthContext";

const DepositModal = ({ row, approveDeposit,onHide,show,fetchWithdrawals,error,loading,setLoading,setError}) => {

console.log(row);
const{user}=useAuth();
console.log(user);
  if (!row) return null;



  const { userId, amount, base_amount,bonus_amount, mobile, gateway_name, transactionID, status, datetime } = row;
  const isPending = Number(status) === 0;
console.log(isPending,userId,amount,base_amount,mobile,gateway_name,transactionID,status,datetime);
  const NewHeaders = {
    "Amount + 3%": amount,
    "Base Amount": base_amount,
    "Base Amount": bonus_amount,
    "Mobile": mobile,
    "Gateway Name": gateway_name,
    "Transaction ID": transactionID,
    "Status": isPending ? "Pending" : "Approved",
    "User ID": userId,
    "Date Time": datetime,
  };
  let referralCode = user.referralCode;

  const handleApprove = () => {
    approveDeposit(transactionID, userId, 1, user.referralCode); // status 1 = approve
    onHide();

  };

  const handleReject = () => {
    approveDeposit(transactionID, userId, 2, user.referralCode); // status 2 = reject
    onHide();
  };


  return (
    <Modal show={show} onHide={onHide}  size="md" centered>
       <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>Transaction Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <div className="mb-3">
          {Object.entries(NewHeaders).map(([key]) => (
            <Form.Group className="mb-3" key={key}>
              <Form.Label>{key}</Form.Label>
              
            </Form.Group>
          ))}
          {Object.entries(row).map(([value]) => (
            <Form.Group className="mb-3" key={value}>
            
              <Form.Control type="text" value={value} readOnly />
            </Form.Group>
          ))}
        </div>
        
        {error && <div className="alert alert-danger">{error}</div>}
      </Modal.Body>
      <Modal.Footer className="bg-dark">
       {isPending && (
          <>
            <Button variant="success" onClick={handleApprove} disabled={loading}>
              Approve
            </Button>
            <Button variant="danger" onClick={handleReject} disabled={loading}>
              Reject
            </Button>
          </>
        )}
          {/* {loading ? "Processing..." : "Reject"} */}
        
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DepositModal;