import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, Divider, List, ListItem} from '@material-ui/core';
import axios from 'axios';

import useStyles from '../pages/Style';


const SelectCategory = ({ info, onSelectCategory }) => {
    const [firstDB, setFirstDB] = useState([]);
    const [secondDB, setSecondDB] = useState([]);
    const [thirdDB, setThirdDB] = useState([]);


    const [category, setCategory] = useState({
        first_category: '',
        second_category: '',
        third_category: '',
    });

    const [secondCategories, setSecondCategories] = useState([]);
    const [thirdCategories, setThirdCategories] = useState([]);


    const classes = useStyles();

    useEffect(() => {
        axios.get('api/generalCategory', {})
            .then((res) => {
                setFirstDB(res.data.first_category);
                setSecondDB(res.data.second_category);
                setThirdDB(res.data.third_category);
                //console.log(firstDB);
                //console.log(secondDB);
                //console.log(thirdDB);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const onSelectFirstCategory = (e) => {
        let firstCategory = e.currentTarget.value;
        setCategory({
            first_category: firstCategory,
            second_category: '',
            third_category: '',
        });
    }

    const onSelectSecondCategory = (e) => {
        let secondCategory = e.currentTarget.value;
        setCategory({
            ...category,
            second_category: secondCategory,
            third_category: '',
        });
    }

    const onNextStep = (e) => {
        onSelectCategory(category.first_category, category.second_category, category.third_category);
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <Typography variant="h6" align="center" >
                    대분류
                    </Typography>
                <Divider />
                <List>
                    {firstDB && firstDB.map((category) => (
                        <ListItem key={category.FirstCategory}>
                            <Button value={category.FirstCategory} onClick={onSelectFirstCategory} className={classes.button} fullWidth >
                                {category.FirstCategory}</Button>
                        </ListItem>
                    ))}
                </List>
            </Grid>

            <Grid item xs={12} sm={4}>
                <Typography variant="h6" align="center">
                    중분류
                    </Typography>
                <Divider />
            </Grid>


            <Grid item xs={12} sm={4}>
                <Typography variant="h6" align="center">
                    소분류
                    </Typography>
                <Divider />
            </Grid>

            <Grid container justify="flex-end">
                <Button onClick={onNextStep} className={classes.next}>
                    다음
                  </Button>
            </Grid>
        </Grid >
    );
}

export default SelectCategory;