import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../../Component/AuthContext";

export default ({ row, onHide, show, ...modalProps }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false); // State for showing the toast
  const [amount, setAmount] = useState("");
  const [type, setType] = useState(0); // Type 0 for Deposit, 1 for Withdrawal

  const { user } = useAuth(); // Assuming you have useAuth to get the user context

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/approveTransfarWithDepositbySubAdmin",
        {
          userId: row.userId,
          referralCode: user.referralCode,
          amount,
          mobile: row.phone,
          type: type,
          email: user.email,
        }
      );
      if (response.status === 200) {
        setMessage(response.data.message);
        console.log(response.data.message);
      setShowToast(true); // Show success toast if the approval is successful
      onHide();
      }
      setMessage(response.data.message);
      setShowToast(true); // Show success toast if the approval is successful
      onHide();
    } catch (error) {
      console.error(error);
      setMessage("Error occurred while approving the transfer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title><h2>Transfer</h2></Modal.Title>
      </Modal.Header>

      <Modal.Body>
        

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Type</th>
              <th>Balance</th>
              <th>Mobile</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr key={row.id}>
              <td>{type === 0 ? "Deposit" : "Withdrawal"}</td>
              <td>{row.balance}</td>
              <td>{row.mobile}</td>
              <td>
                {new Date().toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
            </tr>
          </tbody>
        </Table>

        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Transaction Type:</label>
          <select
            value={type}
            onChange={(e) => setType(parseInt(e.target.value))}
            required
          >
            <option value={0}>Deposit</option>
            <option value={1}>Withdrawal</option>
          </select>
        </div>

        <button onClick={handleApprove} disabled={isLoading}>
          {isLoading ? "Processing..." : "Approve Transfer"}
        </button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>

      {message && <p>{message}</p>}

      {/* Toast Container to show the success message */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          bg="success"
          onClose={() => setShowToast(false)}
          
          delay={1000}
          autohide
          
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Transfer approved successfully!</Toast.Body>

        </Toast>
      </ToastContainer>
    </Modal>
  );
};
