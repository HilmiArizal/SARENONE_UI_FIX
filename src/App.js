import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { keepLogin } from './Redux/Actions';
import { connect } from 'react-redux';
import Categories from './AdminPages/Categories';
import HomeAdmin from './AdminPages/HomeAdmin';
import LoginAdmin from './AdminPages/LoginAdmin';
import ManageUsers from './AdminPages/ManageUsers';
import Products from './AdminPages/Products';
import ManageProduct from './AdminPages/ManageProducts';
import DetailProducts from './AdminPages/DetailProducts';
import ListWeightPrice from './AdminPages/List';
import LoginPage from './UserPages/LoginPage';
import RegisterPage from './UserPages/RegisterPage';
import UnverifiedPage from './UserPages/UnverifiedPage';
import VerifiedPage from './UserPages/VerifiedPage';
import HomePage from './UserPages/HomePage';
import ProductPage from './UserPages/ProductPage';
import DetailProdukPage from './UserPages/DetailProductPage';
import CartPage from './UserPages/CartPage';
import TransactionPage from './UserPages/TransactionPage';
import ManageTransaction from './AdminPages/ManageTransaction';
import SuccessTransaction from './AdminPages/SuccessTransaction';
import FailTransaction from './AdminPages/FailTransaction';
import HistoryTransaction from './UserPages/HistoryTransaction';
import './CSS/CategoriesProduct.css';
import './App.css';

class App extends Component {

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.keepLogin()
    }
  }


  render() {
    if (this.props.role === 'admin') {
      return (
        <div id="font-BestProduct" className="App">
          <Route path="/adminlogin" component={LoginAdmin} />
          <Route path="/homeadmin" component={HomeAdmin} />
          <Route path="/manageuser" component={ManageUsers} />
          <Route path="/manageallproduct" component={ManageProduct} />
          <Route path="/managecategories" component={Categories} />
          <Route path="/manageproducts" component={Products} />
          <Route path="/detailproducts" component={DetailProducts} />
          <Route path="/manageweightlist" component={ListWeightPrice} />
          <Route path="/managetransaction" component={ManageTransaction} />
          <Route path="/transactionsuccess" component={SuccessTransaction} />
          <Route path="/transactionfail" component={FailTransaction} />
        </div>
      )
    } else if (this.props.role === 'user') {
      return (
        <div className="App">
          <Route path="/" component={HomePage} exact />
          <Route path="/unverified" component={UnverifiedPage} />
          <Route path="/adminlogin" component={LoginAdmin} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/verified" component={VerifiedPage} />
          <Route path="/product" component={ProductPage} />
          <Route path="/detailproduct" component={DetailProdukPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/transaction" component={TransactionPage} />
          <Route path="/historytransaction" component={HistoryTransaction} />
        </div>
      );
    }
    return (
      <div className="App">
        <Route path="/" component={HomePage} exact />
        <Route path="/unverified" component={UnverifiedPage} />
        <Route path="/adminlogin" component={LoginAdmin} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/verified" component={VerifiedPage} />
        <Route path="/product" component={ProductPage} />
        <Route path="/detailproduct" component={DetailProdukPage} />
        <Route path="/cart" component={CartPage} />
      </div>
    )
  }
}

const mapStatetoProps = ({ user }) => {
  return {
    role: user.role
  }
}

export default connect(mapStatetoProps, { keepLogin })(App);