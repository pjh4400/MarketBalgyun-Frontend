import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, Customer, Sale, Payment } from './index.js';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/register-customer" component={Customer}/>
                <Route path="/sale" component={Sale}/>
                <Route path="/payment" component={Payment}/>
            </div>
        </BrowserRouter>
    );
}

export default App;