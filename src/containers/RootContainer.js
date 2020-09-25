import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { login, logout } from '../modules/auth';
import axios from 'axios';

import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Container, Typography, Paper, Grid, List, ListItem, Button } from '@material-ui/core';

import Login from '../pages/Login';
import useStyles from '../pages/Style';

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
    e.preventDefault();
    axios.get('api/auth/log-out', {
    })
      .then((response) => {
        console.log(response);
        <Redirect to="/" />
      })
      .catch((error) => {
        console.log(error);
      })
    onLogout();
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
              <List>
                <ListItem><Button onClick={getLogout}>{userName} 로그아웃</Button></ListItem>
                <ListItem><NavLink to="/sign-up">직원등록</NavLink></ListItem>
                <ListItem><NavLink to="/register-general-product">일반상품등록</NavLink></ListItem>
                <ListItem><NavLink to="/register-consign-product">위탁상품등록</NavLink></ListItem>
                <ListItem><NavLink to="/register-customer">회원관리</NavLink></ListItem>
                <ListItem><NavLink to="/sale">상품판매</NavLink></ListItem>
              </List> :
              <Login onLogin={onLogin} />
            }
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default RootContainer;
