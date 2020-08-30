import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, RegisterCustomer, Sale } from './index.js';

const App = ({store}) => {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/register-customer" component={RegisterCustomer}/>
                <Route path="/sale" component={Sale}/>
            </div>
        </BrowserRouter>
    );
}

export default App;