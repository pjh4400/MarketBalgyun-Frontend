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
      
    return (
        <Grid item xs={12} className={classes.navbar}>
        <ButtonGroup className={classes.group}>
            <Button component={NavLink} to="/" className={classes.navitem}>홈</Button>
            <Button component={NavLink} to="/sale" className={classes.navitem}>상품판매</Button>
            <Button component={NavLink} to="/register-product" className={classes.navitem}>상품등록</Button>
            <Button component={NavLink} to="/modify-product" className={classes.navitem}>상품수정삭제</Button>
            <Button component={NavLink} to="/search" className={classes.navitem}>상품검색</Button>
            <Button component={NavLink} to="/register-customer" className={classes.navitem}>회원관리</Button>
            <Button component={NavLink} to="/trader" className={classes.navitem}>매입처관리</Button>
        </ButtonGroup>
        </Grid>
    );
}

export default Navigation;