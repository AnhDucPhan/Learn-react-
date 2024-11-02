import SideBar from "./sidebar"
import './admin.scss'
import { FaBars } from 'react-icons/fa'
import { useState } from "react"
import { Outlet } from "react-router-dom"

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
                </div>
            </div>
        </div>
    )
}

export default Admin