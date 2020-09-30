import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, Divider, List, ListItem} from '@material-ui/core';
import axios from 'axios';

import useStyles from '../pages/Style';

const SelectCategory = ({ onSelectCategory }) => {
    const [secondDB, setSecondDB] = useState([]);
    const [thirdDB, setThirdDB] = useState([]);


    const [category, setCategory] = useState({
        first_category: '',
        second_category: '',
        third_category: '',
    });

    const [firstCategories, setFirstCategories] = useState([]);
    const [secondCategories, setSecondCategories] = useState([]);
    const [thirdCategories, setThirdCategories] = useState([]);


    const classes = useStyles();

    useEffect(() => {
        axios.get('api/generalCategory', {})
            .then((res) => {
                setFirstCategories(res.data.first_category);
                setSecondDB(res.data.second_category);
                setThirdDB(res.data.third_category);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const onSelectFirstCategory = (e) => {
        let firstID = e.currentTarget.value;
        setCategory({
            first_category: firstID,
            second_category: '',
            third_category: '',
        });
        setSecondCategories(secondDB.filter(category => category.ID.startsWith(firstID)));
    }

    const onSelectSecondCategory = (e) => {
        let secondID = e.currentTarget.value;
        setCategory({
            ...category,
            second_category: secondID,
            third_category: '',
        });
        setThirdCategories(thirdDB.filter(category => category.ID.startsWith(secondID)));
    }

    const onSelectThirdCategory = (e) => {
        setCategory({
            ...category,
            third_category: e.currentTarget.value,
        });
    }

    const onNextStep = () => {
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
                    {firstCategories && firstCategories.map((category) => (
                        <ListItem key={category.FirstCategory}>
                            <Button value={category.ID} onClick={onSelectFirstCategory} className={classes.button} fullWidth >
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
                {category.first_category && secondCategories.map((category) => (
                        <ListItem key={category.SecondCategory}>
                            <Button value={category.ID} onClick={onSelectSecondCategory} className={classes.button} fullWidth >
                                {category.SecondCategory}</Button>
                        </ListItem>
                    ))}
            </Grid>


            <Grid item xs={12} sm={4}>
                <Typography variant="h6" align="center">
                    소분류
                    </Typography>
                <Divider />
                {category.second_category && thirdCategories.map((category) => (
                        <ListItem key={category.ThirdCategory}>
                            <Button value={category.ID} onClick={onSelectThirdCategory} className={classes.button} fullWidth >
                                {category.ThirdCategory}</Button>
                        </ListItem>
                    ))}
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