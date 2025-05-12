import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

import InputSearchBox from "../../Table/InputSearchBox";

import DatePickers from "../../Table/DatePickers";
import TableList from "../../DepositGetWay/GatWaysTableList";

export default () => {
  const headers = [
    "Id",
    "AffiliateId",
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

      AffiliateId: "1 ",
      Mobile: "0101010101",
      "Transaction Id": "jgkjcijyttd",
      Currency: "BDT",
      Amount: "500",
      "Widthrow Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      Id: 2,
      AffiliateId: "2",
      Mobile: "0101010101",
      "Transaction Id": "hgdhjcjlt",
      Currency: "BDT",
      Amount: "500",
      "Widthrow Method": "bkash",
      Status: "Pending",
      Date: "10:11:40",
    },
    {
      Id: 3,
      AffiliateId: "4",
      Mobile: "0101010101",
      "Transaction Id": "hgdhjcjlt",
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
          <TableList data={data} headers={headers} />
        </Card>
      </div>
    </div>
  );
};
