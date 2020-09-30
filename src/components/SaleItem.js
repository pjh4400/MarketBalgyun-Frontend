import React, { useState, useEffect, useRef } from "react";
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


const SaleItem = ({ item, onDeleteItem, onChangeInfo }) => {
  const [price, setPrice] = useState(item.price);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  
  const classes = useStyles();

  const onQuantityHandler = (e) => {
    e.preventDefault();
    let tmpQty = Number(e.target.quantity.value);
    if (tmpQty < 1) {
      alert("잘못된 입력입니다.");
    }
    else if (tmpQty > item.quantity) {
      alert(item.quantity + "개 이상 판매할 수 없습니다.");
    }
    else {
      setQuantity(tmpQty);
      let newPrice = Math.floor(item.price / 100 * ( 100 - discount) * tmpQty / 10) * 10;
      console.log(newPrice);
      onChangeInfo(item.id, tmpQty, discount, price, newPrice);
      setPrice(newPrice);
    }
  }


  const onDiscountHandler = (e) => {
    e.preventDefault();
    let tmpDiscount = Number(e.target.discount.value);
    if (tmpDiscount < 0) {
      alert("잘못된 입력입니다.");
    }
    else if (tmpDiscount > item.max_discount) {
      alert(item.max_discount + "% 이상 할인 할 수 없습니다.");
    }
    else {
      setDiscount(tmpDiscount);
      let newPrice = Math.floor(item.price / 100 * ( 100 - tmpDiscount) * quantity / 10) * 10;
      console.log(newPrice);
      onChangeInfo(item.id, quantity, tmpDiscount, price, newPrice);
      setPrice(newPrice);
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
                <IconButton className={classes.clear} onClick={() => onDeleteItem(item.id,price)}><ClearIcon /></IconButton>
              </Typography>
              <Typography component="h3" variant="h5">
                {item.name || item.third_category}
              </Typography>
              <Typography variant="body1">
                재고 : {item.quantity}
              </Typography>
              <Typography variant="body1">
                최대 할인율 : {item.max_discount}
              </Typography>
              <Typography variant="subtitle1" color="primary" paragraph>
                가격 : {item.price} 원
            </Typography>
              <form noValidate onSubmit={onQuantityHandler}>
                <TextField
                  type="number"
                  variant="outlined"
                  fullWidth
                  label="수량"
                  name="quantity"
                  defaultValue={1}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton type="submit"><CheckCircleIcon /></IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </form>

              <form noValidate onSubmit={onDiscountHandler}>
                <TextField
                  type="number"
                  variant="outlined"
                  fullWidth
                  label="할인율"
                  name="discount"
                  defaultValue={0}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton type="submit"><CheckCircleIcon /></IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </form>
              <Typography variant="subtitle1" color="primary">
                총 적용 가격 : {item.apply_price} 원
            </Typography>

            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default SaleItem;
