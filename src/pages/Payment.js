import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Paper, Grid, Button, TextField, InputAdornment, Card, CardContent, IconButton } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import axios from 'axios';

import useStyles from './Style';


const Payment = ({ handleNext }) => {
    const { userName, items, sum_price } = useSelector(({ auth, sales }) => ({
        userName: auth.userName,
        items: sales.items,
        sum_price: sales.sum_price,
    }));

    const dispatch = useDispatch();
    const putConsignInfo = useCallback((consign_info) => dispatch(putConsignInfo(consign_info)), [dispatch]);

    const [membership, setMemberShip] = useState(false);
    const [customer, setCustomer] = useState({
        name: '',
        phone: '',
        point: 0
    });
    const [finalPrice, setFinalPrice] = useState(sum_price);

    const [point, setPoint] = useState(0);
    const [card, setCard] = useState(0);
    const [cash, setCash] = useState(0);

    const classes = useStyles();


    useEffect(() => {
        setFinalPrice(sum_price - point);
    }, [point]);


    useEffect(() => {
        setCash(finalPrice - card);
    }, [finalPrice, card]);


    const onCardHandler = (e) => {
        setCard(e.target.value);
    };

    const onCashHandler = (e) => {
        setCash(e.target.value);
    };

    const onExchange = () => {
        setCard(cash);
    };

    const onApplyPoint = (e) => {
        e.preventDefault();
        let tmpPoint = Number(e.target.point.value);
        if (tmpPoint < 0) {
            alert("잘못된 입력입니다.");
        }
        else if (tmpPoint > customer.point) {
            alert("최대 사용 가능 포인트는 " + customer.point + "p 입니다.");
        }
        else if (tmpPoint > sum_price) {
            setPoint(sum_price);
        }
        else {
            setPoint(tmpPoint);
        }
    }

    const onSearchCustomer = (e) => {
        e.preventDefault();
        axios.get('api/customer', {
            params: {
                phone: e.target.phone.value,
            }
        })
            .then((res) => {
                if (res.data === "No Customer") {
                    setCustomer({
                        name: '',
                        phone: '',
                        point: 0,
                    });
                    alert("해당 회원이 없습니다.");
                }
                else {
                    setCustomer({
                        name: res.data[0].name,
                        phone: res.data[0].phone,
                        point: res.data[0].point,
                    });
                    setMemberShip(true);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onSubmitPay = () => {
        if (confirm('판매하시겠습니까?')) {
            axios.post('api/saledProduct', {
                items: items,
                sum_price: sum_price,
                customer_name: customer.name,
                customer_phone: customer.phone,
                point: point,
                card: card,
                cash: cash,
                staff: userName,
            })
                .then((res) => {
                    console.log(res.data);
                    if (res.data.includes('부족')) {
                        alert(res.data); // 상품 부족 처리 안됨
                    } else {
                        putConsignInfo(res.data);
                        handleNext();
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <>
            <Typography component="h1" variant="h4" align="center" className={classes.header}>
                상품결제 총 {sum_price} 원
                </Typography>

            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <div className={classes.cardDetails}>
                                <Typography component="h3" variant="h5">
                                    구매자 정보
                                    </Typography>
                                <form className={classes.form} onSubmit={onSearchCustomer}>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        label="전화번호 뒤 네자리"
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
                                <Typography variant="subtitle1">
                                    이름 : {membership && customer.name} </Typography>
                                <Typography variant="subtitle1">
                                    전화번호 : {membership && customer.phone} </Typography>
                                <Typography variant="subtitle1">
                                    포인트 : {membership && customer.point}</Typography>

                                {!membership ||
                                            <form className={classes.form} onSubmit={onApplyPoint}>
                                                <TextField
                                                    type="number"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="포인트 적용 (p)"
                                                    name="point"
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment>
                                                                <IconButton type="submit"><CheckCircleIcon /></IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </form>}


                            </div>
                        </CardContent>
                    </Card>
                </Grid>


                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <div className={classes.cardDetails}>
                            <CardContent>
                                <Typography component="h3" variant="h5" paragraph>
                                    결제 방식 ( 포인트 : {point} )
                                    </Typography>
                                <Grid item xs={12} sm={4} className={classes.inlineComponents}>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        required
                                        fullWidth
                                        label="카드 (원)"
                                        name="card"
                                        onChange={onCardHandler}
                                        value={card}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2} className={classes.inlineComponents}>
                                    <IconButton onClick={onExchange}><SwapHorizIcon /></IconButton>
                                </Grid>

                                <Grid item xs={12} sm={4} className={classes.inlineComponents}>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        required
                                        fullWidth
                                        label="현금 (원)"
                                        name="cash"
                                        onChange={onCashHandler}
                                        value={cash}
                                        autoFocus
                                    />
                                </Grid>
                            </CardContent>
                        </div>
                    </Card>
                </Grid>

                <Button className={classes.submit} size="large" onClick={onSubmitPay}>
                    총 {finalPrice} 원 판매하기
                    </Button>
            </Grid>
        </>
    );

};



export default Payment;