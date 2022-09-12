import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import LogIn from './pages/log-in/log-in.component';
import SignUp from './pages/sign-up/sign-up.component';
import Journal from './pages/journal/journal.component';
import About from './pages/about/about.component';
import Shop from './pages/shop/shop.component';
import Drafts from './pages/drafts/drafts.component';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { store } from './store'
import { Provider } from 'react-redux'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="journal" element={<Journal />} />
          <Route path="about" element={<About />} />
          <Route path="shop" element={<Shop />} />
          <Route path="drafts" element={<Drafts />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
