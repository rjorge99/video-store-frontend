import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { VideoStore } from './app/VideoStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<VideoStore />);
