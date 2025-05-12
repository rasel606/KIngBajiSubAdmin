import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../../../Component/AuthContext";

export default ({ row, show, onHide }) => {
  const { user } = useAuth();
  const [error, setError] = useState("");
console.log(row);
  if (!row) return null;

  const { userId, amount, base_amount, Mobile, gateway_name, transactionID, status, datetime } = row;
  const isPending = Number(status) === 0;

  const NewHeaders = {
    "Amount + 3%": amount,
    "Base Amount": base_amount,
    "Mobile": Mobile,
    "Gateway Name": gateway_name,
    
  };

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
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
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
