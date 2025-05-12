import React, { useState } from "react";
import { Button } from "react-bootstrap";


const DepositTableList = ({ data, headers }) => {
  const [modalShow, setModalShow] = useState(null);

  const handleShowModal = (row) => {
    setModalShow(row);
  };

  const handleCloseModal = () => {
    setModalShow(null);
  };


  

  return (
    <table responsive style={{ background: "transparent" }} className="table-hover custom-table text-white">
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
            {console.log(Number(row.status) === 0 ? "Pending" : "Approved")}
            <td>{index + 1}</td>
            <td>{row.amount}</td>
            <td>{row.base_amount}</td>
            <td>{row.Mobile}</td>
            <td>{row.type === 0 ?"Deposit": "Withdrawal"}</td>
            <td>{row.gateway_name}</td>
            <td>{row.transactionID}</td>
            <td>{Number(row.status) === 0 ? "pending" : "Approved"}</td>
            <td>{row.userId}</td>
            <td>{row.datetime}</td>
            <td>{row.updatetime}</td>
            <td>
              {/* <Button className="btn border border-1 mx-2" onClick={() => handleShowModal(row)}>
                <i className="fa-solid fa-pen-to-square"></i>
              </Button> */}
            </td>
          </tr>
        ))}
      </tbody>
      
    </table>
  );
};

export default DepositTableList;
