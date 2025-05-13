import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useAuth } from "../../../Component/AuthContext";
import { UpdategetWay_list } from "../../../AdminApi/AxiosAPIService";
import axios from "axios";

const AddPaymentMethodModal = ({ show, handleClose }) => {
  const { user } = useAuth();

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState(() => ({
    user_role: user?.user_role,
    email: user?.email,
    referralCode: user?.referralCode,
    gateway_Number: "",
    gateway_name: "",
    // type: "",
    payment_type: "",
    image_url: image,
    minimun_amount: "",
    maximun_amount: "",
    start_time: { hours: 0, minutes: 0 },
    end_time: { hours: 23, minutes: 59 },
  }));
  console.log(formData);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleNameChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTimeChange = (e, field, key) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [key]: parseInt(e.target.value) },
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const YOUR_IMAGEBB_API_KEY = "b3b440a6c86bd83f5a33cec74c297a9f";
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${YOUR_IMAGEBB_API_KEY}`,
        formData
      );
      setFormData((prev) => ({ ...prev, image_url: response.data.data.url }));
      alert("Image uploaded successfully!");
      console.log(response.data.data.url);
    } catch (error) {
      alert("Image upload failed!");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await UpdategetWay_list(formData);
      alert(response.data.message);
      handleClose();
    } catch (error) {
      alert("Error adding payment method.");
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Payment Type</Form.Label>
            <Form.Select
              name="gateway_name"
              value={formData.gateway_name}
              onChange={handleNameChange}
            >
              <option value="Bkash">Select A Gateway </option>
              <option value="Bkash">Bkash </option>
              <option value="Nagad">Nagad </option>
              <option value="Rocket">Rocket </option>
              <option value="Upay">Upay </option>
            </Form.Select>
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Label>Gateway Name</Form.Label>
            <Form.Control
              type="text"
              name="gateway_name"
              value={formData.gateway_name}
              onChange={handleChange}
              required
            />
          </Form.Group> */}

          {/* <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="type"
              value={formData.payment_type}
              onChange={handleChange}
            >
              <option value="0">Deposit</option>
              <option value="1">widthraw</option>
              <option value="2">Adjustment</option>
            </Form.Select>
          </Form.Group> */}

          <Form.Group className="mb-3">
            <Form.Label>Payment Type</Form.Label>
            <Form.Select
              name="payment_type"
              value={formData.payment_type}
              onChange={handleChange}
            >
              <option value="Bkash">Select A Payment Type </option>
              <option value="Send Money">Send Money</option>
              <option value="Cashout">Cash Out</option>
              <option value="Payment">Payment</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Getway Number</Form.Label>
            <Form.Control
              type="numaric"
              name="gateway_Number"
              value={formData.gateway_Number}
              onChange={handleChange}
              placeholder="number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Getway Minimun Amount</Form.Label>
            <Form.Control
              type="number"
              name="minimun_amount"
              value={formData.minimun_amount}
              onChange={handleChange}
              placeholder="Minimum amount"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Getway Maximun Amount</Form.Label>
            <Form.Control
              type="number"
              name="maximun_amount"
              value={formData.maximun_amount}
              onChange={handleChange}
              placeholder="Maximum amount"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            {uploading && <p>Uploading...</p>}
            {formData.image_url && (
              <img src={formData.image_url} alt="Uploaded" width="100" />
            )}
          </Form.Group>
          <Row className="mb-3">
            <Col>
              <Form.Label>Start Time</Form.Label>
              <Row>
                <Col>
                  <Form.Select
                    onChange={(e) => handleTimeChange(e, "start_time", "hours")}
                    value={formData.start_time.hours}
                  >
                    {[...Array(24).keys()].map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}h
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select
                    onChange={(e) =>
                      handleTimeChange(e, "start_time", "minutes")
                    }
                    value={formData.start_time.minutes}
                  >
                    {[...Array(60).keys()].map((minute) => (
                      <option key={minute} value={minute}>
                        {minute}m
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Col>

            <Col>
              <Form.Label>End Time</Form.Label>
              <Row>
                <Col>
                  <Form.Select
                    onChange={(e) => handleTimeChange(e, "end_time", "hours")}
                    value={formData.end_time.hours}
                  >
                    {[...Array(24).keys()].map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}h
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select
                    onChange={(e) => handleTimeChange(e, "end_time", "minutes")}
                    value={formData.end_time.minutes}
                  >
                    {[...Array(60).keys()].map((minute) => (
                      <option key={minute} value={minute}>
                        {minute}m
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Add Payment Method
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPaymentMethodModal;
