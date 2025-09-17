import React, { useState } from 'react';
import quiz from '../FinalQuiz.json';
import '../ResultFinal/ResultFinal.css';

import { CircularProgress } from '@material-ui/core'

// THE RESULT SCREEN //
const ResultFinal = props => {
    console.log(props.answers);
    var result = 0;
    // DISPLAY SINGLE QS INSIDE OF A li tag //
const data = props.answers.map((elem) => <li key={elem.questionNo}>
    <div className='Result-block'>
        <div className='Result-block__elem--qs'>
            Q{elem.questionNo+1}. {quiz.questions[elem.questionNo].question}
        </div>
        <hr />
        <div className='Result-block__elem--ans'>
            <p 
            className={quiz.questions[elem.questionNo].correctIndex === 0 ? 'green' : ''}
            id={quiz.questions[elem.questionNo].correctIndex !== elem.choice && elem.choice === 0 ? 'red' : ''}
            >
                a. {quiz.questions[elem.questionNo].answers[0]}
            </p>
            <p 
            className={quiz.questions[elem.questionNo].correctIndex === 1 ? 'green' : ''}
            id={quiz.questions[elem.questionNo].correctIndex !== elem.choice && elem.choice === 1 ? 'red' : ''}
            >
                b. {quiz.questions[elem.questionNo].answers[1]}
            </p>
            <p 
            className={quiz.questions[elem.questionNo].correctIndex === 2 ? 'green' : ''}
            id={quiz.questions[elem.questionNo].correctIndex !== elem.choice && elem.choice === 2 ? 'red' : ''}
            >
                c. {quiz.questions[elem.questionNo].answers[2]}
            </p>
            <p 
            className={quiz.questions[elem.questionNo].correctIndex === 3 ? 'green' : ''}
            id={quiz.questions[elem.questionNo].correctIndex !== elem.choice && elem.choice === 3 ? 'red' : ''}
            >
                d. {quiz.questions[elem.questionNo].answers[3]}
            </p>
        </div>
    </div>
</li>);
    // CALCULATE THE USER RESULT //
    const resultCalculate = () => {
        const resultArr = props.answers.filter((elem) => elem.correct === true);
        result = resultArr.length
        console.log(result);
        localStorage.setItem('quizFinalResult', result);
    };

    resultCalculate();

    return (
        <div>
            <div className='Result-block--result'>
                <p>
                    Result Summary
                </p>
            </div>
            {data}
            <div className='Result-block--result'>
                <p>
                    Result: {result} / {props.answers.length}
                </p>
            </div>
            <div>
                <h2 style={{textTransform: 'uppercase', letterSpacing: 6}}>Pie Analysis</h2>
                    <p>{result*100/props.answers.length}% success!</p>
                <CircularProgress
                    size={240}
                    value={result*12}
                    thickness={22}
                    variant="static"
                    style={{backgroundColor: '#f44336', borderRadius: '50%', color: "#4caf50", opacity: 0.8}}
                    />
            </div>
        </div>
    );
};

export default ResultFinal;