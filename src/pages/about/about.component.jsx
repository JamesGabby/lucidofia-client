import React from "react";
import './about.styles.css'
import Header from "../../components/header/header.component";

const About = () => {

    return (
        <div>
            <div className="about">
                <Header />
                <div className="about-container">
                    <h3>Have you ever had a dream that you were so sure was real? What if you couldn't awaken? How would you know the difference between dream and reality? </h3>
                    <p>- Morpheus, The Matrix</p>
                </div>
                
            </div>
        </div>
    );
}

export default About;