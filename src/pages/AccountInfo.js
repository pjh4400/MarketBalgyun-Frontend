import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Paper, Grid, Button, TextField, InputAdornment, Card, CardContent, IconButton } from '@material-ui/core';

import ClearIcon from '@material-ui/icons/clear';
import useStyles from './Style';
import Navigation from '../components/Navigation';

const AccouontInfo = () => {
    const { cosign_info } = useSelector(({ sales }) => ({
        cosign_info: sales.cosign_info,
    }));

    const classes = useStyles();


    useEffect(() => {
        console.log(cosign_info);
    }, []);

    return (
        <>
            <Typography component="h1" variant="h4" align="center" className={classes.header}>
                위탁자 정보
        </Typography>

            <Navigation />
            <Grid container spacing={2}>

                <Grid item xs={12}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardDetails}>
                                <Typography variant="subtitle1" color="textSecondary" paragraph>
                                    위탁자 : 박재희
                                <IconButton className={classes.right}><ClearIcon /></IconButton>
                                </Typography>
                                <Typography variant="body1">
                                    은행 : 국민
                            </Typography>
                                <Typography variant="body1">
                                    예금주 : 박재희
                            </Typography>
                                <Typography variant="body1">
                                    계좌 : 071-0721-071
                            </Typography>

                                <Typography variant="subtitle1" color="primary">
                                    가격 : 3000 원
            </Typography>
                            </CardContent>
                        </Card>
                </Grid>
            </Grid>
        </>


    );
}

export default AccouontInfo;