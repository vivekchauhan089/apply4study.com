/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import '../Home/Home.css';

import Course1 from "../../assets/images/course1.jpg";
import Course2 from "../../assets/images/course2.jpg";

import Promos from '../../components/Promos/Promos';

const Home = () => {
    const [popularCourse, setPopularCourse] = useState([
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
        <div className="Home-block">
            <Promos 
                left="Get the best." 
                right="Be the best!" 
                text="Get the most out of MasterBridge, the NO1 regional learning website."
                />
            <div className="Home-block__elem--popularContainer">
                <h2><b>Popular</b> this week</h2>  
                <div className="Home-block__elem--popularInsideContainer">
                    {popularCourse && popularCourse.map(elem => (<li key={elem.ID}>
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
                        </li>)
                    )}   
                </div>       
            </div>
        </div>
    );
};

export default Home;