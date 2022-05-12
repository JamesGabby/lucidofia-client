import React from "react";
import './landing-page-video.styles.css'

class LandingPageVideo extends React.Component {    
    render() {
        return (
            <div className="video-container">
                <div className="overlay" />
                <video src={process.env.PUBLIC_URL + '/dreamy.mp4'} loop autoPlay muted />
                <div className="overlay-text">
                    <h2 id="overlay-title">Lucidofia</h2>
                    <p id="overlay-subtitle">Wake up to the reality of dreams</p>
                </div>
            </div>
        );
    }
}

export default LandingPageVideo;

