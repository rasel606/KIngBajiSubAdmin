import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { UpdateDeposits_listStutas } from "../../../AdminApi/AxiosAPIService";
import { useAuth } from "../../../Component/AuthContext";

const DepositModal = ({ row, approveDeposit, ...modalProps }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
  let referralCode = row.referredBy;
  const handleAction = async (status,userId) => {
    console.log(status,userId);
    setLoading(true);
    setError(""); // Clear previous error
    
    try {
      const response = await approveDeposit(transactionID, 
        userId,
        status,
        referralCode ,
      );
      alert(response.data);
      console.log(response.data);
      console.log(approveDeposit);
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

export default DepositModal;
