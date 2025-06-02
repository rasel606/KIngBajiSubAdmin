import { Link } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";
import SummaryTable from "./SummaryTable";
import { useEffect, useState } from "react";
import { useAuth } from "../../Component/AuthContext";
import {
  chatsSummary,
  getTransactionDepositTotals,
  getTransactionWidthrawTotals,
  totalDeposit,
  totalWidthraw,
} from "../../AdminApi/AxiosAPIService";

export default () => {
  const { user, loading, setLoading, totalUser, totalOnlineUser } = useAuth();
  const [depositSummary, setDepositSummary] = useState([]);
  const [withdrawSummary, setWithdrawSummary] = useState([]);
  const [allTotalDeposit, setAllTotalDeposit] = useState(0);
  const [allTotalWithdraw, setAllTotalWithdraw] = useState(0);
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [WidthrawSummary, setWidthrawSummary] = useState();
  const [aLLTotalDeposit, setALLTotalDeposit] = useState(0);
  const [aLLTotalWidthraw, setALLTotalWidthraw] = useState(0);
 
  const [error, setError] = useState("");

  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    setStartDate(thirtyDaysAgo.toISOString().split("T")[0]);
    setEndDate(today.toISOString().split("T")[0]);
  }, []);

  // Fetch data functions (same as your original)


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
    <section className="dashboard-section">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Container className="py-4">
          <Row className="g-3 mb-4">
            {/* Stats Cards */}
            {[
              { title: "Total User", value: totalUser, icon: "fa-users", color: "#38094d" },
              { title: "Total Online User", value: totalOnlineUser || 0, icon: "fa-wifi", color: "#2c0750" },
              { title: "Total Affiliate User", value: 500, icon: "fa-user-group", color: "#25064a" },
              { title: "Total Balance", value: user?.balance || 0, icon: "fa-wallet", color: "#1e0545" },
              { title: "Total Deposit", value: allTotalDeposit, icon: "fa-money-bill-transfer", color: "#180440" },
              { title: "Total Withdraw", value: allTotalWithdraw, icon: "fa-money-check", color: "#12033b" },
            ].map((stat, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={4} xl={2}>
                <Card className="stats-card h-100 border-0 shadow-sm" style={{ backgroundColor: stat.color }}>
                  <Card.Body className="p-3 d-flex flex-column align-items-center">
                    <div className="icon-wrapper mb-2">
                      <i className={`fa-solid ${stat.icon} fa-xl text-white`} />
                    </div>
                    <h6 className="stats-title text-white mb-1">{stat.title}</h6>
                    <h4 className="stats-value text-white mb-0">{stat.value}</h4>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="g-3 mb-4">
            <Col md={6}>
              <SummaryTable data={depositSummary} title={"Deposit Summary"} />
            </Col>
            <Col md={6}>
              <SummaryTable data={withdrawSummary} title={"Withdraw Summary"} />
            </Col>
          </Row>

          <Row className="g-3">
            <Col lg={8}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
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
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <PieChart />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}

      <style jsx global>{`
        .dashboard-section {
          margin-top: 5rem;
          padding-bottom: 2rem;
        }
        
        .stats-card {
          border-radius: 12px;
          transition: transform 0.3s ease;
          overflow: hidden;
        }
        
        .stats-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.2);
        }
        
        .stats-title {
          font-size: 0.9rem;
          font-weight: 500;
          text-align: center;
        }
        
        .stats-value {
          font-size: 1.4rem;
          font-weight: 700;
          text-align: center;
        }
        
        @media (max-width: 768px) {
          .dashboard-section {
            margin-top: 4rem;
          }
          
          .stats-title {
            font-size: 0.8rem;
          }
          
          .stats-value {
            font-size: 1.2rem;
          }
        }
        
        @media (max-width: 576px) {
          .stats-card {
            margin-bottom: 15px;
          }
          
          .stats-title {
            font-size: 0.75rem;
          }
          
          .stats-value {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </section>
  );
};