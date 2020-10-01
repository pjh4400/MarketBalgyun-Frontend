import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid, Button, TextField, InputAdornment, Card, CardContent, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import useStyles from './Style';

const ConsignInfo = () => {
    

    return (
        <Container component="main" maxwidth="xs" className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography component="h1" variant="h4" align="center" className={classes.header}>
                    
                </Typography>

               
            </Paper>
        </Container>
    );
}

export default ConsignInfo;