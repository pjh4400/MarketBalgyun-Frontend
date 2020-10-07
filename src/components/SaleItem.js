import React, { useState, useEffect } from "react";
import { Typography, Grid, TextField, InputAdornment, Card, CardContent, IconButton, CardActionArea } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/clear';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import useStyles from '../pages/Style';

const SaleItem = ({ item, onDeleteItem, onChangeInfo }) => {
  const [saleQuantity, setSaleQuantity] = useState(1);
  const [discount, setDiscount] = useState(item.price);

  const minDiscountPrice = Math.ceil(item.price - (item.price / 100 * item.max_discount / 10) * 10 );

  const classes = useStyles();


  const onQuantityHandler = (e) => {
    e.preventDefault();
    let tmpQuantity = e.target.sale_quantity.value;
    if (tmpQuantity < 1) {
      alert("잘못된 입력입니다.");
    }
    else if (tmpQuantity > item.quantity) {
      alert(item.quantity + "개 이상 판매할 수 없습니다.");
    }
    else {
      setSaleQuantity(tmpQuantity);
      onChangeInfo(item.id, tmpQuantity, discount);
    }
  }


  const onDiscountHandler = (e) => {
    e.preventDefault();
    let tmpDiscount = Number(e.target.discount.value);
    if (tmpDiscount < 0) {
      alert("잘못된 입력입니다.");
    }
    else if (tmpDiscount < minDiscountPrice) {
      alert(minDiscountPrice + "원 보다 할인할 수 없습니다.");
    }
    else {
      setDiscount(tmpDiscount);
      onChangeInfo(item.id, saleQuantity, tmpDiscount);
    }
  }

  return (
    <Grid item xs={12} sm={6}>
      <Card className={classes.card}>
        <CardContent className={classes.cardDetails}>
          <Typography variant="subtitle1" color="textSecondary" paragraph>
            ID : {item.id}
            <IconButton onClick={() => onDeleteItem(item.id)}><ClearIcon /></IconButton>
          </Typography>
          <Typography component="h3" variant="h5">
            {item.name || item.third_category}
          </Typography>
          <Typography variant="body1">
            재고 : {item.quantity}
          </Typography>
          <Typography variant="body1">
            최대 할인율 : {item.max_discount} %
          </Typography>
          <Typography variant="body1">
            최소 판매가 : {minDiscountPrice} 원
          </Typography>
          <Typography variant="subtitle1" color="primary" paragraph>
            가격 : {item.price} 원
            </Typography>

          <Grid item xs={12} sm={7} className={classes.form}>
            <form noValidate onSubmit={onQuantityHandler}>
              <TextField
                type="number"
                variant="outlined"
                fullWidth
                label="수량(개)"
                name="sale_quantity"
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
          </Grid>
          <Grid item xs={12} sm={7} className={classes.form}>
            <form noValidate onSubmit={onDiscountHandler}>
              <TextField
                type="number"
                variant="outlined"
                fullWidth
                label="개당 할인판매가(원)"
                name="discount"
                defaultValue={item.price}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton type="submit"><CheckCircleIcon /></IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </form>
          </Grid>
          <Typography variant="subtitle1" color="primary">
            총 적용 가격 : {item.apply_price} 원
            </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default SaleItem;
