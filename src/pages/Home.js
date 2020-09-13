import React from 'react';
import { NavLink } from 'react-router-dom';
import {Container, Typography, Paper, Grid, List, ListItem} from '@material-ui/core';

import useStyles from './Style';

const Home = () => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>

            <Paper component='main' elevation={3} className={classes.paper}>
                
                <Typography component="h1" variant="h4" align="center" className={classes.header}>
                     마켓발견
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List>
                            <ListItem><NavLink to="/">Home</NavLink></ListItem>
                            <ListItem><NavLink to="/register-general-product">일반상품등록</NavLink></ListItem>
                            <ListItem><NavLink to="/register-consign-product">위탁상품등록</NavLink></ListItem>
                            <ListItem><NavLink to="/register-customer">회원관리</NavLink></ListItem>
                            <ListItem><NavLink to="/sale">상품판매</NavLink></ListItem>
                            <ListItem><NavLink to="/sign-up">직원가입</NavLink></ListItem>
                        </List>
                    </Grid>
                </Grid>
                </Paper>
         </Container>
    )
}

export default Home;

