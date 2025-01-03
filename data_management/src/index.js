import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Register from './register/register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewData from './components/view';
import Dashboard from './components/dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
  
<Router>
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/view" element={<ViewData />} />
      </Routes>
    </div>
  </Router>);

