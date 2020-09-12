import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, Customer, Sale, Payment, RegisterGeneralProduct } from './index.js';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/register-customer" component={Customer}/>
                <Route path="/sale" component={Sale}/>
                <Route path="/payment" component={Payment}/>
                <Route path="/register-general-product" component={RegisterGeneralProduct}/>
            </div>
        </BrowserRouter>
    );
}

export default App;