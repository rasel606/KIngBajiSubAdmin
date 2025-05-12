import { Link } from "react-router-dom";

import { Card, Col, Container, Row } from "react-bootstrap";
import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";

export default () => {
  return (
    <section>
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
                  style={{ maxWidth: "25rem", height: "8rem" }}
                  className="dash-card  border border-0 border-primary rounded-3 shadow "
                >
                  <div className="text-center d-flex justify-content-center">
                    <i class="a-duotone fa-solid fa-user fs-2 my-2"></i>
                    <h6 className="mx-3 my-2 fs-2">Games Blance</h6>
                  </div>
                  <h6 className="mx-2 my-2 fs-2 d-flex justify-content-center">
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
                  style={{ maxWidth: "25rem", height: "8rem" }}
                  className="dash-card  border border-0 border-primary rounded-3 shadow "
                >
                  <div className="text-center d-flex justify-content-center">
                    <i class="a-duotone fa-solid fa-user fs-2 my-2"></i>
                    <h6 className="mx-2 my-2 fs-2">Total Diposit</h6>
                  </div>
                  <h6 className="mx-2 my-2 fs-2 d-flex justify-content-center">
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
                  style={{ maxWidth: "25rem", height: "8rem" }}
                  className="dash-card border border-0 border-primary rounded-3 shadow "
                >
                  <div className="text-center d-flex justify-content-center">
                    <i class="a-duotone fa-solid fa-user fs-2 my-2"></i>
                    <h6 className="mx-2 my-2 fs-2">Blance Avilable</h6>
                  </div>
                  <h6 className="mx-2 my-2 fs-2 d-flex justify-content-center">
                    {500}
                  </h6>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={8} className="custom-padding">
                <LineChart />
              </Col>
              <Col md={4} className="custom-padding">
                <PieChart />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
