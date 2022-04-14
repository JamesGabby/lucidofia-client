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
            <div className="info-border">
                <div className="info-container">
                    <div className="info">
                        <h1>Lorem ipsum dolor, sit amet consec</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci optio eligendi, voluptas, inventore exercitationem similique ullam maxime quam molestias odio, sapiente aliquam modi! Quis impedit ex iure vitae, sapiente delectus.</p>
                    </div>
                    <div className="info">
                        <h1>Lorem ipsum dolor sit amet.</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla corporis laudantium quasi reprehenderit repudiandae sed vel explicabo accusamus numquam laborum! Accusantium repudiandae recusandae minima nesciunt fuga quidem laborum nam aspernatur!</p>
                    </div>
                    <div className="info">
                        <h1>ris iure itaque alias quo nihil. Quos animi ab.</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, facere? Ad repellat, expedita laboriosam iste sunt debitis est nemo, magni, beatae a magnam doloribus ullam reiciendis eaque. Beatae, expedita aspernatur?</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPageInfo;

