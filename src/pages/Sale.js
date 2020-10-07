import React from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import Navigation from '../components/Navigation';
import useStyles from '../pages/Style';
import SearchSaleID from '../components/SearchSaleID';
import SaleItem from '../components/SaleItem';


const Sale = ({items, sum_price, handleNext, onAddItem, onDeleteItem, onChangeInfo, onCompleteSale}) => {
    const classes = useStyles();

    return (
        <>
            <Typography component="h1" variant="h4" align="center" className={classes.header}>
                상품판매
                </Typography>

            <Navigation />
            <SearchSaleID items={items} onAddItem={onAddItem} onCompleteSale={onCompleteSale}/>

            <Grid container spacing={2}>
                {items && items.map(item => (
                    <SaleItem item={item} key={item.id} onChangeInfo={onChangeInfo} onDeleteItem={onDeleteItem}/>
                ))}
            </Grid>

            <Button className={classes.submit} size="large" onClick={handleNext}>총 {sum_price} 원 판매하기</Button>
        </>

    );
};

export default Sale;