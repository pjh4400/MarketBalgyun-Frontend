import React, { useState } from 'react';
import axios from 'axios';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


import { Container, Paper, Typography, Grid, Button, Avatar } from "@material-ui/core"
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';

import useStyles from '../pages/Style';

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
        <Grid container spacing={2} className={classes.header}>
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
    );
}



export default Admin;

