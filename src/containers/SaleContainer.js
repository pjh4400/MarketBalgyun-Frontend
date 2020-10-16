import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Paper } from '@material-ui/core';
import Sale from '../pages/Sale';
import Payment from '../pages/Payment';
import useStyles from '../pages/Style';
import { addItem, deleteItem, changeInfo, completeSale } from '../modules/sales';

const SaleContainer = ({history}) => {
    const { items, sum_price } = useSelector(({ sales }) => ({
        items: sales.items,
        sum_price: sales.sum_price,
    }));

    const dispatch = useDispatch();
    const onAddItem = useCallback(item => dispatch(addItem(item)), [dispatch]);
    const onDeleteItem = useCallback((id) => dispatch(deleteItem(id)), [dispatch]);
    const onChangeInfo = useCallback((id, quantity, discount) => dispatch(changeInfo(id, quantity, discount)), [dispatch]);
    const onCompleteSale = useCallback(() => dispatch(completeSale()), [dispatch]);

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
                return <Sale items={items} sum_price={sum_price} handleNext={handleNext} onAddItem={onAddItem} onDeleteItem={onDeleteItem} onChangeInfo={onChangeInfo} onCompleteSale={onCompleteSale} />;
            case 1:
                return <Payment history={history} items={items} sum_price={sum_price} handleBack={handleBack} handleNext={handleNext} onCompleteSale={onCompleteSale} />;
            default:
                setStep(0);
                break;
        }
    }



    return (
        <Container className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                {getStepContent()}
            </Paper>
        </Container>
    );
};

export default SaleContainer;