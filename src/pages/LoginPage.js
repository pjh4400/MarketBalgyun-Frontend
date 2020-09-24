import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Container, Paper, Typography, Grid, Button, Avatar, TextField } from "@material-ui/core"
import { login } from '../modules/auth';

import useStyles from './Style';

const LoginPage = () => {
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
    axios.post('api/auth/sign-in', {
      name: form.name,
      password: form.password,
    })
      .then((response) => {
        console.log(response);
        login(name);
        <Redirect to="/" />
      })
      .catch((error) => {
        console.log(error);
      })

  }

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
                직원 로그인
                </Typography>
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

        </form>
      </Paper>
    </Container>
  );
}



export default LoginPage;

