import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import {
  getSocialLinks,
  updateAndcreateSocialLinks,
} from "../../AdminApi/AxiosAPIService";

export default () => {
  const [links, setLinks] = useState({
    telegram: "",
    facebook: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await getSocialLinks();
        setLinks(response.data || {});
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };
    fetchLinks();
  }, []);

  const handleUpdate = async (field) => {
    try {
      const response = await updateAndcreateSocialLinks({
        [field]: links[field],
      });
      setLinks((prev) => ({ ...prev, ...response.data }));
      setVariant("success");
      setMessage(
        `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } updated successfully.`
      );
    } catch (error) {
      setVariant("danger");
      setMessage(error.response?.data?.message || `Error updating ${field}`);
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <Container className="my-4" style={{height:"100vh"}}>
      <h3 className="mb-4">Manage Social Links</h3>

      {message && <Alert variant={variant}>{message}</Alert>}

      <Form>
        {/* Telegram */}
        <Form.Group as={Row} className="mb-3 text-white" controlId="formTelegram">
          <Form.Label column sm={3}>
            Telegram Channel
          </Form.Label>
          <Col sm={7} >
            <Form.Control
              type="url"
              placeholder="https://t.me/yourchannel"
              value={links.telegram || ""}
              onChange={(e) => setLinks({ ...links, telegram: e.target.value })}
            />
          </Col>
          <Col sm={2}>
            <Button variant="primary" onClick={() => handleUpdate("telegram")}>
              Update
            </Button>
          </Col>
        </Form.Group>

        {/* Facebook */}
        <Form.Group as={Row} className="mb-3 text-white" controlId="formFacebook">
          <Form.Label column sm={3}>
            Facebook Messenger
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              type="url"
              placeholder="https://m.me/yourpage"
              value={links.facebook || ""}
              onChange={(e) => setLinks({ ...links, facebook: e.target.value })}
            />
          </Col>
          <Col sm={2}>
            <Button variant="primary" onClick={() => handleUpdate("facebook")}>
              Update
            </Button>
          </Col>
        </Form.Group>

        {/* Email */}
        <Form.Group as={Row} className="mb-3 text-white" controlId="formEmail">
          <Form.Label column sm={3}>
            Support Email
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              type="email"
              placeholder="support@example.com"
              value={links.email || ""}
              onChange={(e) => setLinks({ ...links, email: e.target.value })}
            />
          </Col>
          <Col sm={2}>
            <Button variant="primary" onClick={() => handleUpdate("email")}>
              Update
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};
