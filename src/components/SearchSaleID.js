import React, { useState } from 'react';
import { Grid, Button, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import axios from 'axios';

import useStyles from '../pages/Style';

const SearchSaleID = ({ items, onAddItem, onCompleteSale }) => {
    const classes = useStyles();
    const [id, setID] = useState('');

    const onChangeID = (e) => {
        setID(e.target.value);
    }

    const onSearchItem = (e) => {
        e.preventDefault();
        if(items.find(item => item.id === id)){
            alert('이미 담은 상품입니다.');
        } else{
            axios.get('api/searchProduct', {
                params: {
                    id: id,
                }
            })
                .then((res) => {
                    if (res.data === "해당 ID의 상품이 없습니다.") {
                        alert(res.data);
                    } else {
                        if (res.data[0].quantity < 1) {
                            alert("품절된 상품입니다.");
                        } else {
                            onAddItem(res.data[0]);
                        }
                        setID('');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("ID를 다시 입력해주세요.");
                })
        }
    }

    const onEmptyShoppingCart = () => {
        if (confirm("장바구니를 비우시겠습니까?")) {
            onCompleteSale();
        }
    }

    return (
        <>
            <Grid container spacing={2} className={classes.form} justify="center">
                <Grid item xs={12}>
                    <form onSubmit={onSearchItem}>
                    <TextField
                        type="text"
                        variant="outlined"
                        fullWidth
                        label="ID"
                        name="id"
                        value={id}
                        onChange={onChangeID}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <Button type="submit"><SearchIcon /></Button>
                                </InputAdornment>
                            )
                        }}
                    />
                    </form>
                </Grid>
            </Grid>
            <Grid container justify="flex-end">
                <Grid item>
                    <Button className={classes.next} onClick={onEmptyShoppingCart} size="large"><RemoveShoppingCartIcon /> 장바구니 비우기</Button>
                </Grid>
            </Grid>
        </>

    );

};



export default SearchSaleID;