import React from 'react';
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    navbar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    group: {
        color: '#4EAE4E',
    },
    navitem: {
        margin: theme.spacing(1),
        color: '#4EAE4E',
        boxShadow:
            "0 2px 2px 0 rgba(76, 175, 80, 0.14), 0 3px 1px -2px rgba(76, 175, 80, 0.2), 0 1px 5px 0 rgba(76, 175, 80, 0.12)",
        "&:hover,&:focus": {
            boxShadow:
                "0 14px 26px -12px rgba(76, 175, 80, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(76, 175, 80, 0.2)"
        }
    },
}));

const Navigation = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.navbar}>
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