import React, { useState, useRef } from 'react';
import { Button, TextField, FormControlLabel, Checkbox, Grid, MenuItem, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from "./Style";
import Customers from '../tempDB/Customers';


const CustomerInfo = ({ mode }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [likeCategory, setLikeCategory] = useState('');
    const [taste, setTaste] = useState('');
    const [boolSMS, setBoolSMS] = useState(false);
    const [boolLecture, setBoolLecture] = useState(false);
    const [something, setSomething] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [mainNumber, setMainNumber] = useState('');
    const [searchNumber, setSearchNumber] = useState('');

    const [customer, setCustomer] = useState({});
    
    const classes = useStyles();

    const onNameHandler = (e) => {
        setName(e.target.value);
    };

    const onPhoneHandler = (e) => {
        setPhone(e.target.value);
    };

    const onLikeCategoryHandler = (e) => {
        setLikeCategory(e.target.value);
    };


    const onTasteHandler = (e) => {
        setTaste(e.target.value);
    };

    const onBoolSMSHandler = (e) => {
        setBoolSMSHandler(e.target.checked);
    };

    const onBoolLectureHandler = (e) => {
        setBoolLecture(e.target.checked);
    };

    const onSomethingHandler = (e) => {
        setSomething(e.target.value);
    };

    const onEmailHandler = (e) => {
        setEmail(e.target.value);
    };


    const onBirthdayHandler = (e) => {
        setBirthday(e.target.value);
    };

    const onGenderHandler = (e) => {
        setGender(e.target.value);
    };

    const onAddressHandler = (e) => {
        setAddress(e.target.value);
    };

    const onMainNumberHandler = (e) => {
        setMainNumber(e.target.value);
    };


    const onSubmitForm = (e) => {
        alert('정상적으로 등록되었습니다.');
        e.preventDefault();
    }

    const onSearchNumberHandler = (e) => {
        setSearchNumber(e.target.value);
    };

    const onSearchCustomer = (e) => {
        let customer = Customers.find(customer => customer.phone.slice(-4) === searchNumber);
        if (customer === undefined) {
            alert("해당 회원이 존재하지 않습니다.");
        }
        else {
            console.log(customer);
            setCustomer(customer);
            setName(customer.name);
            setPhone(customer.phone);
            setLikeCategory(customer.likeCategory);
            setTaste(customer.taste);
            setBoolLecture(customer.boolLecture);
            setBoolSMS(customer.boolSMS);
            setSomething(customer.something);
            setEmail(customer.email);
            setBirthday(customer.birthday);
            setGender(customer.gender);
            setAddress(customer.address);
            setMainNumber(customer.mainNumber);
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
                    onChange={onSearchNumberHandler}  
                    value={searchNumber}    
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
                            onChange={onNameHandler}
                            value={name}
                            autoFocus
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField select label= "성별" variant="outlined" value={gender} onChange={onGenderHandler} className={classes.menuitem}>
                            <MenuItem value={'F'}>여성</MenuItem>
                            <MenuItem value={'M'}>남성</MenuItem>
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
                            name="phonenumber"
                            onChange={onPhoneHandler}
                            value={phone}
                        />

                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value={boolSMS} onChange={onBoolSMSHandler} className={classes.checkbox} />}
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
                            onChange={onLikeCategoryHandler}
                            value={likeCategory}
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
                            onChange={onTasteHandler}
                            value={taste}
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
                            onChange={onEmailHandler}
                            value={email}
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
                            onChange={onBirthdayHandler}
                            value={birthday}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            variant="outlined"
                            fullWidth
                            label="주소"
                            name="address"
                            onChange={onAddressHandler}
                            value={address}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={<Checkbox value={boolLecture} onChange={onBoolLectureHandler} className={classes.checkbox} />}
                            label="강좌관심여부"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField select label="주거래매장" variant="outlined" value={mainNumber} onChange={onMainNumberHandler}>
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
                            onChange={onSomethingHandler}
                            value={something}
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