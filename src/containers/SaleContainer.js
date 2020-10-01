import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { addItem, deleteItem, changeInfo } from '../modules/sales';

import SearchProduct from '../components/SearchProduct';
import SaleItem from '../components/SaleItem';

import { Container, Typography, Paper, Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

import useStyles from '../pages/Style';

const SaleContainer = () => {
    const { items, sum_price } = useSelector( ({sales}) => ({
        items: sales.items,
        sum_price: sales.sum_price,
    }));

    const classes = useStyles();

    const dispatch = useDispatch();
    const onAddItem = useCallback(item => dispatch(addItem(item)), [dispatch]);
    const onDeleteItem = useCallback((id,price) => dispatch(deleteItem(id,price)), [dispatch]);
    const onChangeInfo = useCallback((id, quantity, discount, prePrice, newPrice) => dispatch(changeInfo(id, quantity, discount, prePrice, newPrice)), [dispatch]);
    
    return (
        <Container component="main" maxwidth="xs" className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography component="h1" variant="h4" align="center" className={classes.header}>
                    상품판매
                </Typography>
                
                <Navigation />
               <SearchProduct onAddItem={onAddItem}/>

                <Grid container spacing={2}>
                    {items && items.map(item => (
                        <SaleItem item={item} key={item.id} onDeleteItem={onDeleteItem} onChangeInfo={onChangeInfo}/>
                    ))}
                </Grid>
                <Link to="/payment">
                    <Button className={classes.submit} size="large">
                        총 {sum_price} 원 판매하기
                </Button>
                </Link>
            </Paper>
        </Container>
    );
};

export default SaleContainer;