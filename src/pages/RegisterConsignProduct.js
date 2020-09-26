import React, { useState } from 'react';
import { Container, Typography, Paper, Grid, Button, TextField, MenuItem, InputAdornment, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/clear';
import axios from 'axios';
import Navigation from '../components/Navigation';
import useStyles from './Style';


const RegisterConsignProduct = () => {
    const [mode, setMode] = useState('new'); // 새로 등록 시 'new', 기존 정보 조회 및 수정 시 'old'
    const [consignerPhone, setConsignerPhone] = useState('');
    const [consignerName, setConsignerName] = useState('');
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

    const onChangePhone = (e) => {
        e.preventDefault();
        setConsignerPhone(e.target.value);

    }

    const onChangeHandler = (e) => {
        e.preventDefault();
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    }

    const onDeleteCustomer = (e) => {
        e.preventDefault();
        setConsignerName('');
        setConsignerPhone('');
        setProduct({
            ...product,
            consigner_phone: '',
        })
    }

    const onSearchCustomer = (e) => {
        axios.get('api/customer', {
            params: {
                phone: consignerPhone,
            }
        })
            .then((res) => {
                if (res.data === "No Customer") {
                    alert("해당 회원이 존재하지 않습니다.");
                }
                else {
                    console.log(res.data[0]);
                    setConsignerName(res.data[0].name);
                    setProduct({
                        ...product,
                        consigner_phone: consignerPhone,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    const onSubmitProduct = (e) => {
        e.preventDefault();
        console.log(product);
        axios.post('api/consignProduct', product)
            .then((res) => {
                if(res==='Posting Success'){
                    alert('정상적으로 등록되었습니다.');
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <Container className={classes.root}>

            <Paper component='main' elevation={3} className={classes.paper}>

                <Typography variant="h4" align="center" className={classes.header}>
                    위탁상품등록
                </Typography>
                <Navigation/>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <form className={classes.form} onSubmit={onSubmitProduct}>

                            <Paper variant="outlined" className={classes.item}>
                                <Typography variant="h6" align="center" paragraph>
                                    위탁자 개인정보
                        </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            type="number"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="위탁자 휴대폰번호 뒤 4자리"
                                            value={consignerPhone}
                                            onChange={onChangePhone}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment>
                                                        <IconButton onClick={onSearchCustomer}><SearchIcon /></IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            type="text"
                                            helperText="위탁자 성함(자동입력)"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            value={consignerName}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment>
                                                        <IconButton onClick={onDeleteCustomer}><ClearIcon /></IconButton>
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