import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../AdminApi/AxiosAPIService";
import { useAuth } from "../Component/AuthContext";

export default () => {
  const { isAuthenticated, user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // navigate("/dashboard");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await login({
        email,
        password,
      });

      if (response.data.success === true) {
        navigate("/"); // Redirect to the dashboard or homepage
      }

      // Optionally save user data in state/context if needed
      // setUser(response.data.user);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div 
    style={{
      backgroundImage: `url(${`https://ik.imagekit.io/fjs420h8f/WhatsApp%20Image%202025-02-26%20at%2022.48.56_a42eedca.jpg?updatedAt=1740595143122`})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height:"100%",
      width:"100%"
    }}>
      <Container className="d-flex justify-content-center align-items-center vh-100 " >
      <Row>
        <Col>
          <Card
            style={{background: "transparent", backdropFilter: "blur(1.5px)", border: "blue", borderRadius: "10px", width: "400px", height: "400px" }}

          >
            <img className="img-fluid my-4 mx-5 d-block" src="https://ik.imagekit.io/fjs420h8f/kingbaji_2025-02-24_at_02.26.56_7859e755-removebg-preview.png?updatedAt=1740595806960" alt="" /> 
            <Container>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <h2 className="text-center mb-4 text-white">Login</h2>

              <Form onSubmit={handleSubmit} >
                {error && <div className="alert alert-danger">{error}</div>}
                <Form.Group controlId="formEmail">
                  <Form.Label className="text-white">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword " className="mb-4">
                  <Form.Label className="text-white">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>

                <p>ForgotPassword ? <Link  to="/forgot_password">ForgotPassword</Link></p>
              </Form>
            </Card.Body>
            </Container>
          </Card>
        </Col>
      </Row>
      </Container>
    </div>
  );
};
