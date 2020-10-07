import React, { useState } from 'react';
import { Container, Paper, Grid, Typography, Button } from '@material-ui/core';
import useStyles from '../pages/Style';
import GeneralProuct from "../components/GeneralProduct";
import ConsignProduct from "../components/ConsignProduct";
import Navigation from '../components/Navigation';

const ModifyProduct = () => {
    const [GenOrCon, setGenOrCon] = useState('');

    const classes = useStyles();

    const getContent = () => {
        switch (GenOrCon) {
            case 'G':
                return <GeneralProuct mode='old' />;
            case 'C':
                return <ConsignProduct mode='old' />;
        }
    }
    return (
        <Container className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h4" align="center" className={classes.header}>
                    상품 수정 및 삭제
                </Typography>
                <Navigation />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            className={classes.submit}
                            size="large"
                            onClick={() => {
                                setGenOrCon('G');
                            }}
                        >
                            일반상품
            </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button
                            className={classes.submit}
                            size="large"
                            onClick={() => {
                                setGenOrCon('C');
                            }}
                        >
                            위탁상품
            </Button>
                    </Grid>
                </Grid>

                {getContent()}
            </Paper>
        </Container>
    );
};

export default ModifyProduct;