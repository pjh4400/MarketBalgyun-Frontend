import React, { useState, useRef } from 'react';
import { Button, TextField, FormControlLabel, Checkbox, Grid, MenuItem, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from "./Style";
import Customers from '../tempDB/Customers';


const CustomerInfo = ({ mode }) => {
    const [customer, setCustomer] = useState({
        name: '',
        phone : '',
        taste : '',
        boolSMS : false,
        boolLecture : false,
        likeCategory : '',
        something : '',
        email : '',
        birthday : '',
        gender : 'F',
        address : '',
        mainNumber : 1,
        point: 0,
    });

    const onChangeHandler = (e) => {
        e.preventDefault();
        setCustomer({
            ...customer,
            [e.target.name] : e.target.type==='checkbox' ? e.target.checked : e.target.value,
        });
    }

    const classes = useStyles();


    const onSubmitForm = (e) => {
        // TODO : post
        alert('정상적으로 등록되었습니다.');
        e.preventDefault();
    }

    const onSearchCustomer = (e) => {
        let customer = Customers.find(customer => customer.phone.slice(-4) === e.target.number.value);
        if (customer === undefined) {
            alert("해당 회원이 존재하지 않습니다.");
        }
        else {
            console.log(customer);
            setCustomer(customer);
            alert(customer.name + " : " + customer.phone);
        }
        e.preventDefault();
    }

    return (
        <>
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
                        <TextField select label= "성별" variant="outlined" value={customer.gender} defaultValue={customer.gender} onChange={onChangeHandler} className={classes.menuitem}>
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
                            control={<Checkbox onChange={onChangeHandler} value={customer.boolSMS} className={classes.checkbox} />}
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
                            control={<Checkbox onChange={onChangeHandler} name="boolLecture" value={customer.boolLecture} className={classes.checkbox} />}
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
                            { mode==='new' ? "등록하기" : "수정하기" } 
                        </Button>
                    </Grid>
                </Grid>

            </form>
        </>


    );
}

export default CustomerInfo;