import { combineReducers } from 'redux';
import userReducer from './userReducer';
import adminReducer from './adminReducer';
import categoriesReducer from './categoriesReducer';
import productsReducer from './productsReducer';
import weightReducer from './weightReducer';
import priceReducer from './priceReducer';
import stockReducer from './stockReducer';
import cartReducer from './cartReducer';
import buyerReducer from './buyerReducer';
import transactionReducer from './transactionReducer';
import transactionmethodReducer from './transmethReducer';
import transactionstatusReducer from './transstatusReducer';
import transactionHistoryReducer from './transactionHistoryReducer';
import wishlistReducer from './wishlistReducer';

export default combineReducers({
    user: userReducer,
    admin: adminReducer,
    categories: categoriesReducer,
    products: productsReducer,
    weight: weightReducer,
    price: priceReducer,
    stock: stockReducer,
    cart: cartReducer,
    buyer: buyerReducer,
    transaction: transactionReducer,
    transactionmethod: transactionmethodReducer,
    transactionstatus: transactionstatusReducer,
    transactionhistory: transactionHistoryReducer,
    wishlist: wishlistReducer
})