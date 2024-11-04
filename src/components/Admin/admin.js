import SideBar from "./sidebar"
import './admin.scss'
import { FaBars } from 'react-icons/fa'
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    // const handleToggle = () => {
    //     setCollapsed(!collapsed)
    // }
    return (
        <div>
            <div className="admin-container">
                <div className="admin-sidebar">
                    <SideBar collapsed={collapsed} />
                </div>
                <div className="admin-content">
                    <div className="admin-header">
                        <FaBars onClick={() => { setCollapsed(!collapsed) }}></FaBars>
                    </div>
                    <div className="admin-main">
                        <Outlet />
                    </div>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition={Bounce}
                    />
                </div>
            </div>
        </div>
    )
}

export default Admin