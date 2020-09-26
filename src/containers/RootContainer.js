import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../modules/auth';
import axios from 'axios';

import { Container, Typography, Paper, Grid, Button } from '@material-ui/core';

import Login from '../pages/Login';
import useStyles from '../pages/Style';
import Navigation from '../components/Navigation';

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
    alert("로그아웃하시겠습니까?");
    e.preventDefault();
    axios.get('api/auth/log-out', {
    })
      .then((res) => {
        console.log(res);
        //onLogout();
        <Redirect to="/" />
      })
      .catch((error) => {
        console.log(error);
      })
    onLogout(); // 나중에 성공시에만 되도록 바꾸기
  }

  return (
    <Container className={classes.root}>
      <Paper component='main' elevation={3} className={classes.paper}>
        <Typography component="h1" variant="h4" align="center" className={classes.header}>
          마켓발견
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {isLogin ?
              // To DO : 로그인 후에 다른 화면 선택지 보이도록 (로그인 안했을때는 로그인 밖에 없음)
              // 직원등록은 관리자 계정만 가능
              <Navigation userName={userName} /> : <Login onLogin={onLogin} />
            }
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" align="center" className={classes.header}>
              로그인 상태 : {userName}
        </Typography>
            <Button onClick={getLogout} className={classes.next}> 로그아웃</Button>

          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default RootContainer;
