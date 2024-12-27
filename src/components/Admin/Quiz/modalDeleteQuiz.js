import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuizByAdmin } from '../../../service/apiService'
import { toast } from 'react-toastify';


const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDelete = async (id) => {
        let res = await deleteQuizByAdmin(id);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            props.fetchTableQuiz()
            handleClose();
            return;
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM)
        }
    }
    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete the Quizzes</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure delete this quizzes ?
                    <br />
                    Id: <b>{dataDelete && dataDelete.id ? dataDelete.id : ''}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary"
                        onClick={() => handleSubmitDelete(dataDelete.id)}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;