import React, { useState } from 'react';
import SaleGeneralItem from '../components/SaleGeneralItem';
import { Container, Typography, Paper, Grid, Button, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

import useStyles from './Style';
import GeneralProducts from "../tempDB/GeneralProducts";

const Sale = ({ items, price, onAddItem, onDeleteItem }) => {
    const [searchID, setSearchID] = useState("");

    const classes = useStyles();

    const onSearchIDHandler = (e) => {
        setSearchID(e.target.value);
    };

    const onSearchItem = (e) => {
        e.preventDefault();
        let item = GeneralProducts.find(it => it.id == searchID);
        if (item === undefined) {
            alert("ID를 다시 입력해주세요." + searchID);
        }
        else {
            onAddItem(item);
        }
    }

    return (
        <Container component="main" maxwidth="xs" className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography component="h1" variant="h4" align="center" className={classes.header}>
                    상품판매
                </Typography>

                <form className={classes.form} onSubmit={onSearchItem}>
                    <TextField
                        type="text"
                        variant="outlined"
                        fullWidth
                        label="ID"
                        name="id"
                        onChange={onSearchIDHandler}
                        value={searchID}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <Button type="submit"><SearchIcon /></Button>
                                </InputAdornment>
                            )
                        }}
                    />
                </form>

                <Grid container spacing={2}>
                    {items && items.map(item => (
                        <SaleGeneralItem item={item} key={item.id} onDeleteItem={onDeleteItem} />
                    ))}
                </Grid>
                <Link to="/payment">
                    <Button className={classes.submit} size="large">
                        총 {price} 원 판매하기
                </Button>
                </Link>
            </Paper>
        </Container>
    );

};



export default Sale;