import React from 'react';
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    navbar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
          },
    },
    group: {
        color: '#4EAE4E',
    },
    navitem: {
        margin: theme.spacing(2),
        color: '#4EAE4E',
    }
}));

const Navigation = () => {
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
        <Grid item xs={12} className={classes.navbar}>
        <ButtonGroup className={classes.group}>
            <Button component={NavLink} to="/" className={classes.navitem}>홈</Button>
            <Button component={NavLink} to="/general-product" className={classes.navitem}>일반상품관리</Button>
            <Button component={NavLink} to="/consign-product" className={classes.navitem}>위탁상품관리</Button>
            <Button component={NavLink} to="/register-customer" className={classes.navitem}>회원관리</Button>
            <Button component={NavLink} to="/sale" className={classes.navitem}>상품판매</Button>
        </ButtonGroup>
        </Grid>
    );
}

export default Navigation;