import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../service/apiService'
import _ from 'lodash';

const ModalUpdateUser = (props) => {

    const { show, setShow, dataUpdate } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState()


    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            // setShow(false)
            setEmail(dataUpdate.email);
            setUserName(dataUpdate.username);
            setRole(dataUpdate.role);
            setImage(dataUpdate.image);
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
            console.log('check dataUpdate>>>>', dataUpdate)
        }
    }, [dataUpdate])

    const handleClose = () => {
        setShow(false)
        setEmail('');
        setPassword('');
        setUserName('');
        setRole('');
        setImage('');
        setPreviewImage('');
        props.resetModalUpdateUser();
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
        let data = await putUpdateUser(dataUpdate.id, username, role, image)

        if (data && data.EC === 0) {
            toast.success(data.EM)
            // await props.fetchListUser();
            // props.setCurrentPage(1);
            await props.fetchListUserWithPaginate(props.currentPage);
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
                    <Modal.Title>Update user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control"
                                value={email}
                                disabled
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control"
                                value={password}
                                disabled
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
                            <select className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
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

export default ModalUpdateUser;