import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './index.css'

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools());

const theme = createMuiTheme({
    typography: {
        fontFamily: "Noto Sans KR", serif,
    },
    palette: {
        primary: {
            main: '#4EAE4E',
        },
    },
});


ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}
        ><App />
        </MuiThemeProvider>
    </Provider>,
    document.querySelector('#root')
);
