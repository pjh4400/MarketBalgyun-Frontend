import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Typography, Paper, Stepper, Step, StepLabel } from '@material-ui/core';

import useStyles from './Style';
import SelectCategory from "../components/SelectCategory";
import ProductInfo from "../components/ProductInfo";
import { selectCategory, previousStep } from '../modules/product';
import Navigation from '../components/Navigation';



const steps = ['카테고리 선택', '상품 정보 입력'];

const RegisterGeneralProduct = () => {
  const { info, step } = useSelector(({ product }) => ({
    info: product.info,
    step: product.step,
  }));

  const dispatch = useDispatch();
  const onSelectCategory = useCallback((first, second, third) => dispatch(selectCategory(first, second, third)), [dispatch]);
  const onPreviousStep = useCallback(() => dispatch(previousStep()), [dispatch]);

  const classes = useStyles();


  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <SelectCategory onSelectCategory={onSelectCategory} />;
      case 1:
        return <ProductInfo info={info} onPreviousStep={onPreviousStep} />;
      default:
        throw new Error('Unknown step');
    }
  }



  return (
    <Container className={classes.root}>

      <Paper component='main' elevation={3} className={classes.paper}>

        <Typography variant="h4" align="center" className={classes.header}>
          일반상품등록
                </Typography>
        <Navigation />
        <Stepper activeStep={step} className={classes.item}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(step)}

      </Paper>
    </Container >

  );
}

export default RegisterGeneralProduct;