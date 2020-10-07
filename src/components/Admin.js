import React, { useState } from 'react';
import { Paper, Typography, Grid, Button, Avatar } from "@material-ui/core"
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from '../pages/Style';

const Admin = () => {
    const [mode, setMode] = useState('');
    const classes = useStyles();


    const getContent = () => {
        switch (mode) {
            case 'signup': return <SignUp setMode={setMode}/>
            case 'signout': return <SignOut setMode={setMode}/>
            default: return <></>
        }
    }

    return (
        <Paper variant="outlined" className={classes.item}>
            <Grid container spacing={2} className={classes.header}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
                직원 관리
                </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button className={classes.submit} size="large" onClick={() => { setMode('signup'); }}>
                        직원 등록
                    </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Button className={classes.submit} size="large" onClick={() => { setMode('signout'); }}>
                        직원 삭제
                    </Button>
                </Grid>

                {getContent()}

            </Grid>
        </Paper>
    );
}



export default Admin;

