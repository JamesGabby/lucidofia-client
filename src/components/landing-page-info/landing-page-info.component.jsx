import React from "react";
import './landing-page-info.styles.css'

class LandingPageInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }
    
    render() {
        return (
            <div>
                <div className="info-border">
                    <div className="info-container">
                        <div className="info">
                            <h1>Experience Consciousness from a Whole New Light</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci optio eligendi, voluptas, inventore exercitationem similique ullam maxime quam molestias odio, sapiente aliquam modi! Quis impedit ex iure vitae, sapiente delectus.</p>
                        </div>
                        <div className="info">
                            <h1>Gain an Entire New Perspective of Yourself & Reality</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, facere? Ad repellat, expedita laboriosam iste sunt debitis est nemo, magni, beatae a magnam doloribus ullam reiciendis eaque. Beatae, expedita aspernatur?</p>
                        </div>
                        <div className="info">
                            <h1>Explore the Depths of Nonphysical Phenomena</h1>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla corporis laudantium quasi reprehenderit repudiandae sed vel explicabo accusamus numquam laborum! Accusantium repudiandae recusandae minima nesciunt fuga quidem laborum nam aspernatur!</p>
                        </div>
                    </div> 
                </div>
            </div>
        );
    }
}

export default LandingPageInfo;

