import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { useAuth } from "../../../Component/AuthContext";
import { searchTransactionsbyUserId } from "../../../AdminApi/AxiosAPIService";
import DepositWithAdminTransfarModal from "./DepositWithAdminTransfarModal";

export default ({ row, show, onHide }) => {
  const { user } = useAuth();
  const [error, setError] = useState("");
console.log(row);
  if (!row) return null;
  const [DepositWithAdminTransfar, setDepositWithAdminTransfarModal] = useState(null);
  const { userId, amount, base_amount, Mobile, gateway_name, transactionID, status, datetime } = row;
  const isPending = Number(status) === 0;

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionRecord = await searchTransactionsbyUserId({ userId });
        setTransactions(transactionRecord.data.transactionExists || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, [userId]);


  


  const NewHeaders = {
    "Amount + 3%": amount,
    "Base Amount": base_amount,
    "Mobile": Mobile,
    "Gateway Name": gateway_name,
    "Transaction ID": transactionID,
    "Status": isPending ? "Pending" : "Approved",
    "User ID": userId,
    "Date Time": datetime,
  };

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Transaction Details</Modal.Title>
       
      </Modal.Header>
      <Button className="btn border border-1 mx-2" onClick={() => setDepositWithAdminTransfarModal(row)}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
      <Modal.Body>
        {transactions.length === 0 ? (
          <div className="text-center">
            <img
              src="https://img.c88rx.com/cx/h5/assets/images/no-data.png"
              alt="no-data"
              className="img-fluid"
            />
            <p className="mt-2">No Data</p>
          </div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Txn Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.type === 0 ? "Deposit" : "Withdrawal"}</td>
                  <td>{transaction.base_amount}</td>
                  <td>
                    {transaction.status === 0
                      ? "Processing"
                      : transaction.status === 1
                      ? "Approved"
                      : "Rejected"}
                  </td>
                  <td>
                    {new Date(transaction.datetime).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
      {DepositWithAdminTransfar && (
                <DepositWithAdminTransfarModal
                  show={!!DepositWithAdminTransfar}
                  onHide={() => setDepositWithAdminTransfarModal(null)}
                  row={DepositWithAdminTransfar}
                />
              )}
    </Modal>
  );
};
