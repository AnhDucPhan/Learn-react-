import { useState } from 'react';
import Select from 'react-select';
import './questions.scss'
import { BsPatchPlusFill } from "react-icons/bs";
import { BsPatchMinusFill } from "react-icons/bs";
import { RiImageAddFill } from 'react-icons/ri'
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import Lightbox from "react-awesome-lightbox";

const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [isPreviewImage, setIsPreviewImage] = useState(false)
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

    const handleSaveQuestionForQuiz = () => {
        console.log('check question: ', questions)
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
                        options={options}
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