import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import download from 'downloadjs'

import { Container, Typography, Paper, Grid, Button, TextField } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';


import useStyles from '../pages/Style';
import Navigation from '../components/Navigation';
import Admin from '../components/Admin';

const RootContainer = () => {
  const [userName, setUserName] = useState(window.sessionStorage.getItem('name'));
  const [date, setDate] = useState({
    now: '',
    start: '',
    end: '',
  });
  const classes = useStyles();

  useEffect(() => {
    let now = new Date();
    let start = (now.getFullYear()) + '-' + ('00' + (now.getMonth())).slice(-2) + '-' + ('00' + now.getDate()).slice(-2);
    let end = (now.getFullYear()) + '-' + ('00' + (now.getMonth() + 1)).slice(-2) + '-' + ('00' + now.getDate()).slice(-2);
    setDate({
      now: end,
      start: start,
      end: end,
    })
  }, []);

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

  const ondateChange = (e) => {
    setDate({
      ...date,
      [e.target.name]: e.target.value,
    });

  }

  const onGetSaleLog = () => {
    if (confirm("판매로그를 다운받으시겠습니까?")) {
      axios.get('api/showCSV', {
        params: {
          start: date.start,
          end: date.end,
          saleLog: true,
        },
        responseType: 'blob'
      })
        .then((res) => {
          const content = res.headers['content-type'];
          download(res.data, '판매로그[' + date.start + '_' + date.end + '].csv', content);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  const onGeneralProduct = () => {
    if (confirm("일반상품 현황을 다운받으시겠습니까?")) {
      axios.get('api/showCSV', {
        params: {
          generalProduct: true,
        },
        responseType: 'blob'
      })
        .then((res) => {
          const content = res.headers['content-type'];
          download(res.data, '일반상품현황[' + date.now + '].csv', content);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  const onConsignProduct = () => {
    if (confirm("위탁상품 현황을 다운받으시겠습니까?")) {
      axios.get('api/showCSV', {
        params: {
          consignProduct: true,
        },
        responseType: 'blob'
      })
        .then((res) => {
          const content = res.headers['content-type'];
          download(res.data, '위탁상품현황[' + date.now + '].csv', content);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  const onGetTrader = () => {
    if (confirm("매입처 현황을 다운받으시겠습니까?")) {
      axios.get('api/showCSV', {
        params: {
          trader: true,
        },
        responseType: 'blob'
      })
        .then((res) => {
          const content = res.headers['content-type'];
          download(res.data, '매입처현황[' + date.now + '].csv', content);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  const onGetCustomer = () => {
    if (confirm("고객현황을 다운받으시겠습니까?")) {
      axios.get('api/showCSV', {
        params: {
          customer: true,
        },
        responseType: 'blob'
      })
        .then((res) => {
          const content = res.headers['content-type'];
          download(res.data, '고객현황[' + date.now + '].csv', content);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }


  if (userName) {
    return (
      <Container className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h4" align="center" className={classes.header}>
            마켓발견
          </Typography>
          <Navigation />
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

          <Paper variant="outlined" className={classes.item}>
            <Grid container justify="center" className={classes.form}>
              <AssignmentIcon fontSize="large" />
              <Typography variant="h6" align="center"> 엑셀 다운로드 </Typography>
            </Grid>


            <Grid container justify="center" className={classes.form}>
              <Button onClick={onGeneralProduct} className={classes.next}>일반상품현황</Button>
              <Button onClick={onConsignProduct} className={classes.next}>위탁상품현황</Button>
              <Button onClick={onGetTrader} className={classes.next}>매입처현황</Button>
              <Button onClick={onGetCustomer} className={classes.next}>고객현황</Button>
            </Grid>

            <Grid container justify="center" className={classes.form}>
              
              <TextField
                label="시작날짜"
                type="date"
                name="start"
                value={date.start}
                onChange={ondateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.inlineComponents}
              />
              <TextField
                label="종료날짜"
                type="date"
                name="end"
                value={date.end}
                onChange={ondateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.inlineComponents}
              />
              <Button onClick={onGetSaleLog} className={classes.next}>판매로그</Button>

            </Grid>
          </Paper>

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
