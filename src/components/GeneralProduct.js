import React, { useState, useEffect } from "react";
import useStyles from '../pages/Style';
import { Typography, Grid, TextField, Button, Menu, MenuItem, InputAdornment } from '@material-ui/core';
import axios from 'axios';

import ClearIcon from '@material-ui/icons/clear';
import SearchIcon from '@material-ui/icons/Search';


const GeneralProuct = ({ mode, info, onPreviousStep }) => {
    const [exists, setExists] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isExist, setIsExist] = useState(false);
    const [product, setProduct] = useState({
        first_category: '',
        second_category: '',
        third_category: '',
        id: '',
        name: '',
        cost: 0,
        price: '',
        quantity: 1,
        max_discount: 50,
        place: '',
        trader: '',
    });
    const classes = useStyles();


    useEffect(() => {
        if (mode === 'new') {
            setProduct({
                ...product,
                first_category: info.first_category,
                second_category: info.second_category,
                third_category: info.third_category,
            })
            axios.get('api/generalProduct', {
                params: { id: info.third_category }
            })
                .then((res) => {
                    setExists(res.data);
                })
                .catch((error) => {
                    alert('서버 에러');
                    console.log(error);
                })
        }
    }, []);

    const onSearchProduct = (e) => {
        e.preventDefault();
        axios.get('api/searchProduct', {
            params: {
                id: e.target.id.value,
            }
        })
            .then((res) => {
                if (res.data === "해당 ID의 상품이 없습니다.") {
                    alert(res.data);
                }
                else {
                    let tmp = res.data[0];
                    setProduct({
                        first_category: tmp.first_category,
                        second_category: tmp.second_category,
                        third_category: tmp.third_category,
                        id: tmp.id,
                        name: tmp.name,
                        cost: tmp.cost,
                        price: tmp.price,
                        quantity: tmp.quantity,
                        max_discount: tmp.max_discount,
                        place: tmp.place,
                        trader: tmp.trader,
                    });
                    setIsExist(true);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
        if (e.currentTarget.value) {
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
        if (isExist) {  // 수정
            if (confirm('수정하시겠습니까?')) {
                axios.put('api/generalProduct', product)
                    .then((res) => {
                        alert('수정되었습니다.');
                        setIsExist(false);
                    })
                    .catch((error) => {
                        alert('서버 에러');
                        console.log(error);
                    })
            }
        } else { // 등록
            if (exists.find(item => item.name === product.name)) {
                alert('이미 등록된 이름입니다.');
            } else {
                if (confirm('등록하시겠습니까?')) {
                    axios.post('api/generalProduct', product)
                        .then((res) => {
                            console.log(res.data);
                            if (res.data === '해당 이름의 상품이 이미 등록되어 있습니다.') {
                                alert(res.data);
                            } else {
                                alert('등록 되었습니다.\n⊳ ID : ' + res.data);
                                onPreviousStep();
                            }
                        })
                        .catch((error) => {
                            alert('서버 에러');
                            console.log(error);
                        })
                }
            }
        }
    }

    const onNoName = () => {
        let noName = exists.find(item => item.name === '없음');
        if (noName) {
            setProduct(noName);
            setIsExist(true);
        } else {
            setProduct({
                ...product,
                name: '없음',
            })
            setIsExist(false);
        }
    }


    const onDeleteProduct = () => {
        if (confirm('정말 삭제하시겠습니까?')) {
            axios.delete('api/generalProduct', {
                params: { id: product.id }
            })
                .then((res) => {
                    alert('삭제되었습니다.');
                    setIsExist(false);
                })
                .catch((error) => {
                    alert('서버에러');
                    console.log(error);
                })
        }
    }

    const onReset = () => {
        setProduct({
            first_category: '',
            second_category: '',
            third_category: '',
            id: '',
            name: '',
            cost: 0,
            price: 0,
            quantity: 1,
            max_discount: 50,
            place: '',
            trader: '',
        });
        setIsExist(false);
    }

    return (
        <Grid container spacing={2}>
            {mode === "old" &&
                <form className={classes.form} onSubmit={onSearchProduct}>
                    <TextField
                        type="text"
                        variant="outlined"
                        fullWidth
                        label="일반상품 ID"
                        name="id"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <Button type="submit"><SearchIcon /></Button>
                                </InputAdornment>
                            )
                        }}
                    />
                </form>}

            {(  mode === "new" || isExist ) &&
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

                            {mode === "new" &&
                                <Grid item xs={12} sm={4}>
                                    <Button onClick={handleClick} className={classes.next}>
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
                            }

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

                        {mode === 'new'
                            ?
                            <Button className={classes.submit} size="large" type="submit">상품등록</Button>
                            :
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Button className={classes.submit} type="submit" size="large">
                                        상품수정</Button>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Button className={classes.submit} size="large" onClick={onDeleteProduct}>
                                        상품삭제</Button>
                                </Grid>
                            </Grid>


                        }
                    </form>
                    {mode === 'new' &&
                        <Grid container justify="flex-end">
                            <Button className={classes.next} onClick={onPreviousStep}>이전</Button>
                            <Button className={classes.next} onClick={onReset}>초기화</Button>
                        </Grid>}
                </Grid>
            }
        </Grid >
    );
}

export default GeneralProuct;