import React, { useState } from 'react';
import axios from 'axios';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


import { Container, Paper, Typography, Grid, Button, Avatar } from "@material-ui/core"
import SignUp from './SignUp';
import SignOut from './SignOut';
import Navigation from '../components/Navigation';

import useStyles from './Style';

const Admin = () => {
    const [mode, setMode] = useState('');
    const classes = useStyles();


    const getContent = () => {
        switch (mode) {
            case '직원 등록': return <SignUp />
            case '직원 수정/삭제': return <SignOut />
            default: <></>
        }
    }

    return (
        <Container className={classes.root}>
            <Paper component='main' elevation={3} className={classes.paper}>
                <Typography component="h1" variant="h4" align="center" className={classes.header}>
                    마켓발견
          </Typography>
          <Navigation userName={'관리자'} />

                <Grid container spacing={2} className={classes.form}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
                직원 관리
                </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button className={classes.submit} size="large" onClick={() => { setMode('직원 등록'); }}>
                            직원 등록
                    </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button className={classes.submit} size="large" onClick={() => { setMode('직원 수정/삭제'); }}>
                            직원 수정/삭제
                    </Button>
                    </Grid>

                    {getContent()}

                </Grid>
            </Paper>
        </Container >

    );
}



export default Admin;

