import React, { useState, useEffect } from "react";
import { 
  Card, 
  Form, 
  Button, 
  Row, 
  Col, 
  Table, 
  Modal, 
  Badge,
  Spinner,
  Alert
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import { 
  searchDepositTransactions,
  UpdateDeposits_listStutas 
} from "../../../AdminApi/AxiosAPIService";
import { useAuth } from "../../../Component/AuthContext";
import "react-datepicker/dist/react-datepicker.css";

export default  () => {
  // Authentication and user context
  const { user } = useAuth();
  const referralCode = user?.referralCode || "";

  // State management
  const [deposits, setDeposits] = useState([]);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filtersCollapsed, setFiltersCollapsed] = useState(true);

  // Filter state
  const [filters, setFilters] = useState({
    userId: "",
    amount: "",
    gateway_name: "",
    status: "",
    startDate: null,
    endDate: null
  });

  // Table headers
  const headers = [
    "#",
    "Amount",
    "Base Amount",
    "Bonus",
    "Gateway",
    "Transaction ID",
    "Status",
    "User ID",
    "Date",
    "Actions"
  ];

  // Fetch deposits with current filters
  const fetchDeposits = async () => {
    setLoading(true);
    setError("");
    try {
      const { userId, amount, gateway_name, status, startDate, endDate } = filters;
      
      const params = {
        userId,
        amount,
        gateway_name,
        status,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        referredBy: referralCode
      };

      const response = await searchDepositTransactions(params);
      setDeposits(response.data.transactions);
      setTotalDeposits(response.data.total.total);
    } catch (err) {
      setError("Failed to fetch deposits. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deposit status update
  const handleStatusUpdate = async (transactionID, userId, status) => {
    setLoading(true);
    try {
      const response = await UpdateDeposits_listStutas(
        transactionID, 
        userId, 
        status, 
        referralCode
      );
      
      toast.success(response.data.message || "Status updated successfully!");
      
      // Update local state to remove the updated deposit
      setDeposits(prev => prev.filter(deposit => 
        deposit.transactionID !== transactionID
      ));
      
      // Update total if needed
      if (status === 1) { // Approved
        setTotalDeposits(prev => prev - selectedDeposit?.amount);
      }
      
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchDeposits();
  }, []);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const variants = {
      0: { text: "Pending", variant: "warning" },
      1: { text: "Approved", variant: "success" },
      2: { text: "Rejected", variant: "danger" }
    };
    
    const { text, variant } = variants[status] || { text: "Unknown", variant: "secondary" };
    
    return <Badge bg={variant}>{text}</Badge>;
  };

  return (
    <div className="container-fluid px-3 py-4">
      {/* Filters Card */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Deposit Filters</h5>
          <Button 
            variant="link" 
            className="text-white p-0"
            onClick={() => setFiltersCollapsed(!filtersCollapsed)}
          >
            <i className={`fas fa-${filtersCollapsed ? "plus" : "minus"}`} />
          </Button>
        </Card.Header>
        
        <Card.Body className={filtersCollapsed ? "d-none d-md-block" : ""}>
          <Row className="g-3">
            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  value={filters.userId}
                  onChange={(e) => setFilters({...filters, userId: e.target.value})}
                  placeholder="Enter user ID"
                />
              </Form.Group>
            </Col>
            
            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label>Gateway</Form.Label>
                <Form.Control
                  type="text"
                  value={filters.gateway_name}
                  onChange={(e) => setFilters({...filters, gateway_name: e.target.value})}
                  placeholder="Payment gateway"
                />
              </Form.Group>
            </Col>
            
            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <DatePicker
                  selected={filters.startDate}
                  onChange={(date) => setFilters({...filters, startDate: date})}
                  className="form-control"
                  selectsStart
                  startDate={filters.startDate}
                  endDate={filters.endDate}
                />
              </Form.Group>
            </Col>
            
            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <DatePicker
                  selected={filters.endDate}
                  onChange={(date) => setFilters({...filters, endDate: date})}
                  className="form-control"
                  selectsEnd
                  startDate={filters.startDate}
                  endDate={filters.endDate}
                  minDate={filters.startDate}
                />
              </Form.Group>
            </Col>
            
            <Col xs={12} className="d-flex justify-content-end gap-2">
              <Button 
                variant="outline-secondary" 
                onClick={() => setFilters({
                  userId: "",
                  amount: "",
                  gateway_name: "",
                  status: "",
                  startDate: null,
                  endDate: null
                })}
              >
                Reset
              </Button>
              <Button 
                variant="primary" 
                onClick={fetchDeposits}
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      {/* Summary Card */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body className="py-3">
          <Row className="align-items-center">
            <Col md={6}>
              <h5 className="mb-0">Deposit Summary</h5>
            </Col>
            <Col md={6} className="text-md-end">
              <h4 className="mb-0 text-primary">
                Total: ${totalDeposits.toLocaleString()}
              </h4>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      {/* Deposits Table */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          {error && (
            <Alert variant="danger" className="m-3">
              {error}
            </Alert>
          )}
          
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading deposits...</p>
            </div>
          ) : deposits.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-wallet fa-3x text-muted mb-3" />
              <h5>No deposits found</h5>
              <p className="text-muted">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    {headers.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deposits.map((deposit, index) => (
                    <tr key={deposit.transactionID}>
                      <td>{index + 1}</td>
                      <td>${deposit.amount}</td>
                      <td>${deposit.base_amount}</td>
                      <td>${deposit.bonus_amount || "0"}</td>
                      <td>{deposit.gateway_name}</td>
                      <td className="text-monospace">{deposit.transactionID}</td>
                      <td>
                        <StatusBadge status={deposit.status} />
                      </td>
                      <td>{deposit.userId}</td>
                      <td>{new Date(deposit.datetime).toLocaleString()}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => {
                            setSelectedDeposit(deposit);
                            setShowModal(true);
                          }}
                        >
                          <i className="fas fa-edit" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
      
      {/* Deposit Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Deposit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDeposit && (
            <div className="row g-3">
              <div className="col-md-6">
                <p className="mb-1 text-muted">Transaction ID</p>
                <p className="fw-bold">{selectedDeposit.transactionID}</p>
              </div>
              <div className="col-md-6">
                <p className="mb-1 text-muted">User ID</p>
                <p className="fw-bold">{selectedDeposit.userId}</p>
              </div>
              <div className="col-md-6">
                <p className="mb-1 text-muted">Amount</p>
                <p className="fw-bold">${selectedDeposit.amount}</p>
              </div>
              <div className="col-md-6">
                <p className="mb-1 text-muted">Base Amount</p>
                <p className="fw-bold">${selectedDeposit.base_amount}</p>
              </div>
              <div className="col-md-6">
                <p className="mb-1 text-muted">Gateway</p>
                <p className="fw-bold">{selectedDeposit.gateway_name}</p>
              </div>
              <div className="col-md-6">
                <p className="mb-1 text-muted">Mobile</p>
                <p className="fw-bold">{selectedDeposit.mobile}</p>
              </div>
              <div className="col-md-6">
                <p className="mb-1 text-muted">Status</p>
                <p className="fw-bold">
                  <StatusBadge status={selectedDeposit.status} />
                </p>
              </div>
              <div className="col-md-6">
                <p className="mb-1 text-muted">Date</p>
                <p className="fw-bold">
                  {new Date(selectedDeposit.datetime).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedDeposit?.status === 0 && (
            <>
              <Button
                variant="success"
                onClick={() => handleStatusUpdate(
                  selectedDeposit.transactionID,
                  selectedDeposit.userId,
                  1 // Approve
                )}
                disabled={loading}
              >
                {loading ? "Processing..." : "Approve"}
              </Button>
              <Button
                variant="danger"
                onClick={() => handleStatusUpdate(
                  selectedDeposit.transactionID,
                  selectedDeposit.userId,
                  2 // Reject
                )}
                disabled={loading}
              >
                Reject
              </Button>
            </>
          )}
          <Button 
            variant="secondary" 
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

