import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Offcanvas, Form, Badge, Tabs, Tab } from "react-bootstrap";
import { searchTransactionsbyUserId } from "../../../AdminApi/AxiosAPIService";
import DepositWithAdminTransfarModal from "./DepositWithAdminTransfarModal";





export default ({ row, show, onHide }) => {

  console.log(row.userId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [DepositWithAdminTransfar, setDepositWithAdminTransfar] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Filter states
  const [filters, setFilters] = useState({
    status: [],
    type: [],
    date: 'today'
  });

  // Filter options
  const statusOptions = [
    { label: "Processing", value: 0 },
    { label: "Approved", value: 1 },
    { label: "Rejected", value: 2 },
  ];

  const typeOptions = [
     { label: "Deposit", value: 0 },
    { label: "Withdrawal", value: 1 },
    { label: "Adjustment", value: 2 },
  ];

    const dateOptions = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 Days", value: "last7days" }, // Match backend's 'last7days'
  ];

  const handleFilterChange = (type, value) => {
  setFilters(prev => {
    // Handle checkbox filters (status and type)
    if (type === 'status' || type === 'type') {
      const currentValues = prev[type];
      return {
        ...prev,
        [type]: currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value]
      };
    }
    // Handle radio filter (dateRange)
    return {
      ...prev,
      [type]: value
    };
  });
};

  const fetchTransactions = async () => {
    try {
      
      const response = await searchTransactionsbyUserId({ userId:row.userId, filters });
      setTransactions(response.data.transactionExists || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    }
  };

  useEffect(() => {
    if (show) {
      fetchTransactions();
    }
  }, [show, filters]);

  const getStatusVariant = (status) => {
    switch(status) {
      case 0: return "warning";
      case 1: return "success";
      case 2: return "danger";
      default: return "secondary";
    }
  };

  if (!row) return null;

  return (
    <>
      <Modal show={show} onHide={onHide} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
          <Button 
            variant="outline-primary" 
            onClick={() => setIsFilterOpen(true)}
            className="ms-2"
          >
            <i className="fa-solid fa-filter"></i>
          </Button>
        </Modal.Header>

        <Modal.Body>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
          >
            <Tab eventKey="list" title="Transaction List">
              {transactions.length === 0 ? (
                <div className="text-center py-4">
                  <img
                    src="https://img.c88rx.com/cx/h5/assets/images/no-data.png"
                    alt="no-data"
                    className="img-fluid"
                    style={{ maxWidth: '200px' }}
                  />
                  <p className="mt-3 text-muted">No transactions found</p>
                </div>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(transaction => (
                      <tr key={transaction.id}>
                        <td>{transaction.type === 0 ? "Deposit" : "Withdrawal"}</td>
                        <td>{transaction.base_amount}</td>
                        <td>
                          <Badge bg={getStatusVariant(transaction.status)}>
                            {transaction.status === 0 ? "Processing" : 
                             transaction.status === 1 ? "Approved" : "Rejected"}
                          </Badge>
                        </td>
                        <td>
                          {new Date(transaction.datetime).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td>
                          <Button 
                            variant="link" 
                            onClick={() => setDepositWithAdminTransfar(row)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Tab>

            <Tab eventKey="details" title="Transaction Details" disabled={!selectedTransaction}>
              {selectedTransaction && (
                <div className="p-3">
                  <div className="mb-4">
                    <h5>Transaction #{selectedTransaction._id}</h5>
                    <Badge bg={getStatusVariant(selectedTransaction.status)}>
                      {selectedTransaction.status === 0 ? "Pending" : 
                       selectedTransaction.status === 1 ? "Approved" : "Rejected"}
                    </Badge>
                  </div>
                  
                  <Table borderless>
                    <tbody>
                      <tr>
                        <th>Amount:</th>
                        <td>{selectedTransaction.base_amount}</td>
                      </tr>
                      <tr>
                        <th>Gateway:</th>
                        <td>{selectedTransaction.gateway_name}</td>
                      </tr>
                      <tr>
                        <th>Transaction ID:</th>
                        <td>{selectedTransaction.transactionID}</td>
                      </tr>
                      <tr>
                        <th>Date:</th>
                        <td>
                          {new Date(selectedTransaction.datetime).toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              )}
            </Tab>
          </Tabs>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Filter Sidebar */}
      <Modal
        show={isFilterOpen}
        onHide={() => setIsFilterOpen(false)}
        placement="end"
      >
        <Modal.Header closeButton>
          <Modal.Title>Transaction Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FilterSection
            title="Transaction Type"
            options={typeOptions}
            selected={filters.type}
            onChange={(val) => handleFilterChange('type', val)}
          />
          
          <FilterSection
            title="Status"
            options={statusOptions}
            selected={filters.status}
            onChange={(val) => handleFilterChange('status', val)}
          />
          
          <FilterSection
            title="Date Range"
            options={dateOptions}
            selected={filters.date}
            onChange={(val) => handleFilterChange('dateRange', val)}
            type="radio"
          />

          <Button 
            variant="primary" 
            onClick={() => {setIsFilterOpen(false); searchTransactionsbyUserId();}}
            className="mt-3"
          >
            Apply Filters
          </Button>
        </Modal.Body>
      </Modal>

      {DepositWithAdminTransfar && (
        <DepositWithAdminTransfarModal
          show={!!DepositWithAdminTransfar}
          onHide={() => setDepositWithAdminTransfar(row)}
          row={DepositWithAdminTransfar}
        />
      )}
    </>
  );
};

const FilterSection = ({ title, options, selected, onChange, type = "checkbox" }) => (
  <div className="mb-4">
    <h6 className="mb-3">{title}</h6>
    {options.map(option => {
      const isChecked = type === 'radio' 
        ? selected === option.value 
        : Array.isArray(selected) && selected.includes(option.value);

      const handleChange = () => {
        if (type === 'radio') {
          onChange(option.value);
        } else {
          // Toggle item in array
          if (Array.isArray(selected)) {
            if (selected.includes(option.value)) {
              onChange(selected.filter(v => v !== option.value));
            } else {
              onChange([...selected, option.value]);
            }
          } else {
            // fallback if somehow selected is not an array
            onChange([option.value]);
          }
        }
      };

      return (
        <Form.Check 
          key={option.value}
          type={type}
          id={`${title}-${option.value}`}
          label={option.label}
          checked={isChecked}
          onChange={handleChange}
          className="mb-2"
        />
      );
    })}
  </div>
);

