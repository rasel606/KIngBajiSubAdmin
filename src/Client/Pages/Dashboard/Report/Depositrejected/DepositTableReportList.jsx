import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Table } from "react-bootstrap";


const DepositTableList = ({ data, headers,error,loading }) => {
  const [modalShow, setModalShow] = useState(null);

  const handleShowModal = (row) => {
    setModalShow(row);
  };

  const handleCloseModal = () => {
    setModalShow(null);
  };


  console.log(data);

  return (
 <Card.Body className="p-0">
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-white mt-2">Loading deposits...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="alert alert-danger">No Data Found</div>
      ) : (
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
                  <td>{index + 1}</td>
                  <td>{row.amount}</td>
                  <td>{row.base_amount}</td>
                  <td>{row.bonus_amount}</td>
                  <td>{row.mobile}</td>
                  <td>{row.gateway_Number}</td>
                  <td>{row.gateway_name}</td>
                  <td>{row.transactionID}</td>
                  <td
                    className={row.status === 2 ? "bg-warning text-dark" : ""}
                  >
                    {Number(row.status) === 2 ? "Rejected" : "Approved"}
                  </td>
                  <td className="bg-gray">{row.userId}</td>
                  <td>{row.datetime}</td>
                  <td>{row.updatetime}</td>
                  {/* <td>
                    <Button
                       variant="outline-light" 
                          size="sm"
                          className="px-2 py-1"
                      onClick={() => handleShowModal(row)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
{/* 
      {modalShow && (
        <DepositModal
          show={!!modalShow}
          onHide={handleCloseModal}
          row={modalShow} // Pass selected row data
          approveDeposit={approveDeposit}
        />
      )} */}
    </Card.Body>
  );
};

export default DepositTableList;
