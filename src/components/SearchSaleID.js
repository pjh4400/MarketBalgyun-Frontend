import React, { useState } from 'react';
import { Grid, Button, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import axios from 'axios';

import useStyles from '../pages/Style';

const SearchSaleID = ({ onAddItem, onCompleteSale }) => {
    const [searchID, setSearchID] = useState("");

    const classes = useStyles();

    const onSearchIDHandler = (e) => {
        setSearchID(e.target.value);
    };

    const onSearchItem = (e) => {
        e.preventDefault();
        axios.get('api/searchProduct', {
            params: {
                id: searchID,
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
                }
            })
            .catch((error) => {
                console.log(error);
                alert("ID를 다시 입력해주세요.");
            })
    }

    const onEmptyShoppingCart = () => {
        if (confirm("장바구니를 비우시겠습니까?")) {
            onCompleteSale();
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                    <TextField
                        type="text"
                        variant="outlined"
                        fullWidth
                        label="ID"
                        name="id"
                        onChange={onSearchIDHandler}
                        value={searchID}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <Button onClick={onSearchItem}><SearchIcon /></Button>
                                </InputAdornment>
                            )
                        }}
                    />
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