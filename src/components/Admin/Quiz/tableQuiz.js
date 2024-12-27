import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from '../../../service/apiService'
import ModalUpdateQuiz from "./modalUpdateQuiz";
import ModalDeleteQuiz from "./modalDeleteQuiz";
const TableQuiz = (props) => {

    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false)
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false)
    const [dataUpdateModalQuiz, setDataUpdateModalQuiz] = useState({})
    const [dataDeleteQuiz, setDataDeleteQuiz] = useState({})

    const [listQuiz, setListQuiz] = useState([]);
    useEffect(() => {
        fetchQuiz();
    }, [])
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
        console.log('check res quiz: ', res)
    }

    const handleShowHideModalUpdateQuiz = (dataQuiz) => {
        setShowModalUpdateQuiz(true)
        setDataUpdateModalQuiz(dataQuiz)
        console.log('check dataquiz: ', dataQuiz)
    }

    const fetchTableQuiz = async () => {
        setDataUpdateModalQuiz({})
        setDataDeleteQuiz({})
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }

    const handleShowHideModalDeleteQuiz = (item) => {
        setShowModalDeleteQuiz(true)
        setDataDeleteQuiz(item)
    }

    return (
        <>
            <div>List Quizzes</div>
            <table className="table table-hover table-bordered mt-2">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <th>{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{ display: 'flex', gap: '15px' }}>
                                    <button
                                        onClick={() => { handleShowHideModalUpdateQuiz(item) }}
                                        className="btn btn-warning">Edit</button>
                                    <button
                                        onClick={() => { handleShowHideModalDeleteQuiz(item) }}
                                        className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataUpdateModalQuiz}
                setDataUpdate={setDataUpdateModalQuiz}
                fetchTableQuiz={fetchTableQuiz}
            />
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataDeleteQuiz}
                fetchTableQuiz={fetchTableQuiz}
            />
        </>
    )
}
export default TableQuiz;