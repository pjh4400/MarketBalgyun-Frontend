import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../modules/auth';
import axios from 'axios';

import { Container, Typography, Paper, Grid, Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Login from '../pages/Login';
import useStyles from '../pages/Style';
import Navigation from '../components/Navigation';
import Admin from '../components/Admin';

const RootContainer = () => {
  const { isLogin, userName } = useSelector(({ auth }) => ({
    isLogin: auth.isLogin,
    userName: auth.userName,
  }));

  const dispatch = useDispatch();
  const onLogin = useCallback((userName) => dispatch(login(userName)), [dispatch]);
  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);

  const classes = useStyles();

  const getLogout = (e) => {
    if(confirm("로그아웃하시겠습니까?")){
      axios.get('api/auth/log-out', {
      })
        .then((res) => {
          console.log(res);
          onLogout();
          <Redirect to="/" />
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  return (
    <Container className={classes.root}>
      <Paper component='main' elevation={3} className={classes.paper}>
        <Typography component="h1" variant="h4" align="center" className={classes.header}>
          마켓발견
        </Typography>


        {isLogin ?
          <>
            <Navigation userName={userName} />
            <Paper variant="outlined" className={classes.item}>
              <Grid container justify="center" className={classes.form}>
                  <AccountCircleIcon fontSize="large" />
                  <Typography variant="h6" align="center"> 현재 로그인 직원 : {userName}</Typography>
              </Grid>
              <Grid container justify="flex-end">
                <Grid item>
                  <Button onClick={getLogout} className={classes.next}> 로그아웃</Button>
                </Grid>
              </Grid>
            </Paper>
          </>

          : <Login onLogin={onLogin} />
        }

        {userName === '관리자' && <Admin />}


      </Paper>
    </Container>
  );
};

export default RootContainer;
