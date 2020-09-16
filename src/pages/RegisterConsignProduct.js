import React, { useState } from 'react';
import { Container, Typography, Paper, Grid, Button, TextField, MenuItem, InputAdornment} from '@material-ui/core';
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './Style';
import ConsignProducts from '../tempDB/ConsignProducts';
import Customers from '../tempDB/Customers';


const RegisterConsignProduct = () => {
    const [mode, setMode] = useState('new'); // 새로 등록 시 'new', 기존 정보 조회 및 수정 시 'old'
    const [product, setProduct] = useState({
        name: '',
        quantity: 1,
        retail_price: 0,
        hopeful_price: 0,
        consigner_phone: '',
        account_number: '',
        bank: '',
        settle: '포인트',
        date: '',
        something: '',
        place: 0,
        max_discount: 0,
    });

    const classes = useStyles();

    const onChangeHandler = (e) => {
        e.preventDefault();
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    }

    const onSearchCustomer = (e) => {
        let customer = Customers.find(customer => customer.phone.slice(-4) === product.consigner_phone);
        if (customer === undefined) {
            alert("해당 회원이 존재하지 않습니다.");
        }
        else {
            console.log(customer);
            alert(customer.name + " : " + customer.phone);
        }
        e.preventDefault();
    }

    const onSubmitProduct = (e) => {
        e.preventDefault();
        console.log(product);
    }


    return (
        <Container className={classes.root}>

            <Paper component='main' elevation={3} className={classes.paper}>

                <Typography variant="h4" align="center" className={classes.header}>
                    위탁상품등록
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <form className={classes.form} onSubmit={onSubmitProduct}>

                            <Paper variant="outlined" className={classes.item}>
                                <Typography variant="h6" align="center" paragraph>
                                    위탁자 개인정보
                        </Typography>
                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <TextField
                                            type="number"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="위탁자 휴대폰번호 뒤 4자리"
                                            name="consigner_phone"
                                            value={product.consigner_phone}
                                            onChange={onChangeHandler}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment>
                                                        <Button onClick={onSearchCustomer}><SearchIcon /></Button>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            type="number"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="계좌번호"
                                            name="account_number"
                                            value={product.account_number}
                                            onChange={onChangeHandler}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="계좌은행"
                                            name="bank"
                                            value={product.bank}
                                            onChange={onChangeHandler}
                                        />
                                    </Grid>

                                    <Grid container justify="flex-end">
                                        <Grid item>
                                            <Link to="/register-customer" variant="body2">
                                                <Button className={classes.checkbox}>회원이 아니신가요? 회원등록</Button>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Paper>

                            <Paper variant="outlined" className={classes.item}>

                                <Typography variant="h6" align="center" paragraph>
                                    상품정보
                        </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={8}>
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

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            type="number"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="수량"
                                            name="quantity"
                                            value={product.quantity}
                                            onChange={onChangeHandler}
                                            InputProps={{
                                                inputProps: { min: 1 }
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            type="number"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="감정가(판매가격)"
                                            name="retail_price"
                                            value={product.retail_price}
                                            onChange={onChangeHandler}
                                        />
                                    </Grid>


                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            type="number"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="희망가(고객희망)"
                                            name="hopeful_price"
                                            value={product.hopeful_price}
                                            onChange={onChangeHandler}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <TextField select label="고객정산방법" variant="outlined" name="settle" value={product.settle} onChange={onChangeHandler} className={classes.menuitem}>
                                            <MenuItem value={"포인트"}>포인트</MenuItem>
                                            <MenuItem value={"계좌이체"}>계좌이체</MenuItem>
                                        </TextField>
                                    </Grid>


                                    <Grid item xs={12} sm={6}>
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

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            type="number"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="최대할인율"
                                            name="max_discount"
                                            value={product.max_discount}
                                            onChange={onChangeHandler}
                                            InputProps={{
                                                inputProps: { min: 0, max: 100 }
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            label="제품에 대한 사연"
                                            name="something"
                                            value={product.something}
                                            onChange={onChangeHandler}
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>

                            <Button className={classes.submit} size="large" type="submit">상품등록</Button>

                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </Container >

    );
}

export default RegisterConsignProduct;