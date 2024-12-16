import { useState } from 'react';
import './manageQuiz.scss'
import Select from 'react-select';


const ManageQuiz = (props) => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];
    const [name, setName] = useState('');
    const [description, setDescription] = useState();
    const [type, setType] = useState('EASY');
    const [image, setImage] = useState(null)

    const handleChooseFile=(event)=>{
        
    }
    return (
        <div className="quiz-container">
            <div className="title">Manage Quizzes</div>
            <hr />
            <div className=" add-new">
                <form>
                    <fieldset className="border rounded-3 p-3">
                        <legend className="float-none w-auto px-3 ">Add new quiz</legend>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event => setName(event.target.value))} />
                            <label >Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event => setDescription(event.target.value))} />
                            <label >Description</label>
                        </div>
                        <div className='my-3'>
                            <Select
                                value={type}
                                onChange={event=>setType(event.target.value)}
                                options={options}
                                placeholder={'Quiz style'}
                            />
                        </div>
                        <div className='more-action'>
                            <label className='mb-1'>Upload image</label>
                            <input 
                            type='file' 
                            className='form-control' 
                            onChange={event=>handleChooseFile(event)}/>
                            {/* <button className="btn btn-primary">Submit</button> */}
                        </div>
                    </fieldset>
                </form>
            </div>
            <div className="list-detail">table</div>
        </div>
    )
}
export default ManageQuiz;