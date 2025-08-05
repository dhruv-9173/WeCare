import { Modal,Button } from "react-bootstrap";
function ConfirmDialog({ show, heading, message, onConfirm, onCancel }) {
    return (
        <Modal show={show}  onHide={onCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title>{heading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
            {onConfirm &&   <Button variant="primary" onClick={onConfirm}>
                    Confirm
                </Button>}
            </Modal.Footer>
        </Modal>
    );
}
export default ConfirmDialog