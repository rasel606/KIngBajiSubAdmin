import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

import InputSearchBox from "../../Table/InputSearchBox";

import DatePickers from "../../Table/DatePickers";
import OflineGatWay from "../../DepositGetWay/GatWaysTableList";

export default () => {
  const headers = [
    "Id",
    "User Id",
    "Agent Id",
    "Mobile",
    "Transaction Id",
    "Currency",
    "Amount",
    "Widthrow Method",
    "Status",
    "Date",
    "Actions",
  ];

  const data = [
    {
      Id: 1,
      "User Id": "Post 1",
      "Agent Id": "1 : Saikat",
      Mobile: "0101010101",
      "Transaction Id": "",
      Currency: "BDT",
      Amount: "500",
      "Widthrow Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      Id: 2,
      "User Id": "Post 1",
      "Agent Id": "1 : Saikat",
      Mobile: "0101010101",
      "Transaction Id": "",
      Currency: "BDT",
      Amount: "500",
      "Widthrow Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      Id: 3,
      "User Id": "Post 1",
      "Agent Id": "1 : Saikat",
      Mobile: "0101010101",
      "Transaction Id": "",
      Currency: "BDT",
      Amount: "500",
      "Widthrow Method": "bkash",
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
          <OflineGatWay data={data} headers={headers} />
        </Card>
      </div>
    </div>
  );
};
