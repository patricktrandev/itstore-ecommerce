
import './App.css';
import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";


import { Home } from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { PageNotFound } from './components/layout/PageNotFound';

function App() {
  return (
    <Fragment>
      <Router>
        <div className="App">
          <Header />

          <div className='container'>

            <Route exact path='/' component={Home} />



          </div>





          <Footer />
        </div>
      </Router>
    </Fragment>



  );
}

export default App;
