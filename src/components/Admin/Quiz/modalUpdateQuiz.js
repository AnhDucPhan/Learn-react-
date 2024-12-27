import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { putUpdateQuizForAdmin } from '../../../service/apiService'
import _ from 'lodash';
import { type } from '@testing-library/user-event/dist/type';

const ModalUpdateQuiz = (props) => {

    const { show, setShow, dataUpdate, setDataUpdate } = props;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('')


    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            setDescription(dataUpdate.description);
            setType(dataUpdate.difficulty);
            setImage(dataUpdate.image);
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
            console.log('check dataUpdate>>>>', dataUpdate)
        }
    }, [dataUpdate])

    const handleClose = () => {
        setShow(false)
        setName('');
        setDescription('');
        setType('');
        setImage('');
        setPreviewImage('');
        setDataUpdate({})
    };

    const handleUploadFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        }
    }

    const handleSubmitAddUser = async () => {
        if (!name) {
            toast.error('Name is required')
            return;
        }
        if (!description) {
            toast.error('Description is required')
            return;
        }

        let res = await putUpdateQuizForAdmin(dataUpdate.id, description, name, type, image)
        console.log('check res dataquiz update: ', res)

        if (res && res.EC === 0) {
            toast.success(res.EM)
            props.fetchTableQuiz();
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
                size='xl'
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-control"
                                value={description}
                                onChange={(event) => { setDescription(event.target.value) }} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Difficulty</label>
                            <select
                                className="form-select"
                                onChange={(event) => setType(event.target.value)}
                                value={type}
                            >
                                <option value='EASY'>EASY</option>
                                <option value='MEDIUM'>MEDIUM</option>
                                <option value='HARD'>HARD</option>
                            </select>
                        </div>
                        <div className='col-md-12 '>
                            <label className='col-md-12 label-upload' htmlFor='labelUpload'><FcPlus />Upload file image</label>
                            <input
                                type='file'
                                id='labelUpload'
                                hidden
                                onChange={(event) => handleUploadFile(event)} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ? <img src={previewImage} /> : <span>Preview Image</span>}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitAddUser()}>
                        Save
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz;