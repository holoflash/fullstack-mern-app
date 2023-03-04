import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
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
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
