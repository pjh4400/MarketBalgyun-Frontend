import React, { useState, useEffect } from "react";
import useStyles from '../pages/Style';
import { Typography, Grid, TextField, Button, Menu, MenuItem, InputAdornment } from '@material-ui/core';
import axios from 'axios';

import ClearIcon from '@material-ui/icons/clear';


const ProductInfo = ({ info, info2, onPreviousStep }) => {
    const classes = useStyles();

    const [exists, setExists] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isExist, setIsExist] = useState(false);

    const [product, setProduct] = useState({
        first_category: info.first_category,
        second_category: info.second_category,
        third_category: info.third_category,
        id: info.id,
        name: '',
        cost: 0,
        price: '',
        quantity: 1,
        max_discount: 0,
        place: '',
        company: '',
    });

    useEffect(() => {
        console.log(info2);
        console.log(product);
        if(info2){
            setProduct({
                ...product,
                name: info2.name,
                cost: info2.cost,
                price: info2.price,
                quantity: info2.quantity,
                max_discount: info2.max_discount,
                place: info2.place,
                company: info2.company,
            })
        }
        axios.get('api/generalProduct', {
            params: { id: info.id }
        })
            .then((res) => {
                console.log(res.data);
                setExists(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
        if(e.currentTarget.value){
            setIsExist(true);
            setProduct(exists.find(item => item.id.endsWith(String(e.currentTarget.value))));
        } 
    };

    const onChangeHandler = (e) => {
        e.preventDefault();
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    }


    const onSubmitProduct = (e) => {
        e.preventDefault();
        console.log(product);
        if(isExist){  // 수정
            if(confirm('수정하시겠습니까?')){
                axios.put('api/generalProduct', product)
                .then((res) => {
                    alert('수정되었습니다.'); 
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        } else{ // 등록
            if(exists.find(item => item.name === product.name)){
                alert('이미 등록된 이름입니다.');
            } else{
                if(confirm('등록하시겠습니까?')){
                    axios.post('api/generalProduct', product)
                    .then((res) => {
                        console.log(res);
                        if (res.data === 'Posting Success') {
                            alert('등록되었습니다.'); // ID 바로 주면 더 좋음
                            onPreviousStep();
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }
            }
        }
    }

    const onNoName = () => {
        let noName = exists.find(item => item.name === '없음');
        if(noName){
            setProduct(noName);
            setIsExist(true);
        } else {
            setProduct({
                ...product,
                name : '없음',
            })
            setIsExist(false);
        }
    }
    
    const onReset = () => {
        setProduct({
            first_category: info.first_category,
            second_category: info.second_category,
            third_category: info.third_category,
            id: info.id,
            name: '',
            cost: 0,
            price: 0,
            quantity: 1,
            max_discount: 0,
            place: '',
            trader: '',
        });
        setIsExist(false);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6" align="center" className={classes.header}>
                    상품정보
            </Typography>

                <form className={classes.form} onSubmit={onSubmitProduct}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                error
                                type="text"
                                variant="outlined"
                                required
                                fullWidth
                                label="상품명"
                                name="name"
                                value={product.name}
                                onChange={onChangeHandler}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <Button onClick={onNoName}><ClearIcon /></Button>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Button aria-controls="exist_names" aria-haspopup="true" onClick={handleClick} className={classes.next}>
                                기존 상품명 ▼ </Button>
                            <Menu
                                id="exist_names"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {exists && exists.map(item => (
                                    <MenuItem item={item} key={item.id} value={item.id} onClick={handleClose}>{item.name}</MenuItem>
                                ))}
                            </Menu>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                error
                                type="number"
                                variant="outlined"
                                required
                                fullWidth
                                label="판매가(원)"
                                name="price"
                                value={product.price}
                                onChange={onChangeHandler}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                error
                                type="number"
                                variant="outlined"
                                required
                                fullWidth
                                label="수량(개)"
                                name="quantity"
                                value={product.quantity}
                                onChange={onChangeHandler}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="number"
                                variant="outlined"
                                fullWidth
                                label="원가(원)"
                                name="cost"
                                value={product.cost}
                                onChange={onChangeHandler}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="number"
                                variant="outlined"
                                fullWidth
                                label="최대할인율(%)"
                                name="max_discount"
                                value={product.max_discount}
                                onChange={onChangeHandler}
                            />
                        </Grid>


                        <Grid item xs={12}>
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
                                label="매입처"
                                name="trader"
                                value={product.trader}
                                onChange={onChangeHandler}
                            />
                        </Grid>

                    </Grid>

                    <Button className={classes.submit} type="submit" size="large">{isExist ? '상품수정' : '상품등록'}</Button>

                    <Grid container justify="flex-end">
                        <Button className={classes.next} onClick={onPreviousStep}>이전</Button>
                        <Button className={classes.next} onClick={onReset}>초기화</Button>
                    </Grid>
                </form>
            </Grid>
        </Grid >
    );
}

export default ProductInfo;