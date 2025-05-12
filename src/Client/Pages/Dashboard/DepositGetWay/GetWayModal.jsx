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
        <image src="" alt="bkash" />
        <h4>Method : </h4>
        <input type="text" />
        <h4>Account Name : </h4>
        <input type="text" />
        <h4>Account Number : </h4>
        <input type="text" />
        <h4>Active Time : </h4>
        <input type="text" />
        <h4>Deactive Time : </h4>
        <input type="text" />

        <p>Transaction Id: ljnasjdfvnols</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Accept</Button>
        <Button onClick={props.onHide}>Reject</Button>
      </Modal.Footer>
    </Modal>
  );
};
