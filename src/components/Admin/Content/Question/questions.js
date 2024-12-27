import { useState } from 'react';
import Select from 'react-select';
import './questions.scss'
import { BsPatchPlusFill } from "react-icons/bs";
import { BsPatchMinusFill } from "react-icons/bs";
import { RiImageAddFill } from 'react-icons/ri'
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'

const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: 'question 1',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: 'answer',
                    isCorrect: false
                }
            ]

        },

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
        console.log('check type:', type, 'check question:', questionId, 'check answer:', answerId)
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
                                />
                                <label>Question {index + 1} description</label>
                            </div>
                            <div className='group-upload'>
                                <label><RiImageAddFill className='label-up' /></label>
                                <input type='file' hidden></input>
                                <span>myImage.png</span>
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
                        {question && question.answers.length > 0 && question.answers.map((answer, index) => {
                            return (
                                <div key={answer.id} className='answers-content'>
                                    <input
                                        className="form-check-input iscorrect"
                                        type="checkbox"

                                    />
                                    <div className="form-floating answer-name ">
                                        <input
                                            value={answer.description}
                                            type="text" className="form-control" placeholder="name@example.com" />
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

        </div>
    )
}
export default Questions;