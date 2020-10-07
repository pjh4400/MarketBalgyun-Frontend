import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, TextField, FormControlLabel, Checkbox, Grid, MenuItem, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import Navigation from '../components/Navigation';
import useStyles from './Style';
import axios from 'axios';


const CustomerPage = ({ history }) => {
    const [mode, setMode] = useState('new');
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
        bank: '',
        account: '',
        account_owner: '',
        time: '',
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
            bank: '',
            account: '',
            account_owner: '',
            time: '',
        });
    }, [mode === 'new']);


    const onChangeHandler = (e) => {
        e.preventDefault();
        setCustomer({
            ...customer,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        });
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log(customer);
        switch (mode) {
            case 'new': // 등록
                if (confirm('등록하시겠습니까?')) {
                    axios.post('api/customer', customer)
                        .then((res) => {
                            if (res.data === '이미 등록된 번호입니다.') {
                                alert(res.data);
                            } else {
                                alert('정상적으로 등록되었습니다.');
                                history.push('/');

                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
                break;

            case 'old2': // 수정
                if (confirm("수정하시겠습니까?")) {
                    axios.put('api/customer', customer)
                        .then((res) => {
                            alert("정상적으로 수정되었습니다.");
                            history.push('/');
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
                break;

            default: // 검색 전
                alert("회원 정보를 입력해주세요.");
                break;
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
                switch (res.data) {
                    case "해당 번호의 회원이 여러명입니다. 번호 전체를 입력해주세요.":
                    case "해당 번호의 회원이 없습니다.":
                        alert(res.data);
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
                            bank: '',
                            account: '',
                            account_owner: '',
                            time: '',
                        });
                        break;
                    default:
                        setCustomer(res.data[0]);
                        setMode('old2');
                        break;
                }

            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <Container className={classes.root}>

            <Paper component='main' elevation={3} className={classes.paper}>

                <Typography component="h1" variant="h4" align="center" className={classes.header}>
                    회원관리
            </Typography>
                <Navigation />


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

                    {mode !== "new" ?
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

                    {mode !== "old" &&
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

                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        helperText="예) 국민"
                                        label="은행"
                                        name="bank"
                                        value={customer.bank}
                                        onChange={onChangeHandler}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        label="계좌명의"
                                        name="account_owner"
                                        value={customer.account_owner}
                                        onChange={onChangeHandler}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        label="계좌번호"
                                        name="account"
                                        value={customer.account}
                                        onChange={onChangeHandler}
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

                                < Paper variant="outlined" className={classes.item}>
                                    <Typography variant="h6" align="center">개인정보 이용 및 제공 동의서 및 설문지</Typography>

                                    <p>㈜마켓발견은 다양한 정보를 제공하기 위해 「개인정보보호법」 제15조 및 제22조에 근거하여 개인정보 수집·이용에 대한 동의를 받고자 합니다. 동의시 ㈜마켓발견에서 진행하는 다양한 정보들이 제공됩니다.</p>
                                    <p>1. 개인정보 수집 및 이용목적 :㈜마켓발견에서 진행하는 이벤트와 클래스 등 다양한 정보전달과 포인트적립을 위한 목적으로 수집합니다.</p>
                                    <p>2. 개인정보 수집 항목: 고객 성명, 전화번호, 이메일주소</p>
                                    <p>3. 개인정보 보유 및 이용기한 : 보유 기간은 3년입니다. 고객 요청시 그 전에 삭제합니다.</p>
                                    <p>4. 개인정보 수집 및 이용 동의 거부</p>
                                    <p>본인이 동의하지 않을 경우 수신 거부를 할 수 있으며 귀사의 정보를 제공받을 수 없음을 알려드립니다.</p>
                                </Paper>
                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={<Checkbox required className={classes.checkbox} />}
                                        label="개인 정보 수집 및 취급 방침에 대하여 동의합니다."
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button className={classes.submit} type="submit" size="large">
                                        {mode === 'new' ? "등록하기" : "수정하기"}
                                    </Button>
                                </Grid>
                            </Grid>

                        </form>
                    }
                </Grid>

            </Paper>
        </Container>




    );
}

export default CustomerPage;