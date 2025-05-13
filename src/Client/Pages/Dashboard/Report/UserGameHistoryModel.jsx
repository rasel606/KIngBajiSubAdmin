import React, { useEffect, useState } from "react";
import { 
  Modal, 
  Tab, 
  Nav, 
  Form, 
  Row, 
  Col, 
  ListGroup,
  Button,
  Badge
} from "react-bootstrap";
import { 
  GetBettingHistoryByMember, 
  GetGameCategory, 
  GetGameProvider 
} from "../../../AdminApi/AxiosAPIService";

export default  ({ row, show, onHide }) => {
  const { userId } = row;
  const [filters, setFilters] = useState({
    product: [],
    site: [],
    date: "today",
  });

  const [activeTab, setActiveTab] = useState("settled");
  const [records, setRecords] = useState([]);
  const [showRecordDetails, setShowRecordDetails] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);

  const dateOptions = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 Days", value: "last7days" },
  ];

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await GetGameProvider();
        if (response.data.errCode === 200) {
          setProviders(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await GetGameCategory();
        if (response.data.errCode === 200) {
          setCategories(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProviders();
    fetchCategories();
  }, [userId]);

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      if (type === "date") return { ...prev, date: value };
      return {
        ...prev,
        [type]: prev[type].includes(value)
          ? prev[type].filter(v => v !== value)
          : [...prev[type], value]
      };
    });
  };

  const getBettingHistory = async () => {
    try {
      const response = await GetBettingHistoryByMember({ userId:row.userId, filters });
      setRecords(response.data.data || []);
    } catch (error) {
      console.error("Error fetching betting history:", error);
      setRecords([]);
    }
  };

  useEffect(() => {
    if (show) getBettingHistory();
  }, [show, filters, userId]);

  return (
    <>
      {/* Main Modal */}
      <Modal show={show} onHide={onHide} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Betting History</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Tab.Container activeKey={activeTab}>
            <Nav variant="tabs" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="settled" onClick={() => setActiveTab("settled")}>
                  Settled
                </Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link eventKey="unsettled" onClick={() => setActiveTab("unsettled")}>
                  Unsettled
                </Nav.Link>
              </Nav.Item> */}
            </Nav>

            <Row className="mb-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Platforms</Form.Label>
                  {providers.map(provider => (
                    <Form.Check 
                      key={provider.providercode}
                      type="checkbox"
                      label={provider.company}
                      checked={filters.site.includes(provider.providercode)}
                      onChange={() => handleFilterChange("site", provider.providercode)}
                    />
                  ))}
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label>Game Types</Form.Label>
                  {categories.map(category => (
                    <Form.Check
                      key={category.p_type}
                      type="checkbox"
                      label={category.category_name}
                      checked={filters.product.includes(category.p_type)}
                      onChange={() => handleFilterChange("product", category.p_type)}
                    />
                  ))}
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  {dateOptions.map(option => (
                    <Form.Check
                      key={option.value}
                      type="radio"
                      label={option.label}
                      name="date-filter"
                      checked={filters.date === option.value}
                      onChange={() => handleFilterChange("date", option.value)}
                    />
                  ))}
                </Form.Group>
              </Col>
            </Row>

            <Tab.Content>
              <Tab.Pane eventKey={activeTab}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex fw-bold">
                    <div className="flex-fill">Platform</div>
                    <div className="flex-fill">Game Type</div>
                    <div className="flex-fill">Turnover</div>
                    <div className="flex-fill">Profit/Loss</div>
                    <div className="flex-fill">date</div>
                  </ListGroup.Item>
                  
                  {records.map(record => (
                    <ListGroup.Item 
                      key={record.id}
                      action
                      onClick={() => {
                        setSelectedRecord(record);
                        setShowRecordDetails(true);
                      }}
                      className="d-flex"
                    >
                      <div className="flex-fill">{record.site}</div>
                      <div className="flex-fill">{record.product}</div>
                      <div className="flex-fill">{record.totalTurnover}</div>
                      <div className={`flex-fill ${
                        record.totaPayout < 0 ? 'text-danger' : 'text-success'
                      }`}>
                        {record.totalBet}
                      </div>
                      <div className="flex-fill">{record.date}</div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Modal.Body>
      </Modal>

      {/* Details Modal */}
      <Modal show={showRecordDetails} onHide={() => setShowRecordDetails(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Betting Details</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {selectedRecord && (
            <>
              {/* <Row className="mb-4">
                <Col>
                  <div className="fw-bold">Platform</div>
                  <div>{selectedRecord.platform}</div>
                </Col>
                <Col>
                  <div className="fw-bold">Game Type</div>
                  <div>{selectedRecord.gameType}</div>
                </Col>
                <Col>
                  <div className="fw-bold">Turnover</div>
                  <div>{selectedRecord.turnover}</div>
                </Col>
                <Col>
                  <div className="fw-bold">Profit/Loss</div>
                  <div className={
                    selectedRecord.profitLoss < 0 ? 'text-danger' : 'text-success'
                  }>
                    {selectedRecord.profitLoss}
                  </div>
                </Col>
              </Row> */}

              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex fw-bold">
                  <div className="flex-fill">Time</div>
                  <div className="flex-fill">Game</div>
                  <div className="flex-fill">Turnover</div>
                  <div className="flex-fill">Profit/Loss</div>
                </ListGroup.Item>
{console.log(selectedRecord)}
                {selectedRecord.records?.map((bet, index) => (
                  <ListGroup.Item key={index} className="d-flex">
                    <div className="flex-fill">{bet.end_time}</div>
                    <div className="flex-fill">{bet.gameName}</div>
                    <div className="flex-fill">{bet.turnover}</div>
                    <div className={`flex-fill ${
                      bet.bet < 0 ? 'text-danger' : 'text-success'
                    }`}>
                      {bet.bet}
                      {/* <Badge bg="light" className="ms-2">
                        Settled
                      </Badge> */}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

