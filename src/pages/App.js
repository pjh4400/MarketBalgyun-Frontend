import React from 'react';
import { hot } from 'react-hot-loader/root'
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, Login, Customer, Sale, RegisterProduct, SearchProduct, ModifyProduct, Trader, AccouontInfo } from './index.js';
const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register-customer" component={Customer} />
                <Route path="/sale" component={Sale} />
                <Route path="/register-product" component={RegisterProduct} />
                <Route path="/modify-product" component={ModifyProduct} />
                <Route path="/search" component={SearchProduct} />
                <Route path="/trader" component={Trader} />
            </div>
        </BrowserRouter>
    );
}

export default hot(App);