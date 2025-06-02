import React, { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import WidthrawModal from "./WidthrawModal";

export default ({ data, headers, approveWidthdraw }) => {
  const [modalShow, setModalShow] = useState(null);

  const handleShowModal = (row) => {
    setModalShow(row);
  };

  const handleCloseModal = () => {
    setModalShow(null);
  };

  return (
    <Card.Body className="p-0">
      <div className="table-responsive ">
        <Table className="table table-hover text-white custom-table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {console.log(
                  Number(row.status) === 0
                    ? "Pending"
                    : Number(row.status) === 1
                    ? "Approved"
                    : "rejected"
                )}
                <td>{index + 1}</td>
                <td>{row.amount}</td>
                <td>{row.mobile}</td>
                <td>{row.gateway_name}</td>
                <td>{row.transactionID}</td>
                <td>
                  {Number(row.status) === 0
                    ? "Pending"
                    : Number(row.status) === 1
                    ? "Approved"
                    : "rejected"}
                </td>
                <td>{row.userId}</td>
                <td>{row.datetime}</td>
                <td>{row.updatetime}</td>
                <td>
                  <Button
                    className="btn border border-1 mx-2"
                    onClick={() => handleShowModal(row)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          {modalShow && (
            <WidthrawModal
              show={!!modalShow}
              onHide={handleCloseModal}
              row={modalShow} // Pass selected row data
              approveWidthdraw={approveWidthdraw}
            />
          )}
        </Table>
      </div>
    </Card.Body>
  );
};
