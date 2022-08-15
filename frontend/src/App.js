import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios'
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
import { ConfirmOrder } from './components/cart/ConfirmOrder';
import { Payment } from './components/cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { OrderSuccess } from './components/cart/OrderSuccess';
import { OrdersList } from './components/order/OrdersList';
import { OrderDetails } from './components/order/OrderDetails';
import { Dashboard } from './components/admin/Dashboard';
import { ProductsList } from './components/admin/ProductsList';
import { NewProduct } from './components/admin/NewProduct';
import { useSelector } from 'react-redux'
import { UpdateProduct } from './components/admin/UpdateProduct';
import { OrdersListAdmin } from './components/admin/OrdersListAdmin';
import { ProcessOrder } from './components/admin/ProcessOrder';
import { UserListAdmin } from './components/admin/UserListAdmin';
import { UpdateUserByAdmin } from './components/admin/UpdateUserByAdmin';
import { ProductReviews } from './components/admin/ProductReviews';
import { CouponBanner } from './components/layout/CouponBanner';
function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');
  const { loading, error, isAuthenticated, user } = useSelector(state => state.userReducer)
  useEffect(() => {
    store.dispatch(loadUserAction())
    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey)
    }


    getStripeApiKey();
  }, [])

  return (
    <Fragment>
      <Router>
        <div className="App">
          {/* <CouponBanner /> */}
          <Header />

          <div className='container'>

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
            <ProtectedRoute exact path='/success' component={OrderSuccess} />
            <ProtectedRoute exact path='/orders/me' component={OrdersList} />
            <Route exact path='/order/:id' component={OrderDetails} />



            <ProtectedRoute exact path='/confirm' component={ConfirmOrder} />
            {

              stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute exact path='/payment' component={Payment} />
              </Elements>
            }






          </div>
          <ProtectedRoute exact path='/dashboard' isAdmin={true} component={Dashboard} />
          <ProtectedRoute exact path='/admin/products' isAdmin={true} component={ProductsList} />
          <ProtectedRoute exact path='/admin/product' isAdmin={true} component={NewProduct} />
          <ProtectedRoute exact path='/admin/product/:id' isAdmin={true} component={UpdateProduct} />
          <ProtectedRoute exact path='/admin/orders' isAdmin={true} component={OrdersListAdmin} />
          <ProtectedRoute exact path='/admin/orders/:id' isAdmin={true} component={ProcessOrder} />
          <ProtectedRoute exact path='/admin/users' isAdmin={true} component={UserListAdmin} />
          <ProtectedRoute exact path='/admin/user/:id' component={UpdateUserByAdmin} />
          <ProtectedRoute exact path='/admin/reviews' isAdmin={true} component={ProductReviews} />
          {
            !loading && (!isAuthenticated || user.role !== 'admin') && (
              <Footer />
            )
          }




        </div>
      </Router>
    </Fragment>



  );
}

export default App;
