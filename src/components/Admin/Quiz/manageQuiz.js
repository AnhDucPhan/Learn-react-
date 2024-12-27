import { useState } from 'react';
import './manageQuiz.scss'
import Select from 'react-select';
import { postCreateNewQuiz } from '../../../service/apiService'
import { toast } from 'react-toastify';
import TableQuiz from './tableQuiz';
import { Accordion } from 'react-bootstrap';
import { getAllQuizForAdmin } from '../../../service/apiService'



const ManageQuiz = (props) => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null)

    const handleChooseFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleSaveQuiz = async () => {
        if (!name || !description) {
            toast.error('Name or description is required')
            return;
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('')
            setDescription('')
            setImage(null)
            setType('')
        }
        else {
            toast.error(res.EM)
        }
    }

    return (
        <div className='quiz-container'>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
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
                                            onChange={setType}
                                            defaultValue={type}
                                            options={options}
                                            placeholder={'Quiz style'}
                                        />
                                    </div>
                                    <div className='more-action'>
                                        <label className='mb-1'>Upload image</label>
                                        <input
                                            type='file'
                                            className='form-control'
                                            onChange={event => handleChooseFile(event)} />
                                    </div>
                                    <div className='mt-3'>
                                        <button
                                            type='button'
                                            onClick={() => { handleSaveQuiz() }}
                                            className='btn btn-warning'>Save</button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="list-detail"><TableQuiz /></div>
        </div>
    )
}
export default ManageQuiz;