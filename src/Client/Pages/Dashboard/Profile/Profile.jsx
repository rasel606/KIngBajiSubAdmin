import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup, Image } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../../Component/AuthContext";
import axios from "axios";
import { Sub_Admin_User_Details } from "../../../AdminApi/AxiosAPIService";


export default  () => {
  const [subAdmin, setSubAdmin] = useState(null);
  const { user } = useAuth();
  // Simulating fetching the data (you can replace this with an actual API call)
  useEffect(() => {
    const email = user.email
    const fetchData = async () => {
      const response = await Sub_Admin_User_Details(email); // Example endpoint

      setSubAdmin(response.data.user);
    };
    fetchData();
  }, []);

  if (!subAdmin) {
    return <div>Loading...</div>; // Loading state while the data is being fetched
  }







  return (

    <div className="my-5"
    style={{
      
      height:"100%",
      width:"100%"
    }}>
      <Container className="d-flex justify-content-center align-items-center " >
      <Row>
        <Col>
          <Card className="my-5"
            style={{background: "transparent", backdropFilter: "blur(5px)", border: "blue", borderRadius: "10px", width: "100%", height: "100%" }}

          >
            <img className="img-fluid my-4 mx-5 d-block" src="https://ik.imagekit.io/fjs420h8f/kingbaji_2025-02-24_at_02.26.56_7859e755-removebg-preview.png?updatedAt=1740595806960" alt="" /> 
            <Card.Body>
            <ListGroup >
                <ListGroup.Item style={{background:"none",color:"white"}}><strong>Name:</strong> {subAdmin.name}</ListGroup.Item>
                <ListGroup.Item style={{background:"none",color:"white"}}><strong>Email:</strong> {subAdmin.email}</ListGroup.Item>
                <ListGroup.Item style={{background:"none",color:"white"}}><strong>Balance:</strong> ${subAdmin.balance}</ListGroup.Item>
                <ListGroup.Item style={{background:"none",color:"white"}}><strong>SubAdmin ID:</strong> {subAdmin.SubAdminId}</ListGroup.Item>
                <ListGroup.Item style={{background:"none",color:"white"}}><strong>Referral Code:</strong> {subAdmin.referralCode}</ListGroup.Item>
                <ListGroup.Item style={{background:"none",color:"white"}}><strong>Phone:</strong> {subAdmin.phone}</ListGroup.Item>
                <ListGroup.Item style={{background:"none",color:"white"}}><strong>Country Code:</strong> {subAdmin.countryCode}</ListGroup.Item>
                <ListGroup.Item style={{background:"none",color:"white"}}><strong>Status:</strong> {subAdmin.IsActive ? "Active" : "Inactive"}</ListGroup.Item>
                <ListGroup.Item style={{background:"none",color:"white"}}>
                  <strong>User Referral Link:</strong> <a href={subAdmin.user_referredLink}>{subAdmin.user_referredLink}</a>
                </ListGroup.Item>
                <ListGroup.Item style={{background:"none",color:"white"}}>
                  <strong>Agent Referral Link:</strong> <a href={subAdmin.agent_referredLink}>{subAdmin.agent_referredLink}</a>
                </ListGroup.Item>
                <ListGroup.Item style={{background:"none",color:"white"}}>
                  <strong>Affiliate Referral Link:</strong> <a href={subAdmin.affiliate_referredLink}>{subAdmin.affiliate_referredLink}</a>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
    </div>
  
  );
};

