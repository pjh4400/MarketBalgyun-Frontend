import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App.js';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './index.css'


const theme = createMuiTheme({
    typography: {
       fontFamily: '"Noto Sans KR", serif',
    },
    palette: {
        primary: {
          main: '#4EAE4E',
        },
      },
});

const Hot = hot(module)(App);
 
ReactDOM.render(

    <MuiThemeProvider theme={theme}
    ><Hot />
    </MuiThemeProvider>,
 document.querySelector('#root')
 );
