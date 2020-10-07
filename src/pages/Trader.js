import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import Navigation from "../components/Navigation";

import useStyles from "../pages/Style";

const Trader = ({ history }) => {
  const [mode, setMode] = useState("new"); // 새로 등록 시 'new', 기존 정보 조회 및 수정 시 'old', 선택후 'old2'
  const [traderItem, setTraderItem] = useState({
    name: "",
    trader_number: "",
    CEO: "",
    business: "",
    business_item: "",
    phone: "",
    mobile_phone: "",
    email: "",
    site: "",
    post: "",
    address: "",
    staff: "",
    bank: "",
    account: "",
    account_owner: "",
    fee: 0,
  });

  useEffect(() => {
    setTraderItem({
      name: "",
      trader_number: "",
      CEO: "",
      business: "",
      business_item: "",
      phone: "",
      mobile_phone: "",
      email: "",
      site: "",
      post: "",
      address: "",
      staff: "",
      bank: "",
      account: "",
      account_owner: "",
      fee: 0,
    });
  }, [mode === "new"]); // 등록 시 초기화

  const onChangeHandler = (e) => {
    setTraderItem({
      ...traderItem,
      [e.target.name]: e.target.value,
    });
  };

  const classes = useStyles();

  const onSubmitTraderItem = (e) => {
    e.preventDefault();
    switch (mode) {
      case "new":
        if (confirm("등록하시겠습니까?")) {
          axios
            .post("api/trader", traderItem)
            .then((res) => {
              if (res.data === "Posting Success") {
                alert("등록되었습니다.");
                history.push("/");
              } else {
                alert("백이 아직...");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
        break;

      case "old2":
        //백 put 구현 아직
        if (confirm("수정하시겠습니까?")) {
          axios
            .put("aapi/trader", traderItem)
            .then((res) => {
              alert("수정되었습니다.");
              history.push("/");
            })
            .catch((error) => {
              console.log(error);
            });
        }
        break;

      default:
        break;
    }
  };

  const onSearchTrader = (e) => {
    e.preventDefault();
    axios
      .get("api/trader", {
        params: {
          name: e.target.name.value,
        },
      })
      .then((res) => {
        if (res.data === "No Trader") {
          alert("해당 매입처가 존재하지 않습니다.");
        } else {
          let tmp = res.data[0];
          setTraderItem({
            name: tmp.name,
            trader_number: tmp.trader_number,
            CEO: tmp.CEO,
            business: tmp.business,
            business_item: tmp.busines_item,
            phone: tmp.phone,
            mobile_phone: tmp.mobile_phone,
            email: tmp.email,
            site: tmp.site,
            post: tmp.post,
            address: tmp.address,
            staff: tmp.staff,
            bank: tmp.bank,
            account: tmp.account,
            account_owner: tmp.account_owner,
            fee: tmp.fee,
          });
          setMode("old2");
        }
      })
      .catch((error) => {
        alert("서버에러");
        console.log(error);
      });
  };

  const onDeleteTrader = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete("api/trader", { params: { name: traderItem.name } })
        .then((res) => {
          alert("삭제되었습니다.");
          history.push("/");
        })
        .catch((error) => {
          alert("서버에러");
          console.log(error);
        });
    }
  };

  return (
    <Container className={classes.root}>
      <Paper
        width="50%"
        component="main"
        elevation={3}
        className={classes.paper}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          className={classes.header}
        >
          매입처 관리
        </Typography>
        <Navigation />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              className={classes.submit}
              size="large"
              onClick={() => {
                setMode("new");
              }}
            >
              매입처등록
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              className={classes.submit}
              size="large"
              onClick={() => {
                setMode("old");
              }}
            >
              매입처수정 및 삭제
            </Button>
          </Grid>
        </Grid>

        {(mode === "old" || mode === "old2") && (
          <form className={classes.form} onSubmit={onSearchTrader}>
            <TextField
              type="text"
              variant="outlined"
              fullWidth
              label="매입처 명"
              name="name"
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <Button type="submit">
                      <SearchIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        )}
        {mode === "old2" && (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" paragraph>
              매입처 정보 띄우기
            </Typography>
          </Grid>
        )}

        {(mode === "new" || mode === "old2") && (
          <form className={classes.form} onSubmit={onSubmitTraderItem}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  required
                  fullWidth
                  label="매입처명"
                  name="name"
                  value={traderItem.name}
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="사업자번호"
                  name="trader_number"
                  value={traderItem.trader_number}
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="CEO"
                  name="CEO"
                  value={traderItem.CEO}
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  required
                  fullWidth
                  label="업태"
                  name="business"
                  value={traderItem.business}
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="종목"
                  name="business_item"
                  value={traderItem.business_item}
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="전화번호"
                  name="phone"
                  value={traderItem.phone}
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="휴대전화"
                  name="mobile_phone"
                  value={traderItem.mobile_phone}
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="메일"
                  name="email"
                  value={traderItem.email}
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="거래처 홈페이지"
                  name="site"
                  value={traderItem.site}
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="우편번호"
                  name="post"
                  value={traderItem.post}
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="주소"
                  name="address"
                  value={traderItem.address}
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="관리사원"
                  name="staff"
                  value={traderItem.staff}
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="거래은행"
                  name="bank"
                  value={traderItem.bank}
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="계좌번호"
                  name="account"
                  value={traderItem.account}
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="예금주"
                  name="account_owner"
                  value={traderItem.account_owner}
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="수수료"
                  name="fee"
                  value={traderItem.fee}
                  onChange={onChangeHandler}
                />
              </Grid>
            </Grid>
            {mode === "new" ? (
              <Button className={classes.submit} size="large" type="submit">
                매입처 등록
              </Button>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button className={classes.submit} type="submit" size="large">
                    매입처 수정
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    className={classes.submit}
                    size="large"
                    onClick={onDeleteTrader}
                  >
                    매입처 삭제
                  </Button>
                </Grid>
              </Grid>
            )}
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default Trader;
