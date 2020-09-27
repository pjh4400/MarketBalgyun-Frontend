import React from 'react';
import { hot } from 'react-hot-loader/root'
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, Customer, Sale, Payment, Login, RegisterGeneralProduct, ConsignProduct } from './index.js';
const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/register-customer" component={Customer} />
                <Route path="/sale" component={Sale} />
                <Route path="/payment" component={Payment} />
                <Route path="/login" component={Login} />
                <Route path="/general-product" component={RegisterGeneralProduct} />
                <Route path="/consign-product" component={ConsignProduct} />
            </div>
        </BrowserRouter>
    );
}

export default hot(App);