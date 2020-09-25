import React, { useState } from "react";
import useStyles from '../pages/Style';
import { Typography, Grid, TextField, Button } from '@material-ui/core';
import axios from 'axios';

const ProductInfo = ({ info, onPreviousStep }) => {
    const classes = useStyles();

    const [product, setProduct] = useState({
        first_category: info.first_category,
        second_category: info.second_category,
        third_category: info.third_category,
        name: '',
        cost: 0,
        price: 0,
        quantity: 0,
        max_discount: 0,
        place: 1,
        company: '',
    });

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
        axios.post('api/generalProduct',product)
        .then( (res) => {
            console.log(res);
        })
        .catch( (error) => {
            console.log(error);
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
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

                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="number"
                                variant="outlined"
                                fullWidth
                                label="원가(원)"
                                name="cost"
                                value={product.cost}
                                onChange={onChangeHandler}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="number"
                                variant="outlined"
                                required
                                fullWidth
                                label="판매가(원)"
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
                                label="수량(개)"
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
                                label="최대할인율(%)"
                                name="max_discount"
                                value={product.max_discount}
                                onChange={onChangeHandler}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                variant="outlined"
                                required
                                fullWidth
                                label="매입처"
                                name="company"
                                value={product.company}
                                onChange={onChangeHandler}
                            />
                        </Grid>

                    </Grid>

                    <Grid container justify="flex-end">
                        <Button className={classes.next} onClick={onPreviousStep}>이전</Button>
                        <Button className={classes.next} type="submit">상품등록</Button>
                    </Grid>
                </form>
            </Grid>
        </Grid >
    );
}

export default ProductInfo;