import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import { useAuth } from "../../../../Component/AuthContext";

import {
  searchWidthdrawTransactionsReportAprove
} from "../../../../AdminApi/AxiosAPIService";
import WidthTableReportList from "./WidthTableReportList";

export default () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      const response = await searchWidthdrawTransactionsReportAprove(params);
      setData(response.data.transactions);
      setTotal(response.data.total.total);
      console.log(response.data.transactions);
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
      <Card body style={{ background: "#38094d" }} className="mx-3 ">
        <div className="d-flex">
          <div className="mx-2">
            <Form.Label className="text-white">User ID</Form.Label>
            <Form.Control
              type="text"
              value={filters.userId}
              onChange={(e) =>
                setFilters({ ...filters, userId: e.target.value })
              }
            />
          </div>

          <div className="mx-5">
            <Form.Label className="text-white">Gateway</Form.Label>
            <Form.Control
              type="text"
              value={filters.gateway_name}
              onChange={(e) =>
                setFilters({ ...filters, gateway_name: e.target.value })
              }
            />
          </div>
          {/* <div className="mx-3 ">
            <Form.Label className="text-white">Status</Form.Label>
            <Form.Select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value={""}>All</option>
              <option value="0">Pending</option>
              <option value="1">Accepted</option>
              <option value="2">Rejected</option>
            </Form.Select>
          </div> */}
          <div className="mx-5 d-flex-row">
            <Form.Label className="text-white">Start Date</Form.Label>
            <DatePicker
              selected={filters.startDate}
              onChange={(date) => setFilters({ ...filters, startDate: date })}
              className="form-control"
            />
          </div>
          <div className="mx-5 d-flex-row">
            <Form.Label className="text-white">End Date</Form.Label>
            <DatePicker
              selected={filters.endDate}
              onChange={(date) => setFilters({ ...filters, endDate: date })}
              className="form-control"
            />
          </div>
          <div className="mx-5 d-flex align-items-end">
            <Button onClick={fetchWithdrawals} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </Card>
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="m-3">
        <Card
          style={{
            background: "transparent",
            color: "white",
            border: "1px solid white",
          }}
          className="my-3"
        >
          <h3 className="p-3">Total Deposits: {total}</h3>
        </Card>
        <Card style={{ background: "transparent" }}>
          <WidthTableReportList
            data={data}
            headers={[
              "serial",
              "Amount",
              "type",
              "Mobile",
              "Gateway Name",
              "Status",
              "User ID",
              "Date Time",
              "Update Time",
            ]}
          />
        </Card>
      </div>
    </div>
  );
};
