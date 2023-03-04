import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDbQ_Ty_8YOUxL3wffWjfN8W-YDx5o-Ubs",
  authDomain: "my-react-blog-1db0d.firebaseapp.com",
  projectId: "my-react-blog-1db0d",
  storageBucket: "my-react-blog-1db0d.appspot.com",
  messagingSenderId: "326670737694",
  appId: "1:326670737694:web:1792faad4f40d851caa90f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
