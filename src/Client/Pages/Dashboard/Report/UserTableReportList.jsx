import React, { useState } from "react";
import { Button } from "react-bootstrap";
import UserTransModel from "./UserTransModel";
import UserGameHistoryModel from "./UserGameHistoryModel";


export default  ({ data, headers }) => {
  const [modalShowUserTrans, setModalShowUserTrans] = useState(null);
  const [modalShowGameHistory, setModalShowGameHistory] = useState(null);


  

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
            <td>{row.userId}</td>
            <td>{row.name}</td>
            <td>{row.countryCode}</td>
            <td>{row.phone}</td>
            <td>{row.email}</td>
            <td>{row.balance.toFixed(2)}</td>
            <td>{row.referredCode}</td>
            <td>{row.isPhoneVerified ? 'Verified' : 'Not Verified'}</td>
            <td>{row.isEmailVerified ? 'Verified' : 'Not Verified'}</td>
            <td>{row.last_game_id}</td>
            <td>{row.agentId}</td>
            <td>{row.timestamp}</td>
            
            <td>
              <Button className="btn border border-1 mx-2" onClick={() => setModalShowUserTrans(row)}>
                <i className="fa-solid fa-pen-to-square"></i>
              </Button>
            </td>
            <td>
              <Button className="btn border border-1 mx-2" onClick={() => setModalShowGameHistory(row)}>
                <i className="fa-solid fa-pen-to-square"></i>
              </Button>
            </td>
            
          </tr>
        ))}
      </tbody>
      {modalShowUserTrans && (
        <UserTransModel
          show={!!modalShowUserTrans}
          onHide={() => setModalShowUserTrans(null)}
          row={modalShowUserTrans}
        />
      )}
      {modalShowGameHistory && (
        <UserGameHistoryModel
          show={!!modalShowGameHistory}
          onHide={() => setModalShowGameHistory(null)}
          row={modalShowGameHistory}
        />
      )}
      
    </table>
  );
};


