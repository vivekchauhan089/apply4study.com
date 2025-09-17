import React, { useState } from 'react';
import quiz from '../FinalQuiz.json';
import '../QuestionCardFinal/QuestionCardFinal.css';

import ResultFinal from '../ResultFinal/ResultFinal';
import Rules from '../components/Rules/Rules';

// ARRAY USED FOR RESULT //
const green = [];

// MAIN FUNC //
const QuestionCard = props => {
    console.log(quiz);
    // QUIZ QS COUNTER //
    const [i, setI] = useState(0); 
    // SAVE INPUT ANSWER //
    const saveAnswerHandler = (questionIndex, answerIndex) => {
        //console.log(questionIndex);
        //console.log(answerIndex);
        const correctIndex = quiz.questions[questionIndex].correctIndex;
        // CORRECT ANSWER //
        if(quiz.questions[questionIndex].answers[correctIndex] === quiz.questions[questionIndex].answers[answerIndex]){
            console.log('Correct');
            green.push({questionNo: questionIndex,correct: true, choice: answerIndex});
            setI(i+1);
        } else {
            // INCORRECT ANSWER //
            console.log('Incorrect');
            green.push({questionNo: questionIndex, correct: false, choice: answerIndex});
            setI(i+1);
        }
    };
    // DISPLAY RESULT AT END OF QUIZ //
    if(i === quiz.questions.length){
        console.log('Break');
        return (
            <ResultFinal answers={green}/>
        );
    }
    return (
        <>
        <p style={{backgroundColor: '#5B32E2', width: "100%", margin: 0, height: 50, paddingTop: 25}}>NavBar</p>
        <Rules />
        <div className='QuestionCard-block'>
            <form onSubmit={(e) => {
                e.preventDefault();
                setI(i+1);
                //console.log(i);
                }}>
                <div className='QuestionCard-block__elem--qs'>
                   Q{i+1}. {quiz.questions[i].question}
                </div>
                <hr />
                <div className='QuestionCard-block__elem--ans'>
                    <a className='QuestionCard-block__elem--ansIndividual'
                    onClick={saveAnswerHandler.bind(this, i, 0)}
                    >
                        a. {quiz.questions[i].answers[0]}
                   </a>

                    <a className='QuestionCard-block__elem--ansIndividual'
                    onClick={saveAnswerHandler.bind(this, i, 1)}
                    >b. {quiz.questions[i].answers[1]}</a>

                    <a className='QuestionCard-block__elem--ansIndividual'
                    onClick={saveAnswerHandler.bind(this, i, 2)}
                    >c. {quiz.questions[i].answers[2]}</a>

                    <a className='QuestionCard-block__elem--ansIndividual'
                    onClick={saveAnswerHandler.bind(this, i, 3)}
                    >d. {quiz.questions[i].answers[3]}</a>
                </div>
                
            </form>
        </div>
        </>
    );
};

export default QuestionCard;