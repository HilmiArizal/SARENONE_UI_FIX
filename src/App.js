import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { keepLogin } from './Redux/Actions';
import { connect } from 'react-redux';
import HomeAdmin from './AdminPages/HomeAdmin';
import LoginAdmin from './AdminPages/LoginAdmin';


import LoginPage from './UserPages/LoginPage/LoginPage';
import RegisterPage from './UserPages/RegisterPage';
import UnverifiedPage from './UserPages/UnverifiedPage';
import VerifiedPage from './UserPages/VerifiedPage';
import ProductPage from './UserPages/ProductPage/ProductPage';
import CartPage from './UserPages/CartPage/CartPage';
import TransactionPage from './UserPages/TransactionPage/TransactionPage';
import HistoryTransaction from './UserPages/HistoryTransactionPage/HistoryTransaction';
import './App.css';
import Home from './UserPages/Home/Home';
import DetailProductPage from './UserPages/DetailProductPage/DetailProductPage';
// ADMIN
import ManageUsers from './AdminPages/ManageUsers/ManageUsers';
import FailTransaction from './AdminPages/ManageTransaction/FailTransaction';
import ProcessTransaction from './AdminPages/ManageTransaction/ProcessTransaction';
import SuccessTransaction from './AdminPages/ManageTransaction/SuccessTransaction';
import ManageProducts from './AdminPages/ManageProducts/ManageProducts';
import ManageCategories from './AdminPages/ManageProducts/ManageCategories';
import ManagePriceWeight from './AdminPages/ManageProducts/ManagePriceWeight';
import AddProduct from './AdminPages/ManageProducts/AddProduct';
import EditProduct from './AdminPages/ManageProducts/EditProduct';

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
          <Route path="/loginadmin" component={LoginAdmin} />
          <Route path="/homeadmin" component={HomeAdmin} />
          <Route path="/manageusers" component={ManageUsers} />
          <Route path="/manageproducts" component={ManageProducts} />
          <Route path="/managecategories" component={ManageCategories} />
          <Route path="/addproducts" component={AddProduct} />
          <Route path="/detailproducts" component={EditProduct} />
          <Route path="/managepriceweight" component={ManagePriceWeight} />
          <Route path="/transactionprocess" component={ProcessTransaction} />
          <Route path="/transactionfail" component={FailTransaction} />
          <Route path="/transactionsuccess" component={SuccessTransaction} />
        </div>
      )
    } else if (this.props.role === 'user') {
      return (
        <div className="App">
          <Route path="/" component={Home} exact />
          <Route path="/unverified" component={UnverifiedPage} />
          <Route path="/adminlogin" component={LoginAdmin} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/verified" component={VerifiedPage} />
          <Route path="/product" component={ProductPage} />
          <Route path="/detailproduct" component={DetailProductPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/transaction" component={TransactionPage} />
          <Route path="/historytransaction" component={HistoryTransaction} />
        </div>
      );
    }
    return (
      <div className="App">
        <Route path="/" component={Home} exact />
        <Route path="/unverified" component={UnverifiedPage} />
        <Route path="/loginadmin" component={LoginAdmin} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/verified" component={VerifiedPage} />
        <Route path="/product" component={ProductPage} />
        <Route path="/detailproduct" component={DetailProductPage} />
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