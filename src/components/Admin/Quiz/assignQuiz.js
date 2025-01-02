import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllQuizForAdmin, getAllUser, postAssignQuiz } from '../../../service/apiService';
import { toast } from 'react-toastify';


const AssignQuiz = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [listQuiz, setListQuiz] = useState([])

    const [selectedUser, setSelectedUser] = useState({})
    const [listUser, setListUser] = useState([])

    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, [])
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.name}`
                }
            }
            )
            setListQuiz(newQuiz)

        }
    }
    const fetchUser = async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            let users = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.username}-${item.email}`
                }
            }
            )
            setListUser(users)

        }
    }

    const handleAssignQuiz = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        if (res && res.EC === 0) {
            toast.success(res.EM)
        }
        if (res.EC !== 0) {
            toast.error(res.EM)
        }
        console.log('check res:', res)
    }

    return (
        <div className="assign-quiz-container row">
            <div className='col-6 form-group'>
                <label className='mb-2'>Select Quiz</label>
                <Select
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className='col-6 form-group'>
                <label className='mb-2'>Select User</label>
                <Select
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button
                    onClick={() => handleAssignQuiz()}
                    className='btn btn-warning mt-3'
                >Assign</button>
            </div>
        </div>
    )
}

export default AssignQuiz