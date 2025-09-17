/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Course1 from "../../assets/images/course1.jpg";
import Course2 from "../../assets/images/course2.jpg";

const MyCourse = props => {
    const [myCourse, setMyCourse] = useState([
        {
            ID: 1,
            title: "Learning How to Create Beautiful Scenes in Illustrator in 60 minutes.",
            tutor: {
                ID: 1,
                name: "Lana Marandina",
                username: "lanamara",
                dp: "http://placeimg.com/100/100/people?tutor-1",
            },
            duration: "82 min",            
            poster: Course1
        },
        {
            ID: 2,
            title: "Creating a beautiful Portrait Illustration. Learning new Technics and Tricks.",
            tutor: {
                ID: 2,
                name: "Uran Design",
                username: "urancd",
                dp: "http://placeimg.com/100/100/people?tutor-2",
            },
            duration: "1 hr 13 min",            
            poster: Course2
        },
        {
            ID: 1,
            title: "Learning How to Create Beautiful Scenes in Illustrator in 60 minutes.",
            tutor: {
                ID: 1,
                name: "Lana Marandina",
                username: "lanamara",
                dp: "http://placeimg.com/100/100/people?tutor-3",
            },
            duration: "82 min",            
            poster: Course1
        },
        {
            ID: 2,
            title: "Creating a beautiful Portrait Illustration. Learning new Technics and Tricks.",
            tutor: {
                ID: 2,
                name: "Uran Design",
                username: "urancd",
                dp: "http://placeimg.com/100/100/people?tutor-4",
            },
            duration: "1 hr 13 min",            
            poster: Course2
        }
    ]);
    
    return (
        <div style={{backgroundColor: 'rgba(240, 240, 240, 0.75)', width: '100vw', height: '100vh', padding: '50px 20px'}}>
            {/* <p style={{backgroundColor: '#5B32E2', width: "100%", margin: 0, height: 50, paddingTop: 25}}>NavBar</p> */}
            <div className="Home-block__elem--popularContainer">
                <h2><b>Personal</b> Courses</h2>  
                <div className="Home-block__elem--popularInsideContainer">
                    {myCourse && myCourse.map(elem => (
                    <Link to={`/course/:${elem.ID}`}>
                    <li key={elem.ID}>        
                            <div className="Home-block__elem--popularIndividualContainer">
                                <div className="Home-block__elem--tutorContainer">
                                    <div className="Home-block__elem--tutorImageContainer">
                                        <img src={elem.tutor.dp} alt={elem.tutor.name} width={50} style={{borderRadius: '50%'}} />
                                    </div>
                                    <div className="Home-block__elem--tutorNameContainer">
                                        <p>{elem.tutor.name}</p>
                                        <p className="linearGradientText">@{elem.tutor.username}</p>
                                    </div>
                                </div>
                                <img src={elem.poster} alt="" width={300} />
                                <div className="Home-block__elem--courseTitleContainer">
                                    <p className="Home-block__elem--courseDuration">{elem.duration}</p>
                                    <p>{elem.title}</p>
                                </div>
                            </div>
                        </li>
                        </Link>
                        )
                    )}   
                </div>       
            </div>
        </div>
    );
};

export default MyCourse;