import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { UpdateDeposits_listStutas, UpdateWidthdraw_listStutas } from "../../../AdminApi/AxiosAPIService";
import { useAuth } from "../../../Component/AuthContext";

export default ({ row, approveWidthdraw, ...modalProps }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
console.log(row);
const{user}=useAuth();
console.log(user);
  if (!row) return null;



  const { userId,  base_amount, mobile, gateway_name, transactionID, status, datetime } = row;
  const isPending = Number(status) === 0;
console.log(isPending,userId,base_amount,mobile,gateway_name,transactionID,status,datetime);
  const NewHeaders = {
    "Base Amount": base_amount,
    "Mobile": mobile,
    "Gateway Name": gateway_name,
    "Transaction ID": transactionID,
    "Status": isPending ? "Pending" : "Approved",
    "User ID": userId,
    "Date Time": datetime,
  };
  let referralCode = row.referredBy;
  const handleAction = async (status,userId) => {
    console.log(status,userId,referralCode, userId);
    setLoading(true);
    setError(""); // Clear previous error
    
    try {
      const response = await approveWidthdraw(transactionID, 
        userId,
        status,
        referralCode ,
        base_amount
      );
      alert(response.data);
      console.log(response.data);
      console.log(approveWidthdraw);
      modalProps.onHide(); // Close modal after action
    } catch (err) {
      setError(err.response?.data?.message || "Error processing transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal {...modalProps} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Transaction Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {Object.entries(NewHeaders).map(([key, value]) => (
            <Form.Group className="mb-3" key={key}>
              <Form.Label>{key}</Form.Label>
              <Form.Control type="text" value={value} readOnly />
            </Form.Group>
          ))}
        </Form>
        {error && <div className="text-danger">{error}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => handleAction(1,userId)} disabled={loading || !isPending}>
          Approve
        </Button>
        <Button variant="danger" onClick={() => handleAction(2,userId)} disabled={loading || !isPending}>
          Reject
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


