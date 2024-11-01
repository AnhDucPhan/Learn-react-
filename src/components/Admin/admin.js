import SideBar from "./sidebar"
import './admin.scss'
import { FaBars } from 'react-icons/fa'
import { useState } from "react"

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
                    <FaBars onClick={() => { setCollapsed(!collapsed) }}></FaBars>
                    This is component Admin
                </div>
            </div>
        </div>
    )
}

export default Admin