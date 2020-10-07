import React, { useState } from 'react';
import { Container, Typography, Paper, Grid, Button, TextField, MenuItem, InputAdornment, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import useStyles from '../pages/Style';


const RegisterConsign = ({ info, onPreviousStep }) => {
    const [product, setProduct] = useState({
        first_category: info.first_category,
        second_category: info.second_category,
        third_category: info.third_category,
        name: '',
        price: '',
        wanted_price: '',
        quantity: 1,
        story: '',
        max_discount: '',
        place: '',
        consigner: '',
        phone: '',
        accountable: true,
    });

    const [consigner, setConsigner] = useState({
        name: '',
        bank: '',
        account: '',
        account_owner: '',
    })

    const classes = useStyles();


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
                switch (res.data) {
                    case "해당 번호의 회원이 여러명입니다. 번호 전체를 입력해주세요.":
                    case "해당 번호의 회원이 없습니다.":
                        alert(res.data);
                        break;
                    default:
                        let tmp = res.data[0];
                        setConsigner({
                            name: tmp.name,
                            bank: tmp.bank,
                            account: tmp.account,
                            account_owner: tmp.account_owner,
                        });
                        setProduct({
                            ...product,
                            phone: tmp.phone,
                            consigner: tmp.name,
                        });

                        break;
                }

            })
            .catch((error) => {
                alert('서버에러');
                console.log(error);
            })
        e.preventDefault();

    }

    const onSubmitProduct = (e) => {
        e.preventDefault();
        if (consigner.name === '') {
            alert('위탁자 정보를 입력해주세요.');
        }
        else {
            if (confirm('등록하시겠습니까?')) {
                axios.post('api/consignProduct', product)
                    .then((res) => {
                        if (res.data) {
                            alert('등록 되었습니다.\n⊳ ID : ' + res.data);
                            onPreviousStep();
                            onSelectCategory('00', '0000', '000000');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
    }
    const onReset = () => {
        setProduct({
            first_category: info.first_category,
            second_category: info.second_category,
            third_category: info.third_category,
            name: '',
            price: '',
            wanted_price: '',
            quantity: 1,
            story: '',
            max_discount: '',
            place: '',
            consigner: '',
            phone: '',
            accountable: true,
        });
        setConsigner({
            name: '',
            bank: '',
            account: '',
            account_owner: '',
        });
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
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper variant="outlined" className={classes.item}>
                    <Typography variant="h6" align="center" paragraph>
                        위탁자 개인정보
                        </Typography>
                    <Grid container spacing={2}>
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


                        {consignerInfo()}


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
                                        inputProps: { min: 0 }
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

                        <Button className={classes.submit} size="large" type="submit">상품등록</Button>

                    </form>
                    <Grid container justify="flex-end">
                        <Button className={classes.next} onClick={onPreviousStep}>이전</Button>
                        <Button className={classes.next} onClick={onReset}>초기화</Button>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default RegisterConsign;