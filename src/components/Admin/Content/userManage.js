import ModalCreateUser from "./modalCreateUser";
import './manageUser.scss'
import { FcPlus } from "react-icons/fc";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableUser from "./tableUser";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../service/apiService";
import ModalUpdateUser from "./modalUpdateUser";



const UserManage = (props) => {
  const [showModalAddNewUser, setShowModalAddNewUser] = useState(false)
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
  const [listUser, setListUser] = useState([])
  const [dataUpdate, setDataUpdate] = useState({})


  useEffect(async () => {
    fetchListUser();
  }, [])
  const fetchListUser = async () => {
    let res = await getAllUser()
    if (res.EC === 0) {
      setListUser(res.DT)
    }
  }

  const handleBtnUpDateUser = (user) => {
    setShowModalUpdateUser(true)
    setDataUpdate(user)
  }

  const resetModalUpdateUser = () => {
    setDataUpdate({});
  }

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
          <TableUser
            listUser={listUser}
            handleBtnUpDateUser={handleBtnUpDateUser}
          />
        </div>
        <ModalCreateUser
          show={showModalAddNewUser}
          setShow={setShowModalAddNewUser}
          fetchListUser={fetchListUser} />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUser={fetchListUser}
          resetModalUpdateUser={resetModalUpdateUser}
        />
      </div>
    </div>
  )
}
export default UserManage;