import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import UserTransModel from "./UserTransModel";
import UserGameHistoryModel from "./UserGameHistoryModel";

import {
  AdminVerifyEmail,
  AdminVerifyPhone,
} from "../../../AdminApi/AxiosAPIService";
import ChangePasswordUserModal from "./ChangePasswordUserModal";
import ChangeEmail from "./ChangeEmail";

export default ({ data, headers }) => {
  const [modalShowUserTrans, setModalShowUserTrans] = useState(null);
  const [modalShowGameHistory, setModalShowGameHistory] = useState(null);
  const [modalchangePasswordUser, setModalChangePasswordUser] = useState(null);
  const [modalchangeEmail, setModalChangeEmail] = useState(null);
  const [loadingVerify, setLoadingVerify] = useState(false);

  const handleVerifyPhone = async (userId, phoneNumber) => {
    console.log(userId, phoneNumber);
    setLoadingVerify(true);
    try {
      const response = await AdminVerifyPhone({ phoneNumber, userId });
      console.log(response.data.message);
      if (response.ok) {
        alert(response.data.message);
        setLoadingVerify(false);
      } else {
        alert(response.error);
        setLoadingVerify(false);
      }
    } catch (error) {
      console.error("Verification failed:", error);
      setLoadingVerify(false);
    }
  };
  const handleVerifyEmail = async (userId) => {
    console.log(userId);
    setLoadingVerify(true);
    try {
      const response = await AdminVerifyEmail({ userId });
      console.log(response.data.message);
      if (response) {
        alert(response.data.message);
        setLoadingVerify(false);
      } else {
        alert(response.error);
        setLoadingVerify(false);
      }
    } catch (error) {
      console.error("Verification failed:", error);
      setLoadingVerify(false);
    }
  };

  return (
    <div className="table-responsive">
      <Table hover className="striped bordered hover" size="sm">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={`header-${index}`}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={`row-${row.userId}`}>
              <td>{row.userId}</td>
              <td>{row.name}</td>
              <td>{row.countryCode}</td>
              <td>
                {row.phone.map((num, i) => (
                  <div key={`phone-${row.userId}-${i}`}>
                    <span className="d-block">{num.number}</span>
                    <small
                      className={num.verified ? "text-success" : "text-danger"}
                    >
                      {num.verified ? "Verified" : "Unverified"}
                    </small>
                  </div>
                ))}
              </td>
              <td>
                {row.email ? (
                  row.email
                ) : (
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => setModalChangeEmail(row)}
                  >
                    <i className="fa-solid fa-edit" />
                  </Button>
                )}
              </td>
              <td>{row.balance.toFixed(2)}</td>
              <td>{row.referralCode}</td>
              <td>
                {console.log("row.isVerified.phone", row.isVerified.phone)}
                {row.isVerified.phone === true ? (
                  "Verified"
                ) : (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    disabled={loadingVerify}
                    onClick={() =>
                      handleVerifyPhone(row.userId, row.phone[0]?.number)
                    }
                  >
                    {loadingVerify ? "..." : "Verify"}
                  </Button>
                )}
              </td>
              <td>
                {row.isVerified.email === true ? (
                  "Verified"
                ) : (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    disabled={loadingVerify}
                    onClick={() => handleVerifyEmail(row.userId)}
                  >
                    {loadingVerify ? "Verifying..." : "Verify"}
                  </Button>
                )}
              </td>
              <td>{row.last_game_id}</td>
              <td>{row.agentId}</td>
              <td>{new Date(row.timestamp).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setModalShowUserTrans(row)}
                >
                  <i className="fa-solid fa-pen-to-square" />
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setModalShowGameHistory(row)}
                >
                  <i className="fa-solid fa-clock-rotate-left" />
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setModalChangePasswordUser(row)}
                >
                  <i className="fa-solid fa-key" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modals */}
      {modalShowUserTrans && (
        <UserTransModel
          show={!!modalShowUserTrans}
          onHide={() => setModalShowUserTrans(null)}
          row={modalShowUserTrans}
        />
      )}
      {ChangePasswordUserModal && (
        <ChangePasswordUserModal
          show={!!modalchangePasswordUser}
          onHide={() => setModalChangePasswordUser(null)}
          row={modalchangePasswordUser}
        />
      )}

      {modalShowGameHistory && (
        <UserGameHistoryModel
          show={!!modalShowGameHistory}
          onHide={() => setModalShowGameHistory(null)}
          row={modalShowGameHistory}
        />
      )}
      {/* {modalShowGameHistory && (
      <UserGameHistoryModel
        show={!!modalShowGameHistory}
        onHide={() => setModalShowGameHistory(null)}
        row={modalShowGameHistory}
      />
    )} */}
      {modalchangeEmail && (
        <ChangeEmail
          show={!!modalchangeEmail}
          onHide={() => setModalChangeEmail(null)}
          row={modalchangeEmail}
        />
      )}
    </div>
  );
};
