import React, { useState} from 'react';
import { Redirect } from 'react-router';

import axios from 'axios';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Container, Paper, Typography, Grid, Button, Avatar, TextField } from "@material-ui/core"
import { getCategories } from '../modules/register';

import useStyles from './Style';

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  const [form, setForm] = useState({
    name: '',
    password: '',
  })
  const classes = useStyles();

  const onChangeHandler = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }


  const onSubmitForm = (e) => {
    e.preventDefault();
    axios.post('api/auth/log-in', {
      name: form.name,
      password: form.password,
    })
      .then((res) => {
        if (res.data.message === '로그인 성공') {
          window.sessionStorage.setItem('name', res.data.payLoad.name);
          setIsLogin(true);
          axios.get('api/generalCategory', {})
            .then((res) => {
              window.sessionStorage.setItem('firsts', JSON.stringify(res.data.first_category));
              window.sessionStorage.setItem('seconds', JSON.stringify(res.data.second_category));
              window.sessionStorage.setItem('thirds', JSON.stringify(res.data.third_category));
            }).catch((error) => {
              alert('error! 카테고리정보를 불러오지 못했습니다.');
              console.log(error);
            });
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  if (isLogin) {
    return (
      <Redirect to='/' />
    );
  } else {
    return (
      <Container className={classes.root}>
        <Paper component='main' elevation={3} className={classes.paper}>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" paragraph>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
               직원 로그인
               </Typography>
            </Grid>
          </Grid>

          <form className={classes.form} noValidate onSubmit={onSubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  label="이름"
                  autoFocus
                  onChange={onChangeHandler}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                로그인
         </Button>
            </Grid>
          </form>
        </Paper>

      </Container >
    );
  }

}



export default Login;

