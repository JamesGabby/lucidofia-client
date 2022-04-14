import './App.css';
import Header from './components/header/header.component';
import LandingPageVideo from './components/landing-page-video/landing-page-video.component';
import LandingPageInfo from './components/landing-page-info/landing-page-info.component';
import React from 'react';

class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <LandingPageVideo />
        <LandingPageInfo />
      </div>
    );
  }
}

export default App;
