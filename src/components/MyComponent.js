import React, { useState } from "react";
import UserInfo from "../components/UserInfoComponent";
import DisplayInfoUser from "./DisplayInfoComponent";


const MyComponent = (props) => {
    const listUser = [
        { id: 1, name: 'A', age: 21 },
        { id: 2, name: 'B', age: 23 },
        { id: 3, name: 'C', age: 25 },
        { id: 4, name: 'D', age: 27 },
        { id: 5, name: 'E', age: 29 },
    ]
    const [isList, setList] = useState(listUser)
    const handleAddNewUser = (user) => {
        setList([user, ...isList])
    }
    const handleDeleteUser = (userId) => {
        let isUserActionClone = isList;
        isUserActionClone = isUserActionClone.filter(user => user.id !== userId)
        setList(isUserActionClone);
    }
    return (
        <div>
            <UserInfo handleAddNewUser={handleAddNewUser}></UserInfo>
            <br></br>
            <DisplayInfoUser listUser={isList}
                handleDeleteUser={handleDeleteUser}></DisplayInfoUser>
        </div>
    )
}
export default MyComponent;