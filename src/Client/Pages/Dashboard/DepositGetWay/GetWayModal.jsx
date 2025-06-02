import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateDepositGatewaytype, updateWithdrawalGatewayType } from "../../../AdminApi/AxiosAPIService";
import { useAuth } from "../../../Component/AuthContext";

export default ({ show, onHide, row,refreshData }) => {

const { isAuthenticated, user, hasRole } = useAuth();
console.log(user);

  const [formData, setFormData] = useState({
    gateway_name: "",
    payment_type: "",
    gateway_number: "",
    is_active: true,
    email: user?.email,
    referralCode: user?.referralCode,
  });

  // Store original values using useRef
  const originalGatewayNumber = useRef("");
  const originalPaymentType = useRef("");
console.log(formData)
  useEffect(() => {
    if (row) {
      setFormData({
        gateway_name: row.gateway_name || "",
        payment_type: row.payment_type || "",
        gateway_number: row.gateway_Number || "",
        is_active: row.is_active ?? true,
        email: user?.email,
        referralCode: user?.referralCode,
      });

      // Save original values
      originalGatewayNumber.current = row.gateway_Number || "";
      originalPaymentType.current = row.payment_type || "";
    }
  }, [row]);
  console.log(formData);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Form Data",formData);
      const response = await updateDepositGatewaytype(formData);
      console.log(response);
      refreshData()
      onHide();
      if (response.data.success) {
        alert("Gateway updated successfully!");
        onHide();
      } else {
        alert("Update failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating gateway");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Payment Gateway</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Gateway Name</Form.Label>
            <Form.Control
              type="text"
              name="gateway_name"
              value={formData.gateway_name}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Payment Type <small className="text-muted">(Previous: {originalPaymentType.current})</small>
            </Form.Label>
            <Form.Select
              name="payment_type"
              value={formData.payment_type}
              onChange={handleChange}
            >
              <option value="">Select A Payment Type</option>
              <option value="Send Money">Send Money</option>
              <option value="Cashout">Cash Out</option>
              <option value="Payment">Payment</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>
              Gateway Number <small className="text-muted">(Previous: {originalGatewayNumber.current})</small>
            </Form.Label>
            <Form.Control
              type="text"
              name="gateway_number"
              value={formData.gateway_number}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Check
              type="switch"
              label="Is Active"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
