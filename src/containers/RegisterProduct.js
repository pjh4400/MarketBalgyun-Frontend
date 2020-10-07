import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Grid, Typography, Paper, Stepper, Step, StepLabel, FormControl, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';

import useStyles from '../pages/Style';
import SelectCategory from "../components/SelectCategory";
import RegisterGeneral from "../components/RegisterGeneral";
import RegisterConsign from "../components/RegisterConsign";
import { selectCategory, previousStep } from '../modules/register';
import Navigation from '../components/Navigation';


const steps = ['카테고리 선택', '상품 정보 입력'];

const RegisterProduct = () => {
  const  {info, step } = useSelector(({ register }) => ({
    info: register.info,
    step: register.step,
  }));

  const [GenOrCon, setGenOrCon] = useState(''); // 일반/위탁 구분
  const dispatch = useDispatch();
  const onSelectCategory = useCallback((first, second, third) => dispatch(selectCategory(first, second, third)), [dispatch]);
  const onPreviousStep = useCallback(() => dispatch(previousStep()), [dispatch]);
  const classes = useStyles();


  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <SelectCategory onSelectCategory={onSelectCategory} setGenOrCon={setGenOrCon}/>;
      case 1:
        switch (GenOrCon) {
          case 'G':
            return <RegisterGeneral info={info} onPreviousStep={onPreviousStep} />;
          case 'C':
            return <RegisterConsign info={info} onPreviousStep={onPreviousStep} />;
        }
      default:
        throw new Error('Unknown step');
    }
  }


  return (
    <Container className={classes.root}>

      <Paper component='main' elevation={3} className={classes.paper}>

        <Typography variant="h4" align="center" className={classes.header}>
          상품등록
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

export default RegisterProduct;