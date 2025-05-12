// components/ForgotPassword.jsx
import { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://kgco.kingbaji.live/v1/api/subadmin_forgot-password', { email });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper" style={{
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
        <h2>Forgot Password</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </Form>

        </Card>
        </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;