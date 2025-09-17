import React from 'react';
import '../Promos/Promos.css';

import { Avatar } from '@material-ui/core'

const Promos = props => {
    const topTutors = [
        {
                ID: 1,
                name: "Lana Marandina",
                username: "lanamara",
                dp: "http://placeimg.com/100/100/people?tutors-" + 1,
        },
        {
            ID: 2,
            name: "Lana Marandina",
            username: "lanamara",
            dp: "http://placeimg.com/100/100/people?tutors-" + 2,
        },        
        {
            ID: 3,
            name: "Lana Marandina",
            username: "lanamara",
            dp: "http://placeimg.com/100/100/people?tutors-" + 3,
        },
        {
            ID: 4,
            name: "Lana Marandina",
            username: "lanamara",
            dp: "http://placeimg.com/100/100/people?tutors-" + 4,
        },
        {
            ID: 5,
            name: "Lana Marandina",
            username: "lanamara",
            dp: "http://placeimg.com/100/100/people?tutors-" + 5,
        },        
        {
            ID: 6,
            name: "Lana Marandina",
            username: "lanamara",
            dp: "http://placeimg.com/100/100/people?tutors-" + 6,
        }
    ]
    return (
        <React.Fragment>
        <div className="Promos-block">
            <div className="Promos-block__elem--gifContainer">
                <img src={require('../../assets/gifs/job_promo.gif')} alt="" />
            </div>
            <div className="Promos-block__elem--textContainer">
                <p className="Promos-block__elem--textLeft">{props.left}</p> <br/>
                <p className="Promos-block__elem--textRight">{props.right}</p>
            </div>
            <div className="Promos-block__elem--gifContainer hide-on-1439">
                <img src={require('../../assets/gifs/future_promo.gif')} alt="" />
            </div>
        </div>
        <div>
        <h2 className="Promos-block__elem--topTutorh2">Top Tutors</h2>
        <div className="Promos-block__elem--topTutorContainer">
            {topTutors.map(elem => (<li key={elem.ID}>
                <div className="Promos-block__elem--topTutorIndividualContainer">
                    <div style={{margin: 0, display: "flex", justifyContent: 'center', alignItems: 'center', width: 40}}>
                        <Avatar src={elem.dp} className="Promos-block__elem--topTutor"/>
                    </div>
                    <div>
                        <b>{elem.name}</b>
                        <p style={{margin: 5}}>@{elem.username}</p>
                    </div>
                </div>
            </li>))}
        </div>
    </div>
    </React.Fragment>
    );
};

export default Promos;