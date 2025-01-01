import { useEffect, useState } from 'react';
import Select from 'react-select';
import './questions.scss'
import { BsPatchPlusFill } from "react-icons/bs";
import { BsPatchMinusFill } from "react-icons/bs";
import { RiImageAddFill } from 'react-icons/ri'
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import Lightbox from "react-awesome-lightbox";
import {
    getAllQuizForAdmin,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion
} from '../../../../service/apiService'
import { toast } from 'react-toastify';



const Questions = (props) => {

    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [listQuiz, setListQuiz] = useState([])
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: '',
    })
    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]

        }

    ])

    useEffect(() => {
        fetchQuiz();
    }, [])
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.description}`
                }
            }
            )
            setListQuiz(newQuiz)

        }
    }


    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'Add') {
            const newQuestion =
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                ]

            }
            setQuestions([...questions, newQuestion])
        }
        if (type === 'Remove') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id)
            setQuestions(questionClone)
        }
        console.log('check>>>>', type, id)
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionClone = _.cloneDeep(questions)
        if (type === 'Add') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = questionClone.findIndex(item => item.id === questionId)
            questionClone[index].answers.push(newAnswer);
            setQuestions(questionClone)

        }
        if (type === 'Remove') {
            let index = questionClone.findIndex(item => item.id === questionId)
            questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionClone)
        }
    }

    const handleOnchange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions)
            let index = questionsClone.findIndex(item => item.id === questionId)
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone)
            }
        }
    }

    const handleOnchangeQuestionFile = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone)
        }
    }


    // Xử lí checked or uncheck
    const handleCheckAnswer = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKED') {
                        answer.isCorrect = value
                    }
                    if (type === 'INPUT') {
                        answer.description = value
                    }
                }
                return answer;
            });
            setQuestions(questionsClone)
        }
    }

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            })
            setIsPreviewImage(true)
        }
    }

    //lưu câu hỏi và câu trả lời 
    const handleSaveQuestionForQuiz = async () => {
        //validate quiz
        if (_.isEmpty(selectedQuiz)) {
            toast.error('please choose a quiz test')
        }

        //validate answer
        let validAnswer = true;
        let indexQ = 0, indexA = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    validAnswer = false;
                    indexA = j
                    break;
                }
            }
            indexQ = i;
            if (validAnswer === false)
                break;

        }
        if (validAnswer === false) {
            toast.error(`Empty answer ${indexA + 1} at question ${indexQ + 1}`)
            return;
        }

        //validate
        let validQuestion = true;
        let indexQuestion = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                validQuestion = false
                indexQuestion = i
                break;
            }
            
        }
        if (validQuestion === false) {
            toast.error(`Empty question ${indexQuestion + 1}`)
            return;
        }

        
        //lưu câu hỏi vào api
        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile)
            //lưu câu trả lời 
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuestion(
                    answer.description,
                    answer.isCorrect,
                    q.DT.id)
            }

        }

    }

    return (
        <div className="questions-container">
            <div className="title">
                Manage Question
            </div>
            <hr />
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>

                <div className='mt-3 mb-2'>Question description:</div>
                {questions && questions.length > 0 && questions.map((question, index) => {
                    return (
                        <div className='q-main mb-4' key={questions.id}>
                            <div className='questions-content'>
                                <div className="form-floating description ">
                                    <input
                                        type="type"
                                        className="form-control"
                                        placeholder="name@example.com"
                                        value={question.description}
                                        onChange={(event) => { handleOnchange('QUESTION', question.id, event.target.value) }}
                                    />
                                    <label>Question {index + 1} description</label>
                                </div>
                                <div className='group-upload'>
                                    <label htmlFor={`${question.id}`}><RiImageAddFill className='label-up' /></label>
                                    <input
                                        id={`${question.id}`}
                                        onChange={(event) => { handleOnchangeQuestionFile(question.id, event) }}
                                        type='file' hidden></input>
                                    <span>{question.imageName ?
                                        <span
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handlePreviewImage(question.id)}>{question.imageName}
                                        </span>
                                        :
                                        '0 file is uploaded'}</span>
                                </div>
                                <div className='btn-add'>
                                    <span onClick={() => { handleAddRemoveQuestion('Add', '') }}>
                                        <BsPatchPlusFill className='icon-add' />
                                    </span>
                                    {questions && questions.length > 1 &&
                                        <span onClick={() => { handleAddRemoveQuestion('Remove', question.id) }}>
                                            <BsPatchMinusFill className='icon-remove' />
                                        </span>
                                    }
                                </div>


                            </div>
                            {question && question.answers && question.answers.length > 0 && question.answers.map((answer, index) => {
                                return (
                                    <div key={answer.id} className='answers-content'>
                                        <input
                                            className="form-check-input iscorrect"
                                            type="checkbox"
                                            checked={answer.isCorrect}
                                            onChange={(event) => { handleCheckAnswer('CHECKED', answer.id, question.id, event.target.checked) }}
                                        />
                                        <div className="form-floating answer-name ">
                                            <input
                                                value={answer.description}
                                                type="text" className="form-control" placeholder="name@example.com"
                                                onChange={(event) => { handleCheckAnswer('INPUT', answer.id, question.id, event.target.value) }}

                                            />
                                            <label>Answer {index + 1}</label>

                                        </div>
                                        <div className='btn-group'>
                                            <span onClick={() => handleAddRemoveAnswer('Add', question.id)}>
                                                <BsPatchPlusFill className='icon-add' />
                                            </span>
                                            {question.answers.length > 1 &&
                                                <span onClick={() => handleAddRemoveAnswer('Remove', question.id, answer.id)}>
                                                    <BsPatchMinusFill className='icon-remove' />
                                                </span>
                                            }
                                        </div>
                                    </div>
                                )
                            })}


                        </div>

                    )
                })}
                {isPreviewImage === true &&
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)} >
                    </Lightbox>
                }

                {questions && questions.length > 0 &&
                    <div>
                        <button
                            onClick={() => handleSaveQuestionForQuiz()}
                            className='btn btn-warning'>Save</button>
                    </div>}
            </div>

        </div>
    )
}
export default Questions;