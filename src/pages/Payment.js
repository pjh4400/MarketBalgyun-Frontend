import React, { useState } from 'react';
import Customers from '../tempDB/Customers';
import { Container, Typography, Paper, Grid, Button, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './Style';

const Payment = ({items, price }) => {
    const classes = useStyles();

    return (
        <Container component="main" maxwidth="xs" className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography component="h1" variant="h4" align="center" className={classes.header}>
                    상품결제
                </Typography>

            </Paper>
        </Container>
    );

};



export default Payment;