import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid, Button, TextField, InputAdornment, Card, CardContent, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import useStyles from './Style';

const ConsignInfo = () => {
    return (
        <Container component="main" maxwidth="xs" className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography component="h1" variant="h4" align="center" className={classes.header}>
                    위탁자 정보
                </Typography>

                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <Card className={cardClasses.card}>
                            <CardContent>
                                <div className={cardClasses.cardDetails}>
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
                                        포인트 : {membership && customer.point} </Typography>

                                    {!membership ||
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
                                        </form>}
                                </div>
                            </CardContent>
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

                    <Button className={classes.submit} size="large" onClick={onSubmitPay}>
                        총 {finalPrice} 원 판매하기
                    </Button>
                </Grid>
            </Paper>
        </Container>
    );
}

export default ConsignInfo;