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

import InputSearchBox from "../../Table/InputSearchBox";

import DatePickers from "../../Table/DatePickers";

import DepositTableList from "../../Deposit/DepositTableList";

export default () => {
  const headers = [
    "serial",
    "User Id",

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
      serial: 1,
      "User Id": "Post 1",

      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      serial: 2,
      "User Id": "Post 1",

      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      serial: 3,
      "User Id": "Post 1",

      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      serial: 3,
      "User Id": "Post 1",

      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      serial: 3,
      "User Id": "Post 1",

      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      serial: 3,
      "User Id": "Post 1",

      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      serial: 3,
      "User Id": "Post 1",

      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      serial: 3,
      "User Id": "Post 1",

      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      serial: 3,
      "User Id": "Post 1",

      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      serial: 3,
      "User Id": "Post 1",

      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      serial: 3,
      "User Id": "Post 1",

      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      serial: 3,
      "User Id": "Post 1",

      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      serial: 3,
      "User Id": "Post 1",

      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      serial: 3,
      "User Id": "Post 1",

      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      serial: 3,
      "User Id": "Post 1",

      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      serial: 3,
      "User Id": "Post 1",

      Mobile: "0101010101",
      "Transaction Id": "52845685655",
      Currency: "BDT",
      Amount: "500",
      "Deposit Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      serial: 3,
      "User Id": "Post 1",

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
      </Card>
      <div className="m-3">
        <Card body>
          <DepositTableList data={data} headers={headers} />
        </Card>
      </div>
    </div>
  );
};
