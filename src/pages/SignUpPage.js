import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Container, Paper, Typography, Grid, Button, Avatar, TextField, FormControlLabel, Link, MenuItem} from "@material-ui/core"


import useStyles from './Style';

const SignUpPage = () => {
    const classes = useStyles();

    const onSubmitForm = (e) => {
        alert('정상적으로 등록되었습니다.');
        e.preventDefault();
    }

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                계정 등록
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                label="이름"
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField select label="직책" variant="outlined" className={classes.menuitem}>
                                <MenuItem >직원</MenuItem>
                                <MenuItem >팀장</MenuItem>
                                <MenuItem >대표</MenuItem>
                                <MenuItem >아르바이트</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="비밀번호"
                                type="password"
                                id="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="비밀번호 확인"
                                type="password"
                                id="password"
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
                        직원가입
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/sign-in" variant="body2">
                                <Button className={classes.checkbox}>이미 아이디가 있으신가요? 로그인</Button>
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}



export default SignUpPage;

