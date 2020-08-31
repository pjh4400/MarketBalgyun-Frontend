import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, RegisterCustomer, SaleContainer, Payment} from './index.js';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/register-customer" component={RegisterCustomer}/>
                <Route path="/sale" component={SaleContainer}/>
                <Route path="/payment" component={Payment}/>
            </div>
        </BrowserRouter>
    );
}

export default App;