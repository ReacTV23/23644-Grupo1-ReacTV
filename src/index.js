import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { SearchProvider } from './context/searchContext'; 
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SearchProvider>
      <App />
    </SearchProvider>
);

