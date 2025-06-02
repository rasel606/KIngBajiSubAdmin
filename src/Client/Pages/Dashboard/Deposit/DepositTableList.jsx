import React, { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import DepositModal from "./DepositModal";


    const Badge = ({ status }) => {
    const variants = {
      0: { text: "Pending", variant: "warning" },
      1: { text: "Approved", variant: "success" },
      2: { text: "Rejected", variant: "danger" }
    };
    
    const { text, variant } = variants[status] || { text: "Unknown", variant: "secondary" };
    
    return <Badge bg={variant}>{text}</Badge>;
  };

const DepositTableList = ({ data, headers, approveDeposit,error,loading,fetchWithdrawals,setError,setLoading }) => {
  const [modalShow, setModalShow] = useState(null);

  const handleShowModal = (row) => {
    setModalShow(row);
  };

  const handleCloseModal = () => {
    setModalShow(null);
  };



  console.log(approveDeposit);

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
                    <tr key={row.transactionID}>
                      <td>{index + 1}</td>
                      <td>${row.amount}</td>
                      <td>${row.base_amount}</td>
                      <td>${row.bonus_amount || "0"}</td>
                      <td>{row.gateway_name}</td>
                      <td className="text-monospace">{row.transactionID}</td>
                      <td>
                        <Badge status={row.status} />
                      </td>
                      <td>{row.userId}</td>
                      <td>{new Date(row.datetime).toLocaleString()}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => {
                            // setSelectedDeposit(row);
                            handleShowModal(row);
                          }}
                        >
                          <i className="fas fa-edit" />
                        </Button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </div>
      )}

      {modalShow && (
        <DepositModal
          show={!!modalShow}
          onHide={handleCloseModal}
          row={modalShow} // Pass selected row data
          approveDeposit={approveDeposit}
          fetchWithdrawals={fetchWithdrawals}
          error = {error} loading = {loading}
          setError={setError}
              setLoading={setLoading}
        />
      )}
    </Card.Body>
  );
};

export default DepositTableList;
