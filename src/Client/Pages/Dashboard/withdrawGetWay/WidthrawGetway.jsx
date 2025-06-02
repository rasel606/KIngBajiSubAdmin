import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Form,
  Container,
} from "react-bootstrap";
import axios from "axios";
import { toast } from 'react-toastify';
import MySubAdminWidthrawModal from "./MySubAdminWidthrawGetWayModal"; // Assuming your modal for editing
import {
  UpdateDepositsgatway_list,
  UpdateWidthdrawgatway_list,
  updateWidthrawGatewayStatus,
} from "../../../AdminApi/AxiosAPIService";
import { useAuth } from "../../../Component/AuthContext";
import WidthrawGetWayModal from "./WidthrawGetWayModal";
import { FaPlus, FaEdit, FaToggleOn, FaToggleOff } from "react-icons/fa";
export default () => {
  const { isAuthenticated, user, hasRole } = useAuth();

  const [gateways, setGateways] = useState([]);
  const [gatewayCount, setGatewaysCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [showWidthrawGetWay, setShowWidthrawGetWay] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Assuming 'user_role' and 'email' are stored in state or context
  console.log(user.user_role, user.email, user.referralCode);
  const data = {
    email: user?.email,
    referralCode: user?.referralCode,
  };

  // Fetch gateway list from backend on component mount
  const fetchGateways = async () => {
    setLoading(true);
    setError(null);
    console.log(user.email, user.referralCode);
    try {
      const response = await UpdateWidthdrawgatway_list(data);
      setGateways(response.data.gateways);
      setGatewaysCount(response.data.gatewayCount);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching gateways:", error);
      setError("Failed to load gateways. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGateways();
  }, []);

  // Toggle active status of gateway
  const toggleActiveStatus = async (gateway_name, currentStatus) => {
    const newStatus = !currentStatus;

    try {
      await updateWidthrawGatewayStatus({
        gateway_name,
        is_active: newStatus,
        email: user?.email,
        referralCode: user?.referralCode,
      });

      const updatedGateways = gateways.map((gateway) => {
        if (gateway.gateway_name === gateway_name) {
          return { ...gateway, is_active: newStatus };
        }
        return gateway;
      });
fetchGateways()
      setGateways(updatedGateways);

      toast.success("Status updated successfully!");
    } catch (error) {
      toast.error("Update failed!");
      console.error("Failed to update status:", error);
      console.log(error);
    }
  };

  const formatTime = (timeObj) => {
    if (!timeObj) return "-";
    const hours = String(timeObj.hours).padStart(2, "0");
    const minutes = String(timeObj.minutes).padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  // Open modal to edit gateway
  const handleEditModal = (gatewayData) => {
    setModalData(gatewayData);
    setShowModal(true);
  };

  const getStatusBadge = (isActive) => {
    return isActive ? (
      <span className="badge bg-success">Active</span>
    ) : (
      <span className="badge bg-danger">Inactive</span>
    );
  };

  const columns = [
    { key: "serial", label: "Serial", className: "text-center" },
    { key: "email", label: "Email", className: "text-center" },
    {
      key: "gateway_Number",
      label: "Gateway Number",
      className: "text-center",
    },
    { key: "gateway_name", label: "Gateway Name", className: "text-center" },
    { key: "is_active", label: "Status", className: "text-center" },
    { key: "payment_type", label: "Payment Type", className: "text-center" },
    { key: "referredBy", label: "Referred By", className: "text-center" },
    { key: "start_time", label: "Start Time", className: "text-center" },
    { key: "end_time", label: "End Time", className: "text-center" },
    { key: "image_url", label: "Image", className: "text-center" },
    { key: "updatetime", label: "Updated", className: "text-center" },
    { key: "timestamp", label: "Created", className: "text-center" },
    { key: "actions", label: "Actions", className: "text-center" },
  ];

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <Container fluid className="py-3" style={{ minHeight: "100vh" }}>
      <Card className="mb-4 shadow-sm border-0">
        <Card.Header className="bg-primary text-white">
          <Row className="align-items-center">
            <Col md={6}>
              <h5 className="mb-0">Payment Gateways Management</h5>
            </Col>
            {/* <Col md={6} className="text-end">
              <Button variant="light" onClick={() => setShowModal(true)}>
                <FaPlus className="me-2" />
                Add Payment Gateway
              </Button>
            </Col> */}
          </Row>
        </Card.Header>
        <Card.Body>
          {error && (
            <div className="alert alert-danger" >
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : gateways.length === 0 ? (
            <div className="text-center py-5">
              <h4>No gateways found</h4>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                <FaPlus className="me-2" />
                Add Your First Gateway
              </Button>
            </div>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover className="mb-0">
                <thead className="table-dark">
                  <tr>
                    {columns.map((column) => (
                      <th key={column.key} className={column.className}>
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gateways.map((row, index) => (
                    <tr key={index} className="align-middle">
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{row.email || "-"}</td>
                      <td className="text-center">
                        {row.gateway_Number || "-"}
                      </td>
                      <td className="text-center fw-bold">
                        {row.gateway_name || "-"}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center align-items-center">
                          <Form.Check
                            type="switch"
                            id={`switch-${row.gateway_name}`}
                            checked={row.is_active === true}
                            onChange={() =>
                              toggleActiveStatus(
                                row.gateway_name,
                                row.is_active
                              )
                            }
                            className="me-2"
                          />
                          {getStatusBadge(row.is_active)}
                        </div>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-info text-dark">
                          {row.payment_type || "-"}
                        </span>
                      </td>
                      <td className="text-center">{row.referredBy || "-"}</td>
                      <td className="text-center">
                        {formatTime(row.start_time)}
                      </td>
                      <td className="text-center">
                        {formatTime(row.end_time)}
                      </td>
                      <td className="text-center">
                        {row.image_url ? (
                          <img
                            src={row.image_url}
                            alt={row.gateway_name}
                            className="img-thumbnail gateway-image"
                            style={{ maxWidth: "50px", height: "auto" }}
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="text-center">{row.updatetime || "-"}</td>
                      <td className="text-center">{row.timestamp || "-"}</td>
                      <td className="text-center">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => setShowWidthrawGetWay(row)}
                          title="Edit"
                        >
                          <FaEdit />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
          {gateways.length > 0 && (
            <div className="mt-3 text-end">
              <span className="badge bg-secondary p-2">
                Total Gateways: {gatewayCount}
              </span>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* {showModal&& (
        <MySubAdminWidthrawModal
          show={showModal}
          handleClose={handleCloseModal}
          gatewayData={modalData}
        />
      )} */}
      {showWidthrawGetWay && (
        <WidthrawGetWayModal
          show={!!showWidthrawGetWay}
          onHide={() => setShowWidthrawGetWay(null)}
          row={showWidthrawGetWay}
          refreshData={fetchGateways}
        />
      )}
    </Container>
  );
};
