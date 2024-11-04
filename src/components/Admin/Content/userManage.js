import ModalCreateUser from "./modalCreateUser";
import './manageUser.scss'
import { FcPlus } from "react-icons/fc";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableUser from "./tableUser";



const UserManage = (props) => {
  const [showModalAddNewUser, setShowModalAddNewUser] = useState(false)
  return (
    <div className="manage-user-container">
      <div className="title">
        UserManage
      </div>
      <div className="user-content">
        <div className="btn-add-user">
          <button className="btn btn-primary"
            onClick={() => setShowModalAddNewUser(true)}>
            <FcPlus />Add New User</button>
        </div>
        <div className="table-user-container">
          <TableUser/>
        </div>
        <ModalCreateUser
          show={showModalAddNewUser}
          setShow={setShowModalAddNewUser} />
      </div>
    </div>
  )
}
export default UserManage;