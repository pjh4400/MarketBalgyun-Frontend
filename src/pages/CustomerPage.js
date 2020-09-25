import React, { useState, useRef, useEffect } from 'react';
import { Container,Paper, Typography, Button, TextField, FormControlLabel, Checkbox, Grid, MenuItem, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from "./Style";
import axios from 'axios';


const CustomerPage = () => {
    const [mode, setMode] = useState("new");
    const [customer, setCustomer] = useState({
        name: '',
        phone: '',
        taste: '',
        boolSMS: false,
        boolLecture: false,
        likeCategory: '',
        something: '',
        email: '',
        birthday: '',
        gender: 'F',
        address: '',
        mainNumber: 1,
        point: 0,
    });

    const classes = useStyles();

    useEffect(() => {
        setCustomer({
            name: '',
            phone: '',
            taste: '',
            boolSMS: false,
            boolLecture: false,
            likeCategory: '',
            something: '',
            email: '',
            birthday: '',
            gender: 'F',
            address: '',
            mainNumber: 1,
            point: 0,
        });
    },[mode]);

    const onChangeHandler = (e) => {
        e.preventDefault();
        console.log(e.target.type + " " + e.target.checked);
        setCustomer({
            ...customer,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        });
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log(customer);
        if (mode === "new") {   // 등록
            alert("등록하시겠습니까?");
            axios.post('api/customer', customer)
                .then((res) => {
                    alert("정상적으로 등록되었습니다.");
                })
                .catch((error) => {
                    console.log(error);
                })
        } else { // 수정
            alert("수정하시겠습니까?");
            axios.put('api/customer', customer)
                .then((res) => {
                    alert("정상적으로 수정되었습니다.");
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    const onSearchCustomer = (e) => {
        e.preventDefault();
        axios.get('api/customer', {
            params: {
                phone: e.target.number.value,
            }
        })
            .then((res) => {
                if (res.data === "No Customer") {
                    setCustomer({
                        name: '',
                        phone: '',
                        taste: '',
                        boolSMS: false,
                        boolLecture: false,
                        likeCategory: '',
                        something: '',
                        email: '',
                        birthday: '',
                        gender: 'F',
                        address: '',
                        mainNumber: 1,
                        point: 0,
                    });
                    alert("해당 회원이 없습니다.");
                }
                else {
                    setCustomer(res.data[0]);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <Container className={classes.root}>

            <Paper width="50%" component='main' elevation={3} className={classes.paper}>

                <Typography component="h1" variant="h4" align="center" className={classes.header}>
                    회원관리
            </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button className={classes.submit} type="submit" size="large" onClick={() => { setMode("new"); }}>
                            회원등록
                    </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button className={classes.submit} type="submit" size="large" onClick={() => { setMode("old"); }}>
                            회원조회 및 수정
                    </Button>
                    </Grid>

                    {mode === "old" ?
                        <form className={classes.form} onSubmit={onSearchCustomer}>
                            <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                label="휴대폰번호 뒤 네자리"
                                name="number"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <Button type="submit"><SearchIcon /></Button>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </form> : <></>}
                    {mode === "old2" ?
                        <form className={classes.form} onSubmit={onSearchCustomer}>
                            <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                label="고객명"
                                name="name"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <Button type="submit"><SearchIcon /></Button>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </form> : <></>}
                    <form className={classes.form} onSubmit={onSubmitForm}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="고객명"
                                    name="name"
                                    value={customer.name}
                                    onChange={onChangeHandler}
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField select label="성별" variant="outlined" name="gender" value={customer.gender} onChange={onChangeHandler} className={classes.menuitem}>
                                    <MenuItem value={"F"}>여성</MenuItem>
                                    <MenuItem value={"M"}>남성</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    helperText="예) 01011112222"
                                    label="전화번호"
                                    name="phone"
                                    value={customer.phone}
                                    onChange={onChangeHandler}
                                />

                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox onChange={onChangeHandler} name="boolSMS" checked={customer.boolSMS} className={classes.checkbox} />}
                                    label="SMS수신동의"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    helperText="예) 브랜드그릇, 인테리어"
                                    label="관심상품"
                                    name="likeCategory"
                                    value={customer.likeCategory}
                                    onChange={onChangeHandler}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    helperText="예) 빈티지"
                                    label="선호 스타일"
                                    name="taste"
                                    value={customer.taste}
                                    onChange={onChangeHandler}
                                />
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    helperText="예) market@naver.com"
                                    label="이메일"
                                    name="email"
                                    value={customer.email}
                                    onChange={onChangeHandler}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    helperText="예) 980626"
                                    label="생년월일"
                                    name="birthday"
                                    value={customer.birthday}
                                    onChange={onChangeHandler}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    label="주소"
                                    name="address"
                                    value={customer.address}
                                    onChange={onChangeHandler}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={<Checkbox onChange={onChangeHandler} name="boolLecture" checked={customer.boolLecture} className={classes.checkbox} />}
                                    label="강좌관심여부"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField select label="주거래매장" variant="outlined" name="mainNumber" value={customer.mainNumber} onChange={onChangeHandler}>
                                    <MenuItem value={1}>1호점</MenuItem>
                                    <MenuItem value={2}>2호점</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    label="비고"
                                    name="something"
                                    value={customer.something}
                                    onChange={onChangeHandler}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button className={classes.submit} type="submit" size="large">
                                    {mode === 'new' ? "등록하기" : "수정하기"}
                                </Button>
                            </Grid>
                        </Grid>

                    </form>
                </Grid>
            </Paper>
        </Container>




    );
}

export default CustomerPage;