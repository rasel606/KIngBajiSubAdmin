import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default ({ show, onHide, row }) => {
  const [formData, setFormData] = useState({
    gateway_name: '',
    payment_type: '',
    gateway_number: '',
    is_active: true,
  });

  useEffect(() => {
    if (gateway) {
      setFormData({
        gateway_name: row.gateway_name || '',
        payment_type: row.payment_type || '',
        gateway_number: row.gateway_number || '',
        is_active:row.is_active ?? true,
      });
    }
  }, [gateway]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await updateWithdrawalGatewayType(row.id, formData);
      if (response.data.success) {
        alert('Gateway updated successfully!');
        onHide();
      } else {
        alert('Update failed!');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating gateway');
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

          <Form.Group className="mt-2">
            <Form.Label>Payment Type</Form.Label>
            <Form.Control
              type="text"
              name="payment_type"
              value={formData.payment_type}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Gateway Number</Form.Label>
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


