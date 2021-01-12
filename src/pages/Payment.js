import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ClearIcon from "@material-ui/icons/clear";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import axios from "axios";
import useStyles from "./Style";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Navigation from "../components/Navigation";

const Payment = ({
  items,
  sum_price,
  handleNext,
  handleBack,
  onCompleteSale,
}) => {
  const [membership, setMemberShip] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    point: 0,
  });
  const [finalPrice, setFinalPrice] = useState(sum_price);
  const [point, setPoint] = useState(0);
  const [card, setCard] = useState(0);
  const [cash, setCash] = useState(0);
  const [account, setAccount] = useState(0);
  const [getCash, setGetCash] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    setFinalPrice(sum_price - point);
  }, [point]);

  useEffect(() => {
    setCard(finalPrice - account - cash);
  }, [finalPrice]);

  useEffect(() => {
    setCash(finalPrice - account - card);
  }, [card]);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const onCardHandler = (e) => {
    if (e.target.value <= finalPrice - account) {
      setCard(e.target.value);
      setCash(finalPrice - account - e.target.value);
    }
  };

  const onCashHandler = (e) => {
    if (e.target.value <= finalPrice - account) {
      setCash(e.target.value);
      setGetCash(e.target.value);
      setCard(finalPrice - account - e.target.value);
    }
  };

  const onAccountHandler = (e) => {
    if (e.target.value <= finalPrice) {
      setAccount(e.target.value);
      setCard(finalPrice - e.target.value);
    }
  };

  const onGetCashHandler = (e) => {
    setGetCash(e.target.value);
  };

  const onExchange = () => {
    setCard(cash);
  };

  const onApplyPoint = (e) => {
    e.preventDefault();
    let tmpPoint = Number(e.target.point.value);
    if (tmpPoint < 0) {
      alert("잘못된 입력입니다.");
    } else if (tmpPoint > customer.point) {
      alert("최대 사용 가능 포인트는 " + customer.point + "p 입니다.");
    } else if (tmpPoint > sum_price) {
      setPoint(sum_price);
    } else {
      setPoint(tmpPoint);
    }
  };

  const initializeCustomer = () => {
    setCustomer({
      name: "",
      phone: "",
      point: 0,
    });
    setPoint(0);
    setMemberShip(false);
  };

  const onSearchCustomer = (e) => {
    e.preventDefault();
    axios
      .get("api/customer", {
        params: {
          phone: e.target.phone.value,
        },
      })
      .then((res) => {
        switch (res.data) {
          case "해당 번호의 회원이 여러명입니다. 번호 전체를 입력해주세요.":
          case "해당 번호의 회원이 없습니다.":
            alert(res.data);
            initializeCustomer();
            break;
          default:
            setCustomer({
              name: res.data[0].name,
              phone: res.data[0].phone,
              point: res.data[0].point,
            });
            setMemberShip(true);
            setPoint(0);
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmitPay = () => {
    if (confirm("판매하시겠습니까?")) {
      axios
        .post("api/saledProduct", {
          items: items,
          sum_price: sum_price,
          customer_name: customer.name,
          customer_phone: customer.phone,
          point: point,
          card: card,
          cash: cash,
          account: account,
          staff: window.sessionStorage.getItem("name"),
        })
        .then((res) => {
          if (res.data.includes("부족")) {
            alert(res.data);
          } else if (res.data === "상품 판매 완료") {
            alert("판매되었습니다.");
            onCompleteSale();
            handleNext();
          } else {
            console.log(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        className={classes.header}
      >
        상품결제 총 {sum_price.toLocaleString()} 원
      </Typography>
      <Navigation />

      <Grid container justify="flex-end" className={classes.form}>
        <Button className={classes.next} size="large" onClick={handleBack}>
          <ShoppingCartIcon /> 다시담기
        </Button>
        <Button onClick={handleClick} className={classes.next}>
          상품목록 ▼{" "}
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {items.map((item) => (
            <MenuItem
              item={item}
              key={item.id}
              value={item.id}
              onClick={handleClose}
            >
              [{item.name}] {item.discount}원 X {item.sale_quantity} 개 = 총
              {item.apply_price}원
            </MenuItem>
          ))}
        </Menu>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent className={classes.cardDetails}>
              <Typography component="h3" variant="h5">
                구매자 정보
              </Typography>
              <Grid item xs={12} sm={8}>
                <form className={classes.form} onSubmit={onSearchCustomer}>
                  <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    label="전화번호 뒤 네자리"
                    name="phone"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton type="submit">
                            <SearchIcon />
                          </IconButton>
                          <IconButton onClick={initializeCustomer}>
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </form>
              </Grid>
              <Typography variant="subtitle1">
                이름 : {membership && customer.name}{" "}
              </Typography>
              <Typography variant="subtitle1">
                전화번호 : {membership && customer.phone}{" "}
              </Typography>
              <Typography variant="subtitle1">
                포인트 : {membership && customer.point.toLocaleString()}
              </Typography>

              {!membership || (
                <Grid item xs={12} sm={6}>
                  <form className={classes.form} onSubmit={onApplyPoint}>
                    <TextField
                      type="number"
                      variant="outlined"
                      fullWidth
                      label="포인트 적용 (p)"
                      name="point"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <IconButton type="submit">
                              <CheckCircleIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                        step: 1000,
                      }}
                    />
                  </form>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent className={classes.cardDetails}>
              <Typography component="h3" variant="h5" paragraph>
                결제 방식 ( 포인트 : {point} )
              </Typography>
              <Grid item xs={12}>
                <Grid item xs={12} sm={4} className={classes.inlineComponents}>
                  <TextField
                    type="number"
                    variant="outlined"
                    size="small"
                    required
                    fullWidth
                    label="계좌이체 (원)"
                    name="account"
                    onChange={onAccountHandler}
                    value={account}
                    inputProps={{ step: 1000 }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4} className={classes.inlineComponents}>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  label="카드 (원)"
                  name="card"
                  onChange={onCardHandler}
                  value={card}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={2} className={classes.inlineComponents}>
                <IconButton onClick={onExchange}>
                  <SwapHorizIcon />
                </IconButton>
              </Grid>

              <Grid item xs={12} sm={4} className={classes.inlineComponents}>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  label="현금 (원)"
                  name="cash"
                  onChange={onCashHandler}
                  value={cash}
                  inputProps={{ step: 1000 }}
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent className={classes.cardDetails}>
              <Typography component="h3" variant="h5" paragraph>
                잔돈 계산
              </Typography>
              <Grid item xs={12} sm={4} className={classes.inlineComponents}>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  label="받은 금액(원)"
                  name="getCash"
                  onChange={onGetCashHandler}
                  value={getCash}
                  inputProps={{ step: 1000 }}
                />
              </Grid>

              <Grid item xs={12} sm={4} className={classes.inlineComponents}>
                <TextField
                  type="number"
                  variant="standard"
                  size="small"
                  fullWidth
                  label="거스름돈(원)"
                  name="change"
                  value={getCash - cash > 0 ? getCash - cash : 0}
                  endAdornment={
                    <InputAdornment position="end">원</InputAdornment>
                  }
                  disabled
                  error
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Button className={classes.submit} size="large" onClick={onSubmitPay}>
          총 {finalPrice.toLocaleString()} 원 판매하기
        </Button>
      </Grid>
    </>
  );
};

export default Payment;
