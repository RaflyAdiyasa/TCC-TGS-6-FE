import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change here
import App from './App';
import "bulma/css/bulma.css";

// Create root and render
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
