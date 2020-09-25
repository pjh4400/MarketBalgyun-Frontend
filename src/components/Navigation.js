import React from 'react';
import { List, ListItem, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    },
    navitem: {
        background: '#4EAE4E',
        color: 'white',
        width: '100%'
    },
}));

const Navigation = ({ userName }) => {
    const classes = useStyles();
    return (
        <List className={classes.navbar}>
            {userName === '관리자' ? <ListItem><Button component={NavLink} to="/sign-up">직원등록</Button></ListItem> : <></>}
            <ListItem><Button component={NavLink} to="/general-product" className={classes.navitem}>일반상품관리</Button></ListItem>
            <ListItem><Button component={NavLink} to="/consign-product" className={classes.navitem}>위탁상품관리</Button></ListItem>
            <ListItem><Button component={NavLink} to="/register-customer" className={classes.navitem}>회원관리</Button></ListItem>
            <ListItem><Button component={NavLink} to="/sale" className={classes.navitem}>상품판매</Button></ListItem>
        </List>
    );
}

export default Navigation;