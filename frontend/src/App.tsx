/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductCreatePage from './pages/ProductCreatePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductDetailsUpdatePage from './pages/ProductDetailsUpdatePage';
import RegisterPage from './pages/RegisterPage';
import SignInPage from './pages/SignInPage';
import UserEditPage from './pages/UserEditPage';
import UsersListPage from './pages/UsersListPage';
import ProductsListPage from './pages/ProductsListPage';

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/product/:id" component={ProductDetailsPage} />
      <Route path="/admin/products/:id/update" component={ProductDetailsUpdatePage} />
      <Route path="/products/create" component={ProductCreatePage} />
      <Route path="/admin/userslist" component={UsersListPage} />
      <Route path="/admin/productsList" component={ProductsListPage} />
      <Route path="/admin/user/:id/edit" component={UserEditPage} />
      <Route path="/login" component={SignInPage} />
      <Route path="/register" component={RegisterPage} />
    </Switch>
    {/* <Footer /> */}
  </Router>
);

export default App;
