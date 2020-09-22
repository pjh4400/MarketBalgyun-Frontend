import React, { useState } from 'react';
import { Container, Typography, Paper, Grid, Button, Stepper, Step, StepLabel } from '@material-ui/core';

import useStyles from './Style';
import SelectCategory from "../components/SelectCategory";

const steps = ['카테고리 선택', '상품 정보 입력'];

const RegisterGeneralProduct = () => {
    const [product, setProduct] = useState({
        first_category: '',
        second_category: '',
        third_category: '',
        name: '',
        cost: 0,
        price: 0,
        quantity: 0,
        max_discount: 0,
        place: 1,
        date: '',
    });

    const classes = useStyles();

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
      setActiveStep(activeStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <SelectCategory />;
            case 1:
                return <ProductInfo />;
            default:
                throw new Error('Unknown step');
        }
    }


    const onChangeHandler = (e) => {
        e.preventDefault();
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitProduct = (e) => {
        e.preventDefault();
        console.log(product);
    }


    return (
        <Container className={classes.root}>

            <Paper component='main' elevation={3} className={classes.paper}>

                <Typography variant="h4" align="center" className={classes.header}>
                    일반상품등록
                </Typography>
                <Stepper activeStep={activeStep} className={classes.item}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? (
              <React.Fragment>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Grid container justify="flex-end" className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                  </Grid>
              </React.Fragment>
            )}
            </Paper>
        </Container >

    );
}

export default RegisterGeneralProduct;