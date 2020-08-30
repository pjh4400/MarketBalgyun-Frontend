import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App.js';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './index.css'

const theme = createMuiTheme({
    typography: {
        //fontFamily: '"Do Hyeon", sans-serif'
       fontFamily: '"Noto Sans KR", serif',
    },
});

const Hot = hot(module)(App);
 
ReactDOM.render(<MuiThemeProvider theme={theme}><Hot /></MuiThemeProvider>, document.querySelector('#root'));
