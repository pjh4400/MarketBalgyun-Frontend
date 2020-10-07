import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Grid, Button, TextField, InputAdornment, Card, CardContent, CardActionArea } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Navigation from '../components/Navigation';

import useStyles from '../pages/Style';



const SearchProduct = () => {
    const [products, setProducts] = useState([]);
    const classes = useStyles();

    const onSearchByID = (e) => {
        e.preventDefault();
        setProducts([]);
        axios.get('api/searchProduct', {
            params: {
                id: e.currentTarget.id.value,
            }
        })
            .then((res) => {
                if (res.data === "해당 ID의 상품이 없습니다.") {
                    alert(res.data);
                } else {
                    setProducts(res.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onSearchByName = (e) => {
        e.preventDefault();
        setProducts([]);
        axios.get('api/searchProduct', {
            params: {
                name: e.currentTarget.name.value,
            }
        })
            .then((res) => {
                if (res.data === "해당 이름의 상품이 없습니다.") {
                    alert(res.data);
                } else {
                    setProducts(res.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onSearchByTrader = (e) => {
        e.preventDefault();
        setProducts([]);
        axios.get("api/searchProduct", {
            params: {
                trader: e.currentTarget.trader.value,
            },
        })
            .then((res) => {
                console.log(res.data);
                if (res.data === "해당 매입처의 상품이 없습니다.") {
                    alert(res.data);
                } else {
                    setProducts(res.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onSearchByPlace = (e) => {
        e.preventDefault();
        setProducts([]);
        axios.get("api/searchProduct", {
            params: {
                place: e.currentTarget.place.value,
            },
        })
            .then((res) => {
                if (res.data === "해당 재고위치의 상품이 없습니다.") {
                    alert(res.data);
                } else {
                    setProducts(res.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const oneItem = (item) => {
        if (item.id.startsWith('C')) { // 위탁상품
            return (
                <Card className={classes.card}>
                    <CardContent className={classes.cardDetails}>
                        <Typography variant="subtitle1" color="primary">
                            위탁상품 : {item.id}
                        </Typography>
                        <Typography component="h3" variant="h5" paragraph>
                            {item.name || '상품명 없음'}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            위탁자 : {item.consigner || '정보없음'}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            가격 : {item.price} 원
                    </Typography>
                        <Typography variant="body1" color="textSecondary">
                            수량 : {item.quantity}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            재고위치 : {item.place || '정보없음'}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            위탁날짜 : {item.date.split('T')[0]}
                        </Typography>
                    </CardContent>
                </Card>
            );
        }
        else { // 일반상품
            return (
                <Card className={classes.card}>
                    <CardContent className={classes.cardDetails}>
                        <Typography variant="subtitle1" color="secondary">
                            일반상품 : {item.id}
                        </Typography>
                        <Typography component="h3" variant="h5" paragraph>
                            {item.name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {item.first_category} - {item.second_category} - {item.third_category}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            가격 : {item.price} 원
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            수량 : {item.quantity}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            재고위치 : {item.place || '정보없음'}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            매입처 : {item.trader || '정보없음'}
                        </Typography>
                    </CardContent>
                </Card>
            );
        }

    }



    return (
        <Container className={classes.root}>

            <Paper width="50%" component='main' elevation={3} className={classes.paper}>

                <Typography component="h1" variant="h4" align="center" className={classes.header}>
                    상품검색
        </Typography>
                <Navigation />
                <Grid container spacing={2} className={classes.form}>
                    <Grid item xs={12} sm={6}>
                        <form onSubmit={onSearchByID}>
                            <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                label="ID로 검색하기"
                                name="id"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <Button type="submit"><SearchIcon /></Button>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form onSubmit={onSearchByName}>
                            <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                label="이름으로 검색하기"
                                name="name"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <Button type="submit"><SearchIcon /></Button>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </form>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <form onSubmit={onSearchByTrader}>
                            <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                label="거래처로 검색하기"
                                name="trader"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <Button type="submit">
                                                <SearchIcon />
                                            </Button>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form onSubmit={onSearchByPlace}>
                        <TextField
                            type="text"
                            variant="outlined"
                            fullWidth
                            label="재고위치로 검색하기"
                            name="place"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <Button type="submit">
                                            <SearchIcon />
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        </form>
                    </Grid>

                </Grid>

                <Grid container spacing={2} className={classes.form}>
                    {products && products.map(item => (
                        <Grid item xs={12} sm={6} className={classes.card} item={item} key={item.id}>{oneItem(item)}</Grid>
                    ))}

                </Grid>

            </Paper >
        </Container >

    );

};



export default SearchProduct;