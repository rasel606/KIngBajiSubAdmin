import React, { Fragment, useRef, useState } from "react";
import {
  Accordion,
  Button,
  Container,
  Form,
  InputGroup,
  Modal,
  Navbar,
} from "react-bootstrap";
import { useAuth } from "../Component/AuthContext";
export default ({ show, setShow }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    // confirmPassword: '',
    currencyType: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    callingCode: "",
    phone: "",
    email: "",
    contactType: "",
    contactTypeValue: "",
    // referralByCode: '',
    captcha: "",
  });


   const { isAuthenticated, user } = useAuth();
    const [copied, setCopied] = useState(false);
  
    // console.log(user.referredCode);
  
      const copyToClipboard = () => {
    navigator.clipboard.writeText(user.affiliate_referredsLink);
    alert('Invitation code copied!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    try {
      console.log(formData);
      // const result = await register(formData);
      // console.log(result);
      // setSuccessMessage(result.data.message);
      // setErrorMessage('');
    } catch (error) {
      // setErrorMessage(error.result?.data?.message || 'An error occurred');
      // setSuccessMessage('');
    }
  };
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Affiliate</Modal.Title>
        <Button
          variant="primary"
          className="mx-4"
          value={user?.user_referredLink}
          onClick={copyToClipboard}
        >
          CopyLink
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          {step === 1 && (
            <div>
              <Form.Group controlId="userId">
                <Form.Label>
                  Username <abbr title="Required">*</abbr>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  placeholder="6-18 characters or numbers"
                  required
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>
                  Password <abbr title="Required">*</abbr>
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="6-20 characters or numbers"
                  required
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>
                  Confirm Password <abbr title="Required">*</abbr>
                </Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="currencyType">
                <Form.Label>
                  Currency <abbr title="Required">*</abbr>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="currencyType"
                  value={formData.currencyType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Currency</option>
                  <option value="7">INR - INR</option>
                  <option value="8">BDT - BDT</option>
                  <option value="17">PKR - PKR</option>
                  <option value="15">USDT - USDT</option>
                  <option value="24">NPR - NPR</option>
                  <option value="23">LKR - LKR</option>
                  <option value="26">AED - AED</option>
                </Form.Control>
              </Form.Group>
            </div>
          )}

          {step === 2 && (
            <div>
              <Form.Group controlId="firstName">
                <Form.Label>
                  First Name <abbr title="Required">*</abbr>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label>
                  Last Name <abbr title="Required">*</abbr>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          )}

          {step === 3 && (
            <div>
              <Form.Group controlId="phone">
                <Form.Label>
                  Phone <abbr title="Required">*</abbr>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    as="select"
                    name="callingCode"
                    value={formData.callingCode}
                    onChange={handleChange}
                    required
                    style={{ width: "auto" }}
                  >
                    <option value="+1">+880</option>
                    
                  </Form.Control>
                  <Form.Control
                    style={{ width: "auto" }}
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>
                  Email <abbr title="Required">*</abbr>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="contactType">
                <Form.Label>Others</Form.Label>
                <Form.Control
                  as="select"
                  name="contactType"
                  value={formData.contactType}
                  onChange={handleChange}
                >
                  <option value="">Select Contact</option>
                  <option value="4">QQ</option>
                  <option value="8">Wechat</option>
                  <option value="16">Skype</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="referralCode">
                <Form.Label>Referral Code</Form.Label>
                <Form.Control
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* <Form.Group controlId="captcha">
                                <Form.Label>Verification Code <abbr title="Required">*</abbr></Form.Label>
                                <img className="img-validation" src="/captcha/af" alt="captcha" />
                                <Button
                                    variant="link"
                                    onClick={() => document.querySelector('.img-validation').src = '/captcha/af?' + Math.random()}
                                >
                                    <span className="ic-refresh"></span>
                                </Button>
                                <Form.Control
                                    type="number"
                                    name="captcha"
                                    value={formData.captcha}
                                    onChange={handleChange}
                                    required
                                />
                            // </Form.Group> */}
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {step > 1 && (
          <Button variant="secondary" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {step < 3 && (
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        )}
        {step === 3 && (
          <Button variant="primary" onClick={handleSubmit}>
            Sign Up
          </Button>
        )}
        <Button variant="light" onClick={() => {}}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
