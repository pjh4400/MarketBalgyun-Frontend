import React, { useState } from 'react';
import { Container, Typography, Paper, Grid, Button, TextField} from '@material-ui/core';

import useStyles from './Style';
import GeneralProducts from "../tempDB/GeneralProducts";
import Category from "../tempDB/Cateogry";



const RegisterGeneralProduct = () => {
    const [secondCategories, setSecondCategories] = useState([]);
    const [thirdCategories, setThirdCategories] = useState([]);

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


    const onSelectFirstCategory = (e) => {
        let firstCategory = e.currentTarget.value;
        setProduct({
            ...product,
            first_category: firstCategory
        })
        let category = Category.find(category => category.first_category === firstCategory);
        setSecondCategories(category.second_category);
    }

    const onSelectSecondCategory = (e) => {
        let secondCategory = e.currentTarget.value;
        setProduct({
            ...product,
            second_category: secondCategory
        })
        let category = Category.find(category => category.first_category === product.first_category);
        let indx = Category.findIndex(category => category.second_category === secondCategory);
        setThirdCategories(category.third_category[indx]);
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
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" align="center" className={classes.header}>
                            대분류
                        </Typography>
                        {Category.map(category => (
                            <Typography variant="body1" align="center">
                                <Button value={category.first_category} onClick={onSelectFirstCategory}>
                                    {category.first_category}
                                </Button></Typography>
                        ))}
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" align="center" className={classes.header}>
                            중분류
                        </Typography>
                        {secondCategories && secondCategories.map(secondCategory => (
                            <Typography variant="body1" align="center">
                            <Button value={secondCategory} onClick={onSelectSecondCategory}>
                                    {secondCategory}
                            </Button></Typography>
                        ))}
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" align="center" className={classes.header}>
                            소분류
                        </Typography>
                        {thirdCategories && thirdCategories.map(thirdCategory => (
                            <Typography variant="body1" align="center">
                                <Button onClick={() => {setProduct({
                                    ...product,
                                    third_category: thirdCategory
                                })}}>{thirdCategory}</Button>
                            </Typography>
                        ))}
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" align="center" className={classes.header}>
                            상품정보
                        </Typography>

                        <form className={classes.form} onSubmit={onSubmitProduct}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="상품명"
                                        name="name"
                                        value={product.name}
                                        onChange={onChangeHandler}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        label="원가"
                                        name="cost"
                                        value={product.cost}
                                        onChange={onChangeHandler}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="판매가"
                                        name="price"
                                        value={product.price}
                                        onChange={onChangeHandler}
                                    />
                                </Grid>

                                
                                <Grid item xs={12}>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="수량"
                                        name="quantity"
                                        value={product.quantity}
                                        onChange={onChangeHandler}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="재고위치"
                                        name="place"
                                        value={product.place}
                                        onChange={onChangeHandler}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="최대할인율"
                                        name="max_discount"
                                        value={product.max_discount}
                                        onChange={onChangeHandler}
                                    />
                                </Grid>

                                <Button className={classes.submit} size="large" type="submit">상품등록</Button>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </Container >

    );
}

export default RegisterGeneralProduct;