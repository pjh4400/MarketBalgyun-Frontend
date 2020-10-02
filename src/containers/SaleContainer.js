import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Sale from '../pages/Sale';
import Payment from '../pages/Payment';
import ConsignInfo from '../pages/ConsignInfo';

import { Container, Paper } from '@material-ui/core';

import useStyles from '../pages/Style';


const SaleContainer = () => {
    const { items, sum_price } = useSelector(({ sales }) => ({
        items: sales.items,
        sum_price: sales.sum_price,
    }));

    const classes = useStyles();

    const [step, setStep] = useState(0);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const getStepContent = () => {
        switch (step) {
            case 0:
                return <Sale items={items} sum_price={sum_price} handleNext={handleNext}/>;
            case 1:
                return <Payment handleNext={handleNext} />;
            case 2:
                return <ConsignInfo />;
            default:
                throw new Error('Unknown step');
        }
    }



    return (
        <Container component="main" maxwidth="xs" className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                {getStepContent()}
            </Paper>
        </Container>
    );
};

export default SaleContainer;