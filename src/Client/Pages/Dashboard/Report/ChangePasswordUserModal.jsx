import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../../../Component/AuthContext";
import { changePasswordUserByAdmin } from "../../../AdminApi/AxiosAPIService";

export default ({ row, show, onHide }) => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
    const [loadingVerify, setLoadingVerify] = useState(false);
console.log(row);
  if (!row) return null;

  const { userId, amount, base_amount, Mobile, gateway_name, transactionID, status, datetime } = row;



    const handlechangePasswordAdmin = async (userId,password) => {
      console.log(userId,password);
      setLoadingVerify(true);
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        setLoadingVerify(false);
        return;
      }
      try {
        const response = await changePasswordUserByAdmin({ newPassword:password, userId });
  console.log(response.data.message);
        if (response) {
          alert(response.data.message);
          onHide();
          setLoadingVerify(false);
        } else {
          
          alert(response.error);
          onHide();
          setLoadingVerify(false);
        }
      } catch (error) {
        console.error('Verification failed:', error);
        onHide();
        setLoadingVerify(false);
      }
    };

 

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Password change</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group className="mb-3" >
              <Form.Label>New Password</Form.Label>
              <Form.Control type="text" value={password}   onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
          
        </Form>
        {error && <div className="text-danger">{error}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={()=>handlechangePasswordAdmin(row.userId,password)}>
        {loadingVerify ? 'Saved...' : 'Saved'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
