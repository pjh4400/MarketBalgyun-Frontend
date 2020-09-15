import React, { useState, useEffect } from 'react';
import Customers from '../tempDB/Customers';
import { Container, Typography, Paper, Grid, Button, TextField, InputAdornment, Card, CardContent, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { makeStyles } from '@material-ui/core/styles';

import useStyles from './Style';


const useStyles2 = makeStyles((theme) => ({
    card: {
        width: "100%",
    },
    cardDetails: {
        flex: 1,
    },
    twoComponents: {
        display: 'inline-flex',
        padding: 10,
    }
}));


const Payment = ({ sum_price, onDiscount, onApplyPoint }) => {
    const [membership, setMemberShip] = useState(false);
    const [customer, setCustomer] = useState({});
    const [finalPrice, setFinalPrice] = useState(sum_price);

    const [point, setPoint] = useState(0);
    const [card, setCard] = useState(0);
    const [cash, setCash] = useState(0);

    const classes = useStyles();
    const cardClasses = useStyles2();


    useEffect(() => {
        setFinalPrice(sum_price - point);
    },[point]);


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


    const onApplyPointHandler = (e) => {
        e.preventDefault();
        let tmpPoint = Number(e.target.point.value);
        if (tmpPoint < 0) {
            alert("잘못된 입력입니다.");
        }
        else if (tmpPoint > customer.point) {
            alert("최대 사용 가능 포인트는 " + customer.point + "p 입니다.");
        }
        else {
            setPoint(tmpPoint);
        }
    }

    const onSearchCustomer = (e) => {
        let customer = Customers.find(customer => customer.phone.slice(-4) === e.target.phone.value);
        if (customer === undefined) {
            alert("해당 회원이 존재하지 않습니다." + e.target.phone.value);
        }
        else {
            setCustomer(customer);
            setMemberShip(true);
            alert(customer.name + " : " + customer.phone);
        }
        e.preventDefault();
    }


    return (
        <Container component="main" maxwidth="xs" className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography component="h1" variant="h4" align="center" className={classes.header}>
                    상품결제 총 {sum_price} 원
                </Typography>

                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <Card className={cardClasses.card}>
                            <div className={cardClasses.cardDetails}>
                                <CardContent>
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
                                        이름 : {customer && customer.name} </Typography>
                                    <Typography variant="subtitle1">
                                        전화번호 : {customer && customer.phone} </Typography>
                                    <Typography variant="subtitle1">
                                        포인트 : {customer && customer.point} </Typography>
                                    
                                    { !membership || 
                                     <form className={classes.form} onSubmit={onApplyPointHandler}>
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
                                 </form> }                                  
                                </CardContent>
                            </div>
                        </Card>
                    </Grid>


                    <Grid item xs={12}>
                        <Card className={cardClasses.card}>
                            <div className={cardClasses.cardDetails}>
                                <CardContent>
                                    <Typography component="h3" variant="h5" paragraph>
                                        결제 방식
                                    </Typography>
                                    <Grid item xs={12} sm={4} className={cardClasses.twoComponents}>
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
                                    <Grid item xs={12} sm={2} className={cardClasses.twoComponents}>
                                        <IconButton onClick={onExchange}><SwapHorizIcon /></IconButton>
                                    </Grid>

                                    <Grid item xs={12} sm={4} className={cardClasses.twoComponents}>
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

                    <Button className={classes.submit} size="large">
                        총 {finalPrice} 원 판매하기
                    </Button>
                </Grid>
            </Paper>
        </Container>
    );

};



export default Payment;