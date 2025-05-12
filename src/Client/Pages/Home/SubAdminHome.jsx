import { Link } from "react-router-dom";

import { Card, Col, Container, Row } from "react-bootstrap";
import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";
import SummaryTable from "./SummaryTable";
import { use, useEffect, useState } from "react";
import { useAuth } from "../../Component/AuthContext";
import {
  chatsSummary,
  getTransactionDepositTotals,
  getTransactionWidthrawTotals,
  totalDeposit,
  totalWidthraw,
} from "../../AdminApi/AxiosAPIService";


export default () => {
  const { user, loading, setLoading } = useAuth();
  // console.log(user.balance)

  const [DepositSummary, setDepositSummary] = useState();
  const [WidthrawSummary, setWidthrawSummary] = useState();
  const [aLLTotalDeposit, setALLTotalDeposit] = useState(0);
  const [aLLTotalWidthraw, setALLTotalWidthraw] = useState(0);
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});
  const [startDate, setStartDate] = useState(
    "" || new Date().toISOString().split("T")[0] - 30
  );
  const [endDate, setEndDate] = useState(
    "" || new Date().toISOString().split("T")[0]
  );
  const [error, setError] = useState("");
console.log(user);
  useEffect(() => {
    const fetchTransactionTotals = async () => {
      setLoading(true);
      if (user) {
        const totals = await getTransactionDepositTotals({
          referredBy: user.referralCode,
        });

        setDepositSummary(totals.data.data);
        setLoading(false);
      }
    };

    fetchTransactionTotals();
  }, [user]);

  useEffect(() => {
    const fetchTransactionTotals = async () => {
      setLoading(true);
      if (user) {
        const totals = await getTransactionWidthrawTotals({
          referredBy: user.referralCode,
        });
        setWidthrawSummary(totals.data.data);
        setLoading(false);
      }
    };

    fetchTransactionTotals();
  }, [user]);

  useEffect(() => {
    const fetchTransactionTotals = async () => {
      setLoading(true);
      if (user) {
        const totals = await totalDeposit({
          referralCode: user.referralCode,
        });
        setALLTotalDeposit(totals.data.totalDeposit);
        console.log(totals);
        setLoading(false);
      }
    };

    fetchTransactionTotals();
  }, [user]);
  useEffect(() => {
    const fetchTransactionTotals = async () => {
      setLoading(true);
      if (user) {
        const totals = await totalWidthraw({
          referralCode: user.referralCode,
        });
        setALLTotalWidthraw(totals.data.totalDeposit);
        console.log(totals.data.totalDeposit);
        setLoading(false);
      }
    };

    fetchTransactionTotals();
  }, [user]);

  const fetchTransactionData = async () => {
    setLoading(true);
    const response = await chatsSummary({
      referredBy: user.referralCode,
      startDate,
      endDate,
    });
    setLoading(false);
    setSummary({

      lastDayTotal: response.data.lastDayTotal || 0,
      last7DaysTotal: response.data.last7DaysTotal || 0,
      last30DaysTotal: response.data.last30DaysTotal || 0,
    });

    // Format date properly for the chart
    const formattedData = response.data.customDateData.map((item) => ({
      _id: new Date(item._id).toLocaleDateString(), // Convert date format
      total: item.total,
    }));

    setData(formattedData);
  };

  console.log(summary, data);

  return (
    <section style={{ marginTop: "5rem" }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Container className="my-3">
        <Row className="custom-row">
          <Col md={12} sm={12} className="custom-padding">
            <Row className="custom-row">
              <Col
                md={6}
                xs={12}
                sm={12}
                lg={4}
                className="custom-padding my-md-2"
              >
                <div
                  style={{
                    maxWidth: "25rem",
                    height: "8rem",
                    background: "#38094d",
                  }}
                  className="dash-card  border border-0 border-primary rounded-3 shadow "
                >
                  <div className="text-center d-flex justify-content-center">
                    <i
                      class="a-duotone fa-solid fa-user fs-2 my-2"
                      style={{ color: "#ffffff" }}
                    ></i>
                    <h6 className="mx-3 my-2 fs-2" style={{ color: "#ffffff" }}>
                      Total User
                    </h6>
                  </div>
                  <h6
                    className="mx-2 my-2 fs-2 d-flex justify-content-center"
                    style={{ color: "#ffffff" }}
                  >
                    {500}
                  </h6>
                </div>
              </Col>
              <Col
                md={6}
                xs={12}
                sm={12}
                lg={4}
                className="custom-padding my-md-2"
              >
                <div
                  style={{
                    maxWidth: "25rem",
                    height: "8rem",
                    background: "#38094d",
                  }}
                  className="dash-card  border border-0 border-primary rounded-3 shadow "
                >
                  <div className="text-center d-flex justify-content-center">
                    <i
                      class="a-duotone fa-solid fa-user fs-2 my-2"
                      style={{ color: "#ffffff" }}
                    ></i>
                    <h6 className="mx-2 my-2 fs-2" style={{ color: "#ffffff" }}>
                      Total Online User
                    </h6>
                  </div>
                  <h6
                    className="mx-2 my-2 fs-2 d-flex justify-content-center"
                    style={{ color: "#ffffff" }}
                  >
                    {500}
                  </h6>
                </div>
              </Col>
              <Col
                md={6}
                xs={12}
                sm={12}
                lg={4}
                className="custom-padding  my-md-2"
              >
                <div
                  style={{
                    maxWidth: "25rem",
                    height: "8rem",
                    background: "#38094d",
                  }}
                  className="dash-card border border-0 border-primary rounded-3 shadow "
                >
                  <div className="text-center d-flex justify-content-center">
                    <i
                      class="a-duotone fa-solid fa-user fs-2 my-2"
                      style={{ color: "#ffffff" }}
                    ></i>
                    <h6
                      className="mx-2 my-2 fs-2 "
                      style={{ color: "#ffffff" }}
                    >
                      Total Affiliate User
                    </h6>
                  </div>
                  <h6
                    className="mx-2 my-2 fs-2 d-flex justify-content-center"
                    style={{ color: "#ffffff" }}
                  >
                    {500}
                  </h6>
                </div>
              </Col>
              <Col
                md={6}
                xs={12}
                sm={12}
                lg={4}
                className="custom-padding  my-md-2"
              >
                <div
                  style={{
                    maxWidth: "25rem",
                    height: "8rem",
                    background: "#38094d",
                  }}
                  className="dash-card border border-0 border-primary rounded-3 shadow "
                >
                  <div className="text-center d-flex justify-content-center">
                    <i
                      class="a-duotone fa-solid fa-user fs-2 my-2"
                      style={{ color: "#ffffff" }}
                    ></i>
                    <h6 className="mx-2 my-2 fs-2" style={{ color: "#ffffff" }}>
                      Total Balance
                    </h6>
                  </div>
                  <h6
                    className="mx-2 my-2 fs-2 d-flex justify-content-center"
                    style={{ color: "#ffffff" }}
                  >
                    {user ? user.balance : loading ? "Loading..." : "0"}
                  </h6>
                </div>
              </Col>
              <Col
                md={6}
                xs={12}
                sm={12}
                lg={4}
                className="custom-padding  my-md-2"
              >
                <div
                  style={{
                    maxWidth: "25rem",
                    height: "8rem",
                    background: "#38094d",
                  }}
                  className="dash-card border border-0 border-primary rounded-3 shadow "
                >
                  <div className="text-center d-flex justify-content-center">
                    <i
                      class="a-duotone fa-solid fa-user fs-2 my-2"
                      style={{ color: "#ffffff" }}
                    ></i>
                    <h6 className="mx-2 my-2 fs-2" style={{ color: "#ffffff" }}>
                      Total Deposit
                    </h6>
                  </div>
                  <h6
                    className="mx-2 my-2 fs-2 d-flex justify-content-center"
                    style={{ color: "#ffffff" }}
                  >
                    {aLLTotalDeposit}
                  </h6>
                </div>
              </Col>
              <Col
                md={6}
                xs={12}
                sm={12}
                lg={4}
                className="custom-padding  my-md-2"
              >
                <div
                  style={{
                    maxWidth: "25rem",
                    height: "8rem",
                    background: "#38094d",
                  }}
                  className="dash-card border border-0 border-primary rounded-3 shadow "
                >
                  <div className="text-center d-flex justify-content-center">
                    <i
                      class="a-duotone fa-solid fa-user fs-2 my-2"
                      style={{ color: "#ffffff" }}
                    ></i>
                    <h6 className="mx-2 my-2 fs-2" style={{ color: "#ffffff" }}>
                      Total Withdraw
                    </h6>
                  </div>
                  <h6
                    className="mx-2 my-2 fs-2 d-flex justify-content-center"
                    style={{ color: "#ffffff" }}
                  >
                    {aLLTotalWidthraw}
                  </h6>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="custom-padding">
                <SummaryTable
                  DepositSummary={DepositSummary}
                  title={"DepositSummary"}
                />
              </Col>
              <Col md={6} className="custom-padding">
                <SummaryTable
                  DepositSummary={WidthrawSummary}
                  title={"WidthrawSummary"}
                />
              </Col>
            </Row>
            <Row>
              <Col md={8} className="custom-padding">
                <LineChart
                  summary={summary}
                  data={data}
                  startDate={startDate}
                  endDate={endDate}
                  fetchTransactionData={fetchTransactionData}
                  setEndDate={setEndDate}
                  setStartDate={setStartDate}
                  loading={loading}
                />
              </Col>
              <Col md={4} className="custom-padding">
                <PieChart />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      )}
    </section>
  );
};
