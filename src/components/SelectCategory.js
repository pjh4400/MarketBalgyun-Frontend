import React, { useState } from 'react';
import { Container, Typography, Paper, Grid, Button, TextField, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import useStyles from '../pages/Style';
import FirstCategory from '../tempDB/FirstCategory';
import SecondCategory from '../tempDB/SecondCategory';
import ThirdCategory from '../tempDB/ThirdCategory';


const SelectCategory = () => {
    const [secondCategories, setSecondCategories] = useState([]);
    const [thirdCategories, setThirdCategories] = useState([]);

    const [product, setProduct] = useState({
        first_category: '',
        second_category: '',
        third_category: '',
    });

    const classes = useStyles();


    const onSelectFirstCategory = (e) => {
        let firstCategory = e.currentTarget.value;
        setProduct({
            first_category: firstCategory,
            second_category: '',
            third_category: '',
        });
        let secondCategory = SecondCategory.filter(category => category.first_category === firstCategory);
        setSecondCategories(secondCategory);
        setThirdCategories([]);
    }

    const onSelectSecondCategory = (e) => {
        let secondCategory = e.currentTarget.value;
        setProduct({
            ...product,
            second_category: secondCategory,
            third_category: '',
        });
        let thirdCategory = ThirdCategory.filter(category => category.second_category === secondCategory);
        setThirdCategories(thirdCategory);
    }


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
    }


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" align="center" >
                        대분류
                    </Typography>
                    <Divider />
                    <List>
                        {FirstCategory.map((category) => (
                            <ListItem key={category.first_category}> 
                                <Button value={category.first_category} onClick={onSelectFirstCategory} className={classes.button} fullWidth >
                                    {category.first_category}</Button>
                            </ListItem>
                        ))}
                        <ListItem>
                            <Button className={classes.button} fullWidth><AddCircleIcon fontSize='small'/> 추가</Button>
                        </ListItem>
                    </List>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" align="center">
                        중분류
                    </Typography>
                    <Divider />
                    <List>
                        {secondCategories && secondCategories.map((secondCategory) => (
                            <ListItem key={secondCategory.second_category} >
                                <Button value={secondCategory.second_category} onClick={onSelectSecondCategory} className={classes.button} fullWidth>
                                    {secondCategory.second_category}
                                </Button>
                            </ListItem>
                        ))}
                        {secondCategories && <ListItem>
                            <Button value="" onClick={onSelectSecondCategory} className={classes.button} fullWidth>없음</Button>
                        </ListItem>}
                    </List>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" align="center">
                        소분류
                    </Typography>
                    <Divider />
                    <List>
                        {thirdCategories && thirdCategories.map(thirdCategory => (
                            <ListItem key={thirdCategory.third_category}>
                                <Button onClick={() => {
                                    setProduct({
                                        ...product,
                                        third_category: thirdCategory.third_category
                                    })
                                }} className={classes.button} fullWidth>{thirdCategory.third_category}</Button>
                            </ListItem>
                        ))}
                          <ListItem>
                                <Button onClick={() => {
                                    setProduct({
                                        ...product,
                                        third_category: ''
                                    })
                                }}className={classes.button} fullWidth>없음</Button>
                            </ListItem>
                    </List>

                </Grid>
            </Grid >
        </>
    );
}

export default SelectCategory;