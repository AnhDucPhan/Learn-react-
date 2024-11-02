import ModalCreateUser from "./modalCreateUser";



const UserManage = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">
        UserManage
      </div>
      <div className="user-content">
        <div className="btn-add-user">
          <button>Add New User</button>
        </div>
        <div>
          List User
          <ModalCreateUser />
        </div>
      </div>
    </div>
  )
}
export default UserManage;