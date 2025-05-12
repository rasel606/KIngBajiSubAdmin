import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import InputSearchBox from "../../Table/InputSearchBox";
import DatePickers from "../../Table/DatePickers";
import TableList from "../../DepositGetWay/GatWaysTableList";

export default () => {
  const headers = [
    "User-ID",
    "Mobile",
    "Currency",

    "balance",
    "totalWidthraw",
    "PendingWidthraw",
    "Widthrow Method",
    "Status",
    "Date",
    "User List",
  ];

  const data = [
    {
      "User-ID": " 1",
      Mobile: "0101010101",
      Currency: "BDT",
      Amount: "500",

      balance: "500",
      totalWidthraw: "500",
      PendingWidthraw: "500",
      "Widthrow Method": "bkash",
      Status: "Blocked",
      Date: "10:11:40",
    },
    {
      "User-ID": " 2",
      Mobile: "0101010101",
      Currency: "BDT",
      Amount: "500",

      balance: "500",
      totalWidthraw: "500",
      PendingWidthraw: "500",
      "Widthrow Method": "bkash",
      Status: "Blocked",
      Date: "10:11:40",
    },
    {
      "User-ID": " 3",
      Mobile: "0101010101",
      Currency: "BDT",
      Amount: "500",

      balance: "500",
      totalWidthraw: "500",
      PendingWidthraw: "500",
      "Widthrow Method": "bkash",
      Status: "Blocked",
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
          <TableList data={data} headers={headers} />
        </Card>
      </div>
    </div>
  );
};
