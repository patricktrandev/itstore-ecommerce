
import './App.css';
import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";


import { Home } from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { PageNotFound } from './components/layout/PageNotFound';
import { ProductDetails } from './components/product/ProductDetails';

function App() {
  return (
    <Fragment>
      <Router>
        <div className="App">
          <Header />

          <div className='container' style={{ minHeight: '74vh' }}>

            <Route exact path='/' component={Home} />
            <Route exact path='/products/:id' component={ProductDetails} />


          </div>







          <Footer />
        </div>
      </Router>
    </Fragment>



  );
}

export default App;
