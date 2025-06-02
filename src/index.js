
import ReactDOM from 'react-dom/client';
import Router from './Utils/Router';
import System from './Utils/System';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <System>
    
    <Router />
    <ToastContainer position="top-right" autoClose={3000} />
  </System>
);


