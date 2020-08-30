import React, { useState }  from 'react';
import SaleGeneralItem from '../components/SaleGeneralItem';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


import useStyles from './Style';
import GeneralProducts from "../components/GeneralProducts";

const Sale = () => {
    const [items, setItems] = useState(GeneralProducts);
    const [mode, setMode] = useState("before");
    const [price, setPrice] = useState(0);
    const [searchID, setSearchID] = useState("");

    const classes = useStyles();
    
    
    const onSearchIDHandler = (e) => {
        setSearchID(e.target.value);
    };



    return (
        <Container className={classes.root}>
            <Paper component='main' elevation={3} className={classes.paper}>
                <Typography component="h1" variant="h4" align="center" className={classes.header}>
                     상품판매
                </Typography>
               
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
                           />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Button className={classes.search} type="submit" onClick={function (e) {onSearchItem(e.target.value);}}>
                                검색
                        </Button>
                    </Grid>


                    <Grid item xs={12}>
                        <List>
                            {items.map(items => (
                                <ListItem><SaleGeneralItem items={items} key={items.id} /></ListItem>
                            ))}
                        </List>
                    </Grid>

                    <Grid item xs={12}>
                        <Button className={classes.submit} type="submit" onClick={function (e) {onSearchItem(e.target.value);}}>
                                판매하기
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
    
};



export default Sale;