import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { PostCreateNewUser } from '../../../service/apiService'

const ModalCreateUser = (props) => {

    const { show, setShow } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [role, setRole] = useState('')
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState()

    const handleClose = () => {
        setShow(false)
        setEmail('');
        setPassword('');
        setUserName('');
        setRole('');
        setImage('');
        setPreviewImage('');
    };

    const handleUploadFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        }
    }


    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitAddUser = async () => {

        const isValidEmail = validateEmail(email)

        if (!isValidEmail) {
            toast.error('invalid email')
            return;
        }
        if (!password) {
            toast.error('invalid password');
            return;
        }



        let data = await PostCreateNewUser(email, password, username, role, image)

        if (data && data.EC === 0) {
            toast.success(data.EM)
            return handleClose();
        } if (data && data.EC !== 0) {
            toast.error(data.EM)
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
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control"
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">UserName</label>
                            <input type="text" className="form-control"
                                value={username}
                                onChange={(event) => { setUserName(event.target.value) }} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" onChange={(event) => setRole(event.target.value)}>
                                <option value='USER'>USER</option>
                                <option value='ADMIN'>ADMIN</option>
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

export default ModalCreateUser;