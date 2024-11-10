import ModalCreateUser from "./modalCreateUser";
import './manageUser.scss'
import { FcPlus } from "react-icons/fc";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableUser from "./tableUser";
import { useEffect, useState } from "react";
import { getAllUser, getUserWithPaginate } from "../../../service/apiService";
import ModalUpdateUser from "./modalUpdateUser";
import ModalViewUser from "./modalViewUser";
import ModalDeleteUser from "./modalDeleteUser";
import TableUserPaginate from "./tableUserPaginate";



const UserManage = (props) => {
  const LIMIT_USER = 3;
  const [showModalAddNewUser, setShowModalAddNewUser] = useState(false)
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
  const [showModalViewUser, setShowModalViewUser] = useState(false)
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)

  const [pageCount, setPageCount] = useState(0)
  const [listUser, setListUser] = useState([])
  const [dataUpdate, setDataUpdate] = useState({})
  const [dataDelete, setDataDelete] = useState({})
  const [currentPage, setCurrentPage] = useState(1)


  useEffect(async () => {
    // fetchListUser();
    fetchListUserWithPaginate(1);
  }, [])
  const fetchListUser = async () => {
    let res = await getAllUser()
    if (res.EC === 0) {
      setListUser(res.DT)
    }
  }
  const fetchListUserWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER)
    if (res.EC === 0) {
      setListUser(res.DT.users)
      setPageCount(res.DT.totalPages)
    }
  }

  const handleBtnViewUser = (user) => {
    setShowModalViewUser(true);
    setDataUpdate(user)
  }

  const resetModalViewUser = () => {
    setDataUpdate({})
  }

  const handleBtnUpDateUser = (user) => {
    setShowModalUpdateUser(true)
    setDataUpdate(user)
  }

  const resetModalUpdateUser = () => {
    setDataUpdate({});
  }
  const handleBtnDeleteModalUser = (user) => {
    setShowModalDeleteUser(true)
    setDataDelete(user)
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
          {/* <TableUser
            listUser={listUser}
            handleBtnUpDateUser={handleBtnUpDateUser}
            handleBtnViewUser={handleBtnViewUser}
            handleBtnDeleteModalUser={handleBtnDeleteModalUser}
          /> */}
          <TableUserPaginate
            listUser={listUser}
            handleBtnUpDateUser={handleBtnUpDateUser}
            handleBtnViewUser={handleBtnViewUser}
            handleBtnDeleteModalUser={handleBtnDeleteModalUser}
            fetchListUserWithPaginate={fetchListUserWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage} />
        </div>
        <ModalCreateUser
          show={showModalAddNewUser}
          setShow={setShowModalAddNewUser}
          fetchListUser={fetchListUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUser={fetchListUser}
          resetModalUpdateUser={resetModalUpdateUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          dataUpdate={dataUpdate}
          resetModalViewUser={resetModalViewUser}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          fetchListUser={fetchListUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}
export default UserManage;