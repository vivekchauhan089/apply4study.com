import React from 'react';
import '../Rules/Rules.css';

// COMPONENT TO EXPLAIN QUIZ RULES //
const Rules = (props) => {
    return (
        <div className='Rules-block' style={{marginTop: '90px'}}>
            <h2 style={{textTransform: 'uppercase', letterSpacing: 6, textAlign: 'center'}}>Student Evaluation {props.title}</h2>
            <hr />
            <ul>
                <li>
                    Click on the desired option to automatically save and proceed.
                </li>
                <li>
                    Option once choosen can't be changed, so choose wisely.
                </li>
                <li>
                    The next question shall load automatically after you finish the ongoing question.
                </li>
                <li>
                    Results along with correct and incorrect options shall be shared at the end of the QUIZ.
                </li>
            </ul>
        </div>
    );
};

export default Rules;