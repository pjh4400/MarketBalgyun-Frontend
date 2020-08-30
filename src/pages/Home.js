import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import useStyles from './Style';

const Home = () => {
    const classes = useStyles();

    return (
        <>
            <Container className={classes.root}>

            <Paper component='main' elevation={3} className={classes.paper}>
                
                <Typography component="h1" variant="h4" align="center" className={classes.header}>
                     마켓발견
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List>
                            <ListItem><NavLink to="/">Home</NavLink></ListItem>
                            <ListItem><NavLink to="/register-customer">회원등록</NavLink></ListItem>
                            <ListItem><NavLink to="/sale">상품판매</NavLink></ListItem>
                        </List>
                    </Grid>
                </Grid>
                </Paper>
            </Container>
        </>
    )
}

export default Home;

