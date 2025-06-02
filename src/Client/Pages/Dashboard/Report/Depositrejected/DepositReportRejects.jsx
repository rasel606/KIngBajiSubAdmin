import React, { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import { useAuth } from "../../../../Component/AuthContext";
import DepositTableReportList from "./DepositTableReportList";
import { searchDepositTransactions, searchDepositTransactionsReportreject} from "../../../../AdminApi/AxiosAPIService";

export default () => {

    const { isAuthenticated, user, hasRole } = useAuth();
    console.log(user.referralCode);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [referredCode, setReferredCode] = useState(""); // Store the referredCode for filtering
  const [modalShow, setModalShow] = useState(false);
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
console.log(data);
  // Search filters
  const [filters, setFilters] = useState({
    userId: "",
    amount: "",
    gateway_name: "",
    status: "",
    startDate: null,
    endDate: null,
  });

  // Fetch withdrawal transactions based on search filters
  const fetchWithdrawals = async () => {
    setLoading(true);
    setError("");
    try {
      const { userId, amount, gateway_name, status, startDate, endDate } =
        filters;

      const params = {
        userId,
        amount,
        gateway_name,
        status,
        startDate: startDate ? startDate.toISOString() : "",
        endDate: endDate ? endDate.toISOString() : "",
        referredBy: user.referralCode,
      };
      console.log(params);

             const response = await searchDepositTransactionsReportreject (params);
             console.log(response.data.total.total);
             setData(response.data.transactions);
             setTotal(response.data.total.total);
    } catch (err) {
      setError("Error fetching withdrawals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, [filters]);

  return (
    <div>
      <Card style={{ background: "#38094d" }} className="mx-3 ">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="text-white mb-0">Deposit Rejected Table</h5>
            <Button
              variant="link"
              className="text-white d-md-none p-0"
              onClick={() => setFiltersCollapsed(!filtersCollapsed)}
            >
              <i
                className={`fas fa-${filtersCollapsed ? "plus" : "minus"}`}
              ></i>
            </Button>
          </div>

          <div className={`${filtersCollapsed ? "d-none" : ""} d-md-block`}>
            <Row className="g-4">
               <Col xs={12} md={6} lg={3}>
                <Form.Label className="text-white">User ID</Form.Label>
                <Form.Control
                  type="text"
                  value={filters.userId}
                  onChange={(e) =>
                    setFilters({ ...filters, userId: e.target.value })
                  }
                />
              </Col>

               <Col xs={12} md={6} lg={3}>
                <Form.Label className="text-white">Gateway</Form.Label>
                <Form.Control
                  type="text"
                  value={filters.gateway_name}
                  onChange={(e) =>
                    setFilters({ ...filters, gateway_name: e.target.value })
                  }
                />
              </Col>
              {/* <div className="mx-3 ">
            <Form.Label className="text-white">Status</Form.Label>
            <Form.Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value={""}>All</option>
              <option value="0">Pending</option>
              <option value="1">Accepted</option>
              <option value="2">Rejected</option>
            </Form.Select>
          </div> */}
               <Col xs={12} md={6} lg={3}>
                <Form.Label className="text-white">Start Date</Form.Label>
                <DatePicker
                  selected={filters.startDate}
                  onChange={(date) =>
                    setFilters({ ...filters, startDate: date })
                  }
                  className="form-control"
                />
              </Col>
               <Col xs={12} md={6} lg={3}>
                <Form.Label className="text-white">End Date</Form.Label>
                <DatePicker
                  selected={filters.endDate}
                  onChange={(date) => setFilters({ ...filters, endDate: date })}
                  className="form-control"
                />
              </Col>
              <Col xs={12} md={6} lg={3}>
                <Button onClick={fetchWithdrawals} disabled={loading}>
                  {loading ? "Searching..." : "Search"}
                </Button>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
      <div className="m-3">
        <Card
          className="border-0 "
          style={{
            background:"#38094d",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Card.Body style={{ background: "transparent",color:"white" ,border:"1px solid white"}} className="py-2">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="text-white mb-0">Total Deposits</h6>
              <h4 className="text-white mb-0">${total}</h4>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ background: "transparent", height: "100%" }} className="border-0 ">
          {data.length > 0 ? (
           <DepositTableReportList
            data={data}
            headers={[
              "serial",
              "Amount",
              "Base Amount",
              "Bonus Amount",
              "Mobile",
              "Type",
              "Gateway Name",
              "Transaction ID",
              "Status",
              "User ID",
              "Date Time",
              "Update Time",
             
            ]}

            error ={error}
            loading = {loading}
          />
          ) : (
            <h3 className="text-white text-center">No Data Found</h3>
          )}
        </Card>
      </div>
    </div>
  );
};
