import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid, Button, TextField, MenuItem, InputAdornment, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Navigation from '../components/Navigation';
import useStyles from './Style';


const ConsignProduct = () => {
    const [mode, setMode] = useState('new'); // 새로 등록 시 'new', 기존 정보 조회 및 수정 시 'old', 상품 선택후 'old2'
    const [product, setProduct] = useState({
        id: '',
        name: '',
        price: 0,
        wanted_price: 0,
        quantity: 1,
        story: '',
        max_discount: 0,
        place: 0,
        consigner: '',
        phone: '',
        accountable: true,
        date: '',
    });

    const [consigner, setConsigner] = useState({
        name: '',
        bank: '',
        account: '',
        account_owner: '',
    })

    const classes = useStyles();


    useEffect(() => {
        setProduct({
            id: '',
            name: '',
            price: 0,
            wanted_price: 0,
            quantity: 1,
            story: '',
            max_discount: 0,
            place: 0,
            consigner: '',
            phone: '',
            accountable: true,
            date: '',
        });
        setConsigner({
            name: '',
            bank: '',
            account: '',
            account_owner: '',
        });
    }, [mode === 'new']); // 상품 등록 시 초기화


    const onChangeHandler = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    }


    const onSearchCustomer = (e) => {
        axios.get('api/customer', {
            params: {
                phone: e.target.phone.value,
            }
        })
            .then((res) => {
                if (res.data === "No Customer") {
                    alert("해당 회원이 존재하지 않습니다.");
                }
                else {
                    let tmp = res.data[0];
                    setConsigner({
                        name: tmp.name,
                        bank: tmp.bank,
                        account: tmp.account,
                        account_owner: tmp.account_owner,
                    });
                    setProduct({
                        ...product,
                        consigner: tmp.name,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
        e.preventDefault();

    }

    const onSearchProduct = (e) => {
        e.preventDefault();
        axios.get('api/consignProduct', {
            params: {
                id: e.target.id.value,
            }
        })
            .then((res) => {
                if (res.data === "No Consign Product") {
                    alert("해당 상품이 없습니다.");
                }
                else {
                    let tmp = res.data[0];
                    console.log(tmp);
                    setProduct({
                        id: tmp.id,
                        name: tmp.name,
                        price: tmp.price,
                        wanted_price: tmp.wanted_price,
                        quantity: tmp.quantity,
                        story: tmp.story,
                        max_discount: tmp.max_discount,
                        place: tmp.place,
                        consigner: tmp.consigner,
                        phone: tmp.phone,
                        accountable: tmp.accountable,
                        date: tmp.date,
                    });
                    axios.get('api/customer', {
                        params: {
                            phone: tmp.phone
                        }
                    }).then((res) => {
                        if (res.data !== "No Customer") {
                            let tmp2 = res.data[0];
                            setConsigner({
                                name: tmp2.name,
                                bank: tmp2.bank,
                                account: tmp2.account,
                                account_owner: tmp2.account_owner,
                            });
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                    setMode('old2');
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onSubmitProduct = (e) => {
        e.preventDefault();
        switch (mode) {
            case 'new':
                if (confirm('등록하시겠습니까?')) {
                    axios.post('api/consignProduct', product)
                        .then((res) => {
                            if (res.data === 'Posting Success') {
                                alert('정상적으로 등록되었습니다.');
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
                break;

            case 'old2':
                if (confirm('수정하시겠습니까?')) {
                    axios.put('api/consignProduct', product)
                        .then((res) => {
                            alert('수정되었습니다.');
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
                break;

            default:
                break;
        }
    }


    const consignerInfo = () => {
        return (
            <Grid item xs={12}>
                <Typography component="h3" variant="h5" paragraph>
                    위탁자 성함 : {consigner.name}
                </Typography>
                <Typography variant="body1">
                    은행 : {consigner.bank}
                </Typography>
                <Typography variant="body1">
                    계좌명의 : {consigner.account_owner}
                </Typography>
                <Typography variant="body1">
                    계좌번호 : {consigner.account}
                </Typography>
            </Grid>
        );
    }

    return (
        <Container className={classes.root}>

            <Paper component='main' elevation={3} className={classes.paper}>

                <Typography variant="h4" align="center" className={classes.header}>
                    위탁상품관리
                </Typography>
                <Navigation />

                <Grid container spacing={2}>

                    <Grid item xs={12} sm={6}>
                        <Button className={classes.submit} type="submit" size="large" onClick={() => { setMode("new"); }}>
                            상품등록
                    </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button className={classes.submit} type="submit" size="large" onClick={() => { setMode("old"); }}>
                            상품조회 및 수정
                    </Button>
                    </Grid>

                    {mode !== "new" &&
                        <form className={classes.form} onSubmit={onSearchProduct}>
                            <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                label="ID"
                                name="id"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <Button type="submit"><SearchIcon /></Button>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </form>}


                    {mode !== "old" &&
                        <Grid item xs={12}>
                            <Paper variant="outlined" className={classes.item}>
                                <Typography variant="h6" align="center" paragraph>
                                    위탁자 개인정보
                        </Typography>
                                <Grid container spacing={2}>

                                    {mode !== 'old2' &&
                                        <form className={classes.form} onSubmit={onSearchCustomer}>
                                            <TextField
                                                type="number"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="위탁자 휴대폰번호 뒤 4자리"
                                                name="phone"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment>
                                                            <IconButton type="submit"><SearchIcon /></IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </form>
                                    }




                                    {consignerInfo()}

                                    {mode === 'new' &&
                                        <Grid container justify="flex-end">
                                            <Grid item>
                                                <Link to="/register-customer" variant="body2">
                                                    <Button className={classes.checkbox}>회원이 아니신가요? 회원등록</Button>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    }

                                </Grid>

                            </Paper>

                            <Paper variant="outlined" className={classes.item}>

                                <Typography variant="h6" align="center" paragraph>
                                    상품정보
                        </Typography>
                                <form className={classes.form} onSubmit={onSubmitProduct}>
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
                                                name="price"
                                                value={product.price}
                                                onChange={onChangeHandler}
                                            />
                                        </Grid>


                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                type="number"
                                                variant="outlined"
                                                fullWidth
                                                label="희망가(고객희망)"
                                                name="wanted_price"
                                                value={product.wanted_price}
                                                onChange={onChangeHandler}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={4}>
                                            <TextField select label="고객정산방법" variant="outlined" name="accountable" value={product.accountable} onChange={onChangeHandler} className={classes.menuitem}>
                                                <MenuItem value={false}>포인트</MenuItem>
                                                <MenuItem value={true}>계좌이체</MenuItem>
                                            </TextField>
                                        </Grid>


                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                type="text"
                                                variant="outlined"
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
                                                name="story"
                                                value={product.story}
                                                onChange={onChangeHandler}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Button className={classes.submit} size="large" type="submit">{mode === 'new' ? '상품등록' : '상품수정'}</Button>
                                </form>
                            </Paper>
                        </Grid>
                    }
                </Grid>

            </Paper>
        </Container >

    );
}

export default ConsignProduct;