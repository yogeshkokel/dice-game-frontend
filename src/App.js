import React from 'react';
import { Provider } from 'react-redux';
//import store
import store from './store/index';
// import router
import Router from './Router';
//CSS Imports
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router />
      </div>
    </Provider >
  );
}

export default App;
