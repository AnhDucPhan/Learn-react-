import React, { useState } from "react";


const UserInfo = (props) => {
    
    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleAddNewUser({
            id:Math.floor((Math.random()*100)+1)+'random',
            name:isOnChangeName,
            age:isOnChangeAge
        })
    }


    const [isOnChangeName, setOnChangeName] = useState('')
    const handleOnchangeName = (event) => {
        setOnChangeName(event.target.value)
    }


    const [isOnChangeAge, setOnChangeAge] = useState('')
    const handleOnchangeAge = (event) => {
        setOnChangeAge(event.target.value)
    }
    return (
        <div>
            Hello my friends
            My name is {isOnChangeName.name} and i'm {isOnChangeAge.age}

            <form onSubmit={(event) => handleSubmit(event)}>
                <label>Your Name:</label>
                <input
                    type="text"
                    onChange={(event) => { handleOnchangeName(event) }}
                    value={isOnChangeName} />
                <label>Your Age:</label>
                <input
                    type="text"
                    onChange={(event) => { handleOnchangeAge(event) }}
                    value={isOnChangeAge} />
                <br></br>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default UserInfo;