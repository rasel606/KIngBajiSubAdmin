import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import AffiliateDepositModal from "./AffiliateDepositModal";

export default ({ data, headers }) => {
  const [datas, setDatas] = useState(data);

  const toggleActiveStatus = (id) => {
    const updatedData = datas.map((row) => {
      if (row.Id === id) {
        // Toggle isActive value
        return { ...row, isActive: row.isActive === "true" ? "false" : "true" };
      }
      return row;
    });
    setDatas(updatedData);
  };

  console.log(datas);
  const [modalShow, setModalShow] = useState(false);
  const handleShowModal = (rowId) => {
    setModalShow(rowId);
  };
  const handleCloseModal = () => {
    setModalShow(null);
  };

  return (
    <div>
      <Table responsive style={{ background: "#38094d" }}>
        <thead>
          <tr className="">
            {headers.map((header, index) => (
              <th
                className="text-center"
                key={index}
                style={{ color: "#38094d" }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {datas.map((row, rowIndex) => (
            <tr
              className="text-center "
              key={rowIndex}
              style={{ color: "#38094d" }}
            >
              {headers.map((header, colIndex) => (
                <td key={colIndex} style={{ color: "#38094d" }}>
                  {header === "isActive" ? (
                    <Form.Check
                      type="switch"
                      id={`switch-${row.Id}`}
                      checked={row.isActive === "true"}
                      onChange={() => toggleActiveStatus(row.Id)}
                    />
                  ) : header === "Actions" ? (
                    <>
                      <Button
                        className="btn border border-1 mx-2"
                        onClick={() => handleShowModal(row)} // Pass row data on click
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Button>

                      {modalShow && modalShow.Id === row.Id && (
                        <AffiliateDepositModal
                          id={modalShow.Id || row}
                          data={modalShow} // Pass the row data to the modal
                          show={true} // Show modal when matching ID
                          onHide={handleCloseModal}
                        />
                      )}
                    </>
                  ) : (
                    row[header] || "-"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
