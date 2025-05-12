import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Form,
  InputGroup,
  Row,
  SplitButton,
  Table,
  Button,
  Dropdown,
} from "react-bootstrap";

import InputSearchBox from "../Table/InputSearchBox";

import DatePickers from "../Table/DatePickers";

import MyDepositTableList from "./MyDepositTableList";
import MyDepositModal from "./MyDepositModal";

export default () => {
  const headers = [
    "Mobile",
    "Transaction Id",
    "Currency",
    "Amount",
    "Deposit Method",
    "Status",
    "Date",
    "Actions",
  ];

  const data = [
    {
      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
  ];

  const [modalShow, setModalShow] = useState(false);
  const items = ["Red", "Blue", "Orange", "Red-Orange"];

  return (
    <div className="">
      <Card body style={{ background: "#38094d" }} className="mx-3">
        <Row className="my-3">
          <Col md={3}>
            <InputSearchBox items={items} />
          </Col>
          <Col md={3}>
            <InputSearchBox items={items} />
          </Col>
          <Col md={3}>
            <InputSearchBox items={items} />
          </Col>
          <Col md={3}>
            <div className="card bg-white border border-1 ">
              <DatePickers items={items} />
            </div>
          </Col>
        </Row>
        <Row className="my-3">
          <Col md={3}>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Add Payment
            </Button>

            <MyDepositModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Col>
        </Row>
      </Card>
      <div className="m-3">
        <Card body>
          <MyDepositTableList data={data} headers={headers} />
        </Card>
      </div>
    </div>
  );
};
