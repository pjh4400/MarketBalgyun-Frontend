import React from 'react';
import { hot } from 'react-hot-loader/root'
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, Customer, Sale, RegisterGeneralProduct, SearchProduct, ConsignProduct } from './index.js';
const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/register-customer" component={Customer} />
                <Route path="/sale" component={Sale} />
                <Route path="/general-product" component={RegisterGeneralProduct} />
                <Route path="/consign-product" component={ConsignProduct} />
                <Route path="/search" component={SearchProduct} />
            </div>
        </BrowserRouter>
    );
}

export default hot(App);