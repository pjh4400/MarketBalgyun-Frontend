import React from 'react';


import SearchProduct from '../components/SearchProduct';
import SaleItem from '../components/SaleItem';

import { Typography, Grid, Button } from '@material-ui/core';
import Navigation from '../components/Navigation';
import useStyles from '../pages/Style';


const Sale = ({items, sum_price, handleNext}) => {
    const classes = useStyles();

    return (
        <>
            <Typography component="h1" variant="h4" align="center" className={classes.header}>
                상품판매
                </Typography>

            <Navigation />
            <SearchProduct/>

            <Grid container spacing={2}>
                {items && items.map(item => (
                    <SaleItem item={item} key={item.id}/>
                ))}
            </Grid>

            <Button className={classes.submit} size="large" onClick={handleNext}>총 {sum_price} 원 판매하기</Button>
        </>

    );
};

export default Sale;