import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

import { Container, Typography, Paper, Grid, Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


import useStyles from '../pages/Style';
import Navigation from '../components/Navigation';
import Admin from '../components/Admin';

const RootContainer = () => {
  const [userName, setUserName] = useState(window.sessionStorage.getItem('name'));

  const classes = useStyles();

  const getLogout = (e) => {
    if (confirm("로그아웃하시겠습니까?")) {
      axios.get('api/auth/log-out', {
      })
        .then((res) => {
          alert('로그아웃 되었습니다.');
          window.sessionStorage.clear();
          setUserName('');
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  if (userName) {
    return (
      <Container className={classes.root}>
        <Paper component='main' elevation={3} className={classes.paper}>
          <Typography component="h1" variant="h4" align="center" className={classes.header}>
            마켓발견
          </Typography>
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

          {userName === '관리자' && <Admin />}

        </Paper>
      </Container >
    );
  } else {
    return (
      <Redirect to='/login' />
    );
  }

};

export default RootContainer;
