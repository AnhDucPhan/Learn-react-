import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../service/apiService";
import _ from 'lodash';
import './detailQuiz.scss'
import Question from "./question";
import ModalResult from "./modalResult";
import { toast } from 'react-toastify';

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id
    const location = useLocation();
    const [dataQuiz, setDataQuiz] = useState([])
    const [index, setIndex] = useState(0)
    const [isShowModalResult, setIsShowModalResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState({})

    useEffect(() => {
        FetchQuestions();
    }, [quizId])

    const FetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {

                    let questionDescription, image = null;
                    let answer = [];

                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image
                        }
                        item.answers.isSelected = false;
                        answer.push(item.answers);
                    })

                    return { questionId: key, answer, questionDescription, image }
                })
                .value()
            setDataQuiz(data);
        }
    }

    const handlePrev = () => {
        if (index - 1 < 0) {
            return;
        } else
            setIndex(index - 1)
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }
    const handleFinish = async () => {
        console.log('check finish: ', dataQuiz)
        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answers = []
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(item => {
                let questionId = item.questionId;
                let userAnswerId = [];
                item.answer.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId,
                })
            })
            payload.answers = answers;
            let res = await postSubmitQuiz(payload);
            console.log('check res quiz: ', res)
            if (res && res.EC === 0) {
                setIsShowModalResult(true)
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                toast.success(res.EM)
            }
        }
    }

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId);
        if (question && question.answer) {
            question.answer = question.answer.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected
                }
                return item;
            })
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone)
        }
    }


    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">Quiz {quizId}: {location?.state?.quizTitle}</div>
                <hr />
                <div className="q-body">
                    <img />
                </div>
                <div className="q-content">
                    <Question
                        handleCheckbox={handleCheckbox}
                        index={index}
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []} />
                </div>
                <div className="footer">
                    {index !== 0 &&
                        <button onClick={() => handlePrev()} className="btn btn-secondary ">Prev</button>}
                    {dataQuiz.length > index + 1 ?
                        <button onClick={() => handleNext()} className="btn btn-primary">Next</button>
                        :
                        <button onClick={() => handleFinish()} className="btn btn-success">finish</button>

                    }
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    )
}

export default DetailQuiz;