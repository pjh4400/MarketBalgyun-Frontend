import React from 'react';
import { hot } from 'react-hot-loader/root'
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, Customer, Sale, Payment, SignUp, Login, RegisterGeneralProduct, RegisterConsignProduct } from './index.js';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/register-customer" component={Customer} />
                <Route path="/sale" component={Sale} />
                <Route path="/payment" component={Payment} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/register-general-product" component={RegisterGeneralProduct} />
                <Route path="/register-consign-product" component={RegisterConsignProduct} />
            </div>
        </BrowserRouter>
    );
}

export default hot(App);