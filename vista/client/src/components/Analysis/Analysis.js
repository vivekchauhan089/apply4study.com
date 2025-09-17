import React from 'react';
import '../Analysis/Analysis.css';

import { CircularProgress } from '@material-ui/core'

const Anaylysis = props => {
    const quiz1Result = localStorage.getItem('quiz1Result');
    const quizFinalResult = localStorage.getItem('quizFinalResult')
    return (
        <div className="Analysis-block">
            <h2>Student Analysis Report</h2>
            <div className="Analysis-block__elem--quizContainer">
                <div className="Analysis-block__elem--quiz1">
                    <h4>Quiz 1 Analysis</h4>
                    <CircularProgress
                        size={240}
                        value={quiz1Result*12}
                        thickness={22}
                        variant="static"
                        style={{backgroundColor: '#f44336', borderRadius: '50%', color: "#4caf50", opacity: 0.8}}
                    />
                    <h6>{quiz1Result}/5</h6>
                    <h6>{quiz1Result > 8 ? 'Good Job' : 'Practice More!'}</h6>
                </div>
                <div className="Analysis-block__elem--finalQuiz">
                    <h4>Final Quiz Analysis</h4>
                    <CircularProgress
                        size={240}
                        value={quizFinalResult*12}
                        thickness={22}
                        variant="static"
                        style={{backgroundColor: '#f44336', borderRadius: '50%', color: "#4caf50", opacity: 0.8}}
                    />
                    <h6>{quizFinalResult}/10</h6>
                    <h6>{quiz1Result > 8 ? 'Good Job' : 'Practice More!'}</h6>
                </div>
            </div>
        </div>
    );
};

export default Anaylysis