import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, TextField, InputAdornment, Card, CardContent, IconButton, CardActionArea } from '@material-ui/core';

import ClearIcon from '@material-ui/icons/clear';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
  },
  cardDetails: {
    flex: 1,
  },
  clear: {
    position: "absolute",
    right: 0,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
}));


const SaleGeneralItem = ({ item, key, onDeleteItem }) => {
  const [quantity, setQuantity] = useState(1);

  const classes = useStyles();


  const onQuantityHandler = (e) => {
    e.preventDefault();
    let tmpQuantity = Number(e.target.quantity.value);
    if (tmpQuantity < 1) {
      alert("잘못된 입력입니다.");
    }
    else if (tmpQuantity > item.quantity) {
      alert(item.quantity + "개 이상 판매할 수 없습니다.");
    }
    else {
      setQuantity(tmpQuantity);
    }
  }

  return (
    <Grid item xs={12} sm={6}>
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary" paragraph>
                ID : {item.id}
                <IconButton className={classes.clear} onClick={() => onDeleteItem(item)}><ClearIcon /></IconButton>
              </Typography>
              <Typography component="h3" variant="h5">
                {item.name || item.third_category}
              </Typography>
              <Typography variant="subtitle1">
                재고 : {item.quantity}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                가격 : {item.price} 원
            </Typography>
              <form className={classes.form} onSubmit={onQuantityHandler}>
                <TextField
                  type="number"
                  variant="outlined"
                  fullWidth
                  label="수량"
                  name="quantity"
                  defaultValue="1"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton type="submit"><CheckCircleIcon /></IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </form>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default SaleGeneralItem;
