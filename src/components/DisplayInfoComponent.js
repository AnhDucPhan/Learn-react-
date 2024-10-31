import React, { useState } from "react";
import './DisplayInfo.scss';

const DisplayInfoUser = (props) => {
    const { listUser } = props;
    const [isShowHideListUser, setShowHideListUser] = useState(true,);
    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowHideListUser);
    }

    return (
        <div className="display-info-container">

            <span onClick={() => handleShowHideListUser()}>
                {isShowHideListUser === true ? 'Hide list user' : 'Show list user'}
            </span>
            {isShowHideListUser &&
                <div>
                    {
                        listUser.map((user) => {
                            return (
                                <div key={user.id} className={+user.age > 25 ? 'green' : 'red'}>
                                    My name is {user.name} and i'm {user.age}<hr />
                                    <button onClick={() => props.handleDeleteUser(user.id)}>X</button>
                                </div>
                            )
                        })
                    }
                </div >}
        </div>
    )


}

export default DisplayInfoUser;