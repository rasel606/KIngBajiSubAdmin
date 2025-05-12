import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default (props) => {
  const { id } = props;
  console.log(id);
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      md-down="sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{id.Id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Diposit By : Bkash</h4>
        <p>Transaction Id : liusgdvilsuv</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
