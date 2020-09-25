import React, { useState } from 'react';
import SaleGeneralItem from '../components/SaleGeneralItem';
import { Container, Typography, Paper, Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './Style';
import SearchProduct from '../components/SearchProduct';

const Sale = ({ items, sum_price, onAddItem, onDeleteItem, onChangePrice }) => {
    const [searchID, setSearchID] = useState("");
    const classes = useStyles();

    const onSearchIDHandler = (e) => {
        setSearchID(e.target.value);
    };


    return (
        <Container component="main" maxwidth="xs" className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography component="h1" variant="h4" align="center" className={classes.header}>
                    상품판매
                </Typography>

               <SearchProduct onAddItem={onAddItem}/>

                <Grid container spacing={2}>
                    {items && items.map(item => (
                        <SaleGeneralItem item={item} key={item.id} onDeleteItem={onDeleteItem} onChangePrice={onChangePrice}/>
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



export default Sale;