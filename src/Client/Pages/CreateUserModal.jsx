import React, { useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Modal,
  Dropdown,
  Container,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useAuth } from "../Component/AuthContext";
import { useLocation } from "react-router-dom";
import { CreateUserNormal } from "../AdminApi/AxiosAPIService";
import Clipboard from 'clipboard';

import { toast } from 'react-toastify';

export default ({ show, setShow }) => {
  const { isAuthenticated, user } = useAuth();

  const currencies = [
    { Id: "Option 1", Currency: "BDT", code: "+880", flag: "BD" },
  
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [selectedCountry, setSelectedCountry] = useState(currencies[0]?.code);
  const [phoneNumber, setPhoneNumber] = useState();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorNum, setErrorNum] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    phone: "",
    countryCode: selectedCountry,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    referredBy: user?.referralCode
  });
  // const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUsername = (e) => {
    const value = e.target.value;
    if (value.length < 4) {
      setError("UserName minimum length is 4");
    } else if (value.length > 12) {
      setError("UserName maximum length is 12");
    } else {
      setError(""); // Clear message when valid
    }
    setUserId(value);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow numbers
    if (value.length > 11) {
      setErrorNum("Phone number must be 11 digits.");
    }
    setPhoneNumber(validateInput(value));
  };

  const validateInput = (value) => {
    if (value.length < 10 || value.length > 11) {
      setErrorNum("Phone Number Invalid");
    } else {
      setErrorNum(""); // Clear message when valid
    }
    return value;
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {


   
    try {
      
      
      console.log(userId, password, selectedCountry, phoneNumber);


      const data = { ...formData };
      
      const response = await CreateUserNormal(data);
      console.log(data);
  if (response.status === 201) {
    console.log("Signup successful!");
    toast.success(response.data.message || "Signup successful!");
    setShow(false);
  }

    } catch (error) {
     toast.error(error.data.message || "Signup Field!");
     setShow(false);
    }
  };
  const invitationCode = `${user?.referralCode}`;
  const invitationUrl = `https://kingbaji.live/?ref=${user?.referralCode}`;

console.log(user);
console.log(user?.referralCode);
console.log(invitationUrl);
  // const copyToClipboard = () => {
  //   if (!invitationUrl.length) {
  //     console.error("No referral link available to copy");
  //     return;
  //   }
  
  //   const clipboard = new Clipboard('.btn-copy', {
  //     text: () => invitationUrl
  //   });
  
  //   clipboard.on('success', () => {
  //     setCopied(true);
  //     setTimeout(() => setCopied(false), 1000);
  //   });
  
  //   clipboard.on('error', (err) => {
  //     console.error("Clipboard copy failed:", err);
  //   });
  // };

    const copyToClipboard = () => {
    navigator.clipboard.writeText(invitationUrl);
    toast.success("Invitation code copied!");
    // alert('Invitation code copied!');
  };
  
  

  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={toastVariant}
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
        >
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Signup</Modal.Title>

          <Button
          variant="primary"
          className="mx-4"
          onClick={() => copyToClipboard()}
        >
          {copied ? "Link Copied!" : "Copy Link"}
        </Button>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            {step === 1 && (
              <>
               <div>
              <InputGroup className="mb-3">
                <Form.Label>Choose Currency</Form.Label>
                <div className="currency-wrap">
                  <div className="currency-area-code">
                    <Button
                      variant="outline-secondary"
                      onClick={() => setSelectedCurrency(currencies[0])}
                    >
                      {formData.currencyType}
                    </Button>
                  </div>
                </div>
              </InputGroup>

              <InputGroup className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  placeholder="4-15 characters, no spaces"
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="password-field">
                  <Form.Control
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="6-20 characters"
                  />
                  <Button variant="link" onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? "Hide" : "Show"}
                  </Button>
                </div>
              </InputGroup>

              <InputGroup className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </InputGroup>
            </div>
            <InputGroup className="mb-3">
                <Form.Label>Choose Currency</Form.Label>
                <div className="currency-wrap">
                  <div className="currency-area-code">
                    <Button
                      variant="outline-secondary"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <span>{formData.currencyType}</span>
                    </Button>
                    {isOpen && (
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => setFormData({ ...formData, currencyType: "BDT" })}
                        >
                          USD
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setFormData({ ...formData, currencyType: "INR" })}
                        >
                          EUR
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    )}
                  </div>
                </div>
              </InputGroup>
              </>
              
            )}

            {step === 2 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="dateOfBirth">
                <Form.Label>
                  Date of Birth <abbr title="Required">*</abbr>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          {step > 1 && (
            <Button variant="secondary" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {step < 2 ? (
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="success" onClick={handleSubmit}>
              Sign Up
            </Button>
          )}
          <Button variant="light" onClick={() => setShow(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
