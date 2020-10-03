import React, { useState } from "react";
import { Container, Paper, Typography, Grid, Button, TextField } from "@material-ui/core";
import axios from "axios";
import Navigation from "../components/Navigation";

import useStyles from "../pages/Style";

const Trader = () => {
    const [traderItem, setTraderItem] = useState({
        name: "",
        trader_number: "",
        CEO: "",
        business: "",
        business_item: "",
        phone: "",
        mobile_phone: "",
        email: "",
        site: "",
        post: "",
        address: "",
        staff: "",
        bank: "",
        account: "",
        account_owner: "",
        fee: 0,
    });

    const onChangeHandler = (e) => {
        setTraderItem({
            ...traderItem,
            [e.target.name]: e.target.value,
        });
    };

    const classes = useStyles();

    const onSubmitTraderItem = (e) => {
        e.preventDefault();
        //alert("매입처 등록");
        if (confirm("등록하시겠습니까?")) {
            axios
                .post("api/trader", traderItem)
                .then((res) => {
                    if (res.data) {
                        alert(res.data + "등록완료");
                    } else {
                        alert("백이 아직...");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <Container className={classes.root}>
            <Paper
                width="50%"
                component="main"
                elevation={3}
                className={classes.paper}
            >
                <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    className={classes.header}
                >
                    매입처 등록
        </Typography>
                <Navigation />
                <form className={classes.form} onSubmit={onSubmitTraderItem}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                Type="text"
                                variant="outlined"
                                required
                                fullWidth
                                label="매입처명"
                                name="name"
                                value={traderItem.name}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                Type="text"
                                variant="outlined"
                                fullWidth
                                label="사업자번호"
                                name="trader_number"
                                value={traderItem.trader_number}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                Type="text"
                                variant="outlined"
                                fullWidth
                                label="CEO"
                                name="CEO"
                                value={traderItem.CEO}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                Type="text"
                                variant="outlined"
                                required
                                fullWidth
                                label="업체"
                                name="business"
                                value={traderItem.business}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                Type="text"
                                variant="outlined"
                                fullWidth
                                label="종목"
                                name="business_item"
                                value={traderItem.business_item}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                Type="text"
                                variant="outlined"
                                fullWidth
                                label="전화번호"
                                name="phone"
                                value={traderItem.phone}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                Type="text"
                                variant="outlined"
                                fullWidth
                                label="휴대전화"
                                name="mobile_phone"
                                value={traderItem.mobile_phone}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                Type="text"
                                variant="outlined"
                                fullWidth
                                label="메일"
                                name="email"
                                value={traderItem.email}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                Type="text"
                                variant="outlined"
                                fullWidth
                                label="거래처 홈페이지"
                                name="site"
                                value={traderItem.site}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                Type="text"
                                variant="outlined"
                                fullWidth
                                label="우편번호"
                                name="post"
                                value={traderItem.post}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                Type="text"
                                variant="outlined"
                                fullWidth
                                label="주소"
                                name="address"
                                value={traderItem.address}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                Type="text"
                                variant="outlined"
                                fullWidth
                                label="관리사원"
                                name="staff"
                                value={traderItem.staff}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                Type="text"
                                variant="outlined"
                                fullWidth
                                label="거래은행"
                                name="bank"
                                value={traderItem.bank}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                Type="text"
                                variant="outlined"
                                fullWidth
                                label="계좌번호"
                                name="account"
                                value={traderItem.account}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                Type="text"
                                variant="outlined"
                                fullWidth
                                label="예금주"
                                name="account_owner"
                                value={traderItem.account_owner}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                Type="text"
                                variant="outlined"
                                fullWidth
                                label="수수료"
                                name="fee"
                                value={traderItem.fee}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                    </Grid>
                    <Button className={classes.submit} size="large" type="submit">
                        매입처등록
          </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Trader;
