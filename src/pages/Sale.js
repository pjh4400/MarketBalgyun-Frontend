import React, { useState } from 'react';
import SaleGeneralItem from '../components/SaleGeneralItem';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './Style';
import GeneralProducts from "../tempDB/GeneralProducts";

const Sale = () => {
    const [items, setItems] = useState([]);
    const [mode, setMode] = useState("before");
    const [sumPrice, setSumPrice] = useState(0);
    const [searchID, setSearchID] = useState("");

    const classes = useStyles();

    const onSearchIDHandler = (e) => {
        setSearchID(e.target.value);
    };

    const onSearchItem = (e) => {
        let item = GeneralProducts.find(it => it.id == searchID);
        if (item === undefined) {
            alert("ID를 다시 입력해주세요." + searchID);
        }
        else {
            setSumPrice(sumPrice + item.price);
            setItems(items.concat(item));
        }
        e.preventDefault();
    }

    const onRemoveItem = (id) => {
        setItems(items.filter(it => it.id !== id));
        alert("판매하기 페이지로 이동");
        e.preventDefault();
    }

    const onSaleComplete = (e) => {
        alert("판매하기 페이지로 이동");
        e.preventDefault();
    }


    return (
        <Container component="main" maxwidth="xs" className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography component="h1" variant="h4" align="center" className={classes.header}>
                    상품판매
                </Typography>

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

                <Grid container spacing={2}>
                    {items.map(item => (
                        <SaleGeneralItem item={item} key={item.id} />
                    ))}
                </Grid>

                <Button className={classes.submit} type="submit"  size="large" onClick={onSaleComplete}>
                    총 {sumPrice} 원 판매하기
                </Button>
            </Paper>
        </Container>
    );

};



export default Sale;