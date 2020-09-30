import React, { useState } from 'react';
import { Button, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

import useStyles from '../pages/Style';

const SearchProduct = ({ onAddItem }) => {
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
                    onAddItem(res.data[0]);
                }
            })
            .catch((error) => {
                console.log(error);
                alert("ID를 다시 입력해주세요.");
            })
    }


    return (
        <form className={classes.form} onSubmit={onSearchItem}>
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
                            <Button type="submit"><SearchIcon /></Button>
                        </InputAdornment>
                    )
                }}
            />
        </form>

    );

};



export default SearchProduct;