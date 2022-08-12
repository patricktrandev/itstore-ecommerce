import { useEffect } from 'react'
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
import { Login } from './components/users/Login';
import { Register } from './components/users/Register';
import { loadUserAction } from './redux/actions/usersAction'
import { store } from './redux/storeReducer'
import { Profile } from './components/users/Profile';
import { ProtectedRoute } from './components/route/ProtectedRoute';
import { UpdateProfile } from './components/users/UpdateProfile';
import { UpdatePassword } from './components/users/UpdatePassword';
import { ForgotPassword } from './components/users/ForgotPassword';
import { ResetPassword } from './components/users/ResetPassword';
import { Cart } from './components/cart/Cart';
import { Shipping } from './components/cart/Shipping';
function App() {

  useEffect(() => {
    store.dispatch(loadUserAction())
  }, [])
  return (
    <Fragment>
      <Router>
        <div className="App">
          <Header />

          <div className='container' style={{ minHeight: '74vh' }}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/search/:keyword' component={Home} />
              <Route exact path='/products/:id' component={ProductDetails} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />

              <ProtectedRoute exact path='/me' component={Profile} />
              <ProtectedRoute exact path='/me/update' component={UpdateProfile} />
              <ProtectedRoute exact path='/password/update' component={UpdatePassword} />
              <Route exact path='/forgot-password' component={ForgotPassword} />
              <Route exact path='/password/reset/:token' component={ResetPassword} />


              <Route exact path='/cart' component={Cart} />
              <ProtectedRoute exact path='/shipping' component={Shipping} />

              <Route path='*' component={PageNotFound} />
            </Switch>


          </div>







          <Footer />
        </div>
      </Router>
    </Fragment>



  );
}

export default App;
