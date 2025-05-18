import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Table, Form } from "react-bootstrap";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import MySubAdminGetWayModal from "./MySubAdminGetWayModal"; // Assuming your modal for editing
import GatWayModal from "./GetWayModal"; // Assuming your modal for editing
import { updateDepositGatewayStatus, UpdateDepositsgatway_list } from "../../../AdminApi/AxiosAPIService";
import { useAuth } from "../../../Component/AuthContext";
export default () => {
  const { isAuthenticated, user, hasRole } = useAuth();

  const [gateways, setGateways] = useState([]);
  const [gatewayCount, setGatewaysCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [showUpdateGateWay, setShowUpdateGateWay] = useState(null);

  // Assuming 'user_role' and 'email' are stored in state or context
  console.log(user.user_role, user.email, user.referralCode);
  const data = {
    email: user?.email,
    referralCode: user?.referralCode,
  };
  useEffect(() => {
    // Fetch gateway list from backend on component mount
    const fetchGateways = async () => {
      console.log(user.email, user.referralCode);
      try {
        const response = await UpdateDepositsgatway_list(data);
        setGateways(response.data.gateways);
        setGatewaysCount(response.data.gatewayCount);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching gateways:", error);
      }
    };
    fetchGateways();
  }, []);

  // Toggle active status of gateway
 const toggleActiveStatus = async (gateway_name, currentStatus) => {
  const newStatus = !currentStatus;

  try {
    await updateDepositGatewayStatus({ gateway_name, is_active: newStatus, email: user?.email, referralCode: user?.referralCode });

    const updatedGateways = gateways.map((gateway) => {
      if (gateway.gateway_name === gateway_name) {
        return { ...gateway, is_active: newStatus };
      }
      return gateway;
    });

    setGateways(updatedGateways);
  } catch (error) {
    console.error("Failed to update status:", error);
    console.log(error);
  }
};

  const formatTime = (timeObj) => {
    return `${timeObj.hours}:${timeObj.minutes}`;
  };
  // Open modal to edit gateway
  const handleEditModal = (gatewayData) => {
    setModalData(gatewayData);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <div>
      <Card body className="mx-3" style={{ background: "#38094d" }}>
        <Row className="my-3">
          <Col md={6}>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <FaPlus /> Add Payment Gateway
            </Button>
          </Col>
        </Row>
      </Card>

      <div className="m-3">
        <Card body>
          <Table responsive striped bordered hover style={{}}>
            <thead>
              <tr>
                <th className="text-center" style={{ color: "#38094d" }}>
                  Serial
                </th>
                <th className="text-center" style={{ color: "#38094d" }}>
                  Email
                </th>
                <th className="text-center" style={{ color: "#38094d" }}>
                  Gateway Number
                </th>
                <th className="text-center" style={{ color: "#38094d" }}>
                  Gateway Name
                </th>
                <th className="text-center" style={{ color: "#38094d" }}>
                  Active Status
                </th>
                <th className="text-center" style={{ color: "#38094d" }}>
                  Payment Type
                </th>
                <th className="text-center" style={{ color: "#38094d" }}>
                  Referred By Code
                </th>
                <th className="text-center" style={{ color: "#38094d" }}>
                  Start Time
                </th>
                <th className="text-center" style={{ color: "#38094d" }}>
                  End Time
                </th>
                <th className="text-center" style={{ color: "#38094d" }}>
                  image
                </th>

                <th className="text-center" style={{ color: "#38094d" }}>
                  Update Time
                </th>
                <th className="text-center" style={{ color: "#38094d" }}>
                  Timestamp
                </th>
              </tr>
            </thead>

            <tbody>
              {gateways ? (
                gateways?.map((row, index) => (
                  <tr
                    className="text-center"
                    key={index}
                    style={{ color: "#000" }}
                  >
                    <td>{index + 1}</td>
                    <td>{row.email || "-"}</td>
                    <td>{row.gateway_Number || "-"}</td>
                    <td>{row.gateway_name || "-"}</td>
                    <td>
                      <Form.Check
                        type="switch"
                        checked={row.is_active === true}
                        onChange={() =>
                          toggleActiveStatus(row.gateway_name, row.is_active)
                        }
                      />
                    </td>
                    <td>{row.payment_type || "-"}</td>
                    <td>{row.referredBy || "-"}</td>
                    <td>{row.start_time ? formatTime(row.start_time) : "-"}</td>
                    <td>{row.end_time ? formatTime(row.end_time) : "-"}</td>
                    <td>
                      {" "}
                      <img
                        src={row.image_url}
                        alt="Gateway"
                        width="50"
                        height="50"
                      />{" "}
                    </td>

                    <td>{row.updatetime || "-"}</td>
                    <td>{row.timestamp || "-"}</td>
                    <td><Button className="btn border border-1 mx-2" onClick={() => setShowUpdateGateWay(row)}>
                                                      <i className="fa-solid fa-pen-to-square"></i>
                                                    </Button></td>
                  </tr>
                ))
              ) : (
                <h1 className="text-center">No Data Found</h1>
              )}
            </tbody>
          </Table>
          <p>Total Gateways: {gatewayCount}</p>
        </Card>
      </div>

      {showModal && (
        <MySubAdminGetWayModal
          show={showModal}
          handleClose={handleCloseModal}
          gatewayData={modalData}
        />
      )}
      {showUpdateGateWay && (
        <GatWayModal
          show={!!showUpdateGateWay}
          onHide={() => setShowUpdateGateWay(null)}
          row={showUpdateGateWay}
        />
      )}



    </div>
  );
};
