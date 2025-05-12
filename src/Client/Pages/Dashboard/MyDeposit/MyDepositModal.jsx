import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      md-down="sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Method : Bkash</h4>
        <h4>Pay Account : 01712944055</h4>
        Game Balance Rate : 1000 = 700 bdt
        <p>Transaction Id: </p>
        <input type="text" />
        <p>Pay Amount: </p>
        <input type="text" />
        <span></span>
        <p>Deposit Number: </p>
        <input type="text" />
        <p>Game Balance: </p>
        <p>500/35*100=17500</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Payment</Button>
      </Modal.Footer>
    </Modal>
  );
};
