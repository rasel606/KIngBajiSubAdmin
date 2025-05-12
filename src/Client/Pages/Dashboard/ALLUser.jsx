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

import InputSearchBox from "./Table/InputSearchBox";

import DatePickers from "./Table/DatePickers";
import OflineGatWay from "./DepositGetWay/GatWaysTableList";
import { FaPlus } from "react-icons/fa";
import MyVerticallyCenteredModal from "./Table/MyVerticallyCenteredModal";

export default () => {
  const headers = [
    "user_id",
    "name",
    "Currency",
    "Balance",
    "Lest_Deposit",
    "Number",
    "Active",
    "GameHistory",
    "Balance History",
  ];

  const data = [
    {
      user_id: 5,
      name: "Post Title",
      Currency: "BDT",
      Balance: "500",
      Last_Deposit: "1000",
      Number: "+881712944055",
      isActive: "true",
      Balance_History: "",
    },
    {
      user_id: 5,
      name: "Post Title",
      Currency: "BDT",
      Balance: "500",
      Last_Deposit: "1000",
      Number: "+881712944055",
      isActive: "true",
      Balance_History: "",
    },
  ];

  const items = ["Red", "Blue", "Orange", "Red-Orange"];
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="">
      <Card body className="mx-3" style={{ background: "#38094d" }}>
        <Row className="my-3">
          <Col md={5} className="my-1">
            <InputSearchBox items={items} />
          </Col>
          <Col md={5} className="my-1">
            <div className="card bg-white border border-1 ">
              <DatePickers items={items} />
            </div>
          </Col>
          <Col md={2} className="my-1">
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Add Bank
            </Button>

            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
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
