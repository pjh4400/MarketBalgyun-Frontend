import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import Navigation from "../components/Navigation";

import useStyles from "../pages/Style";

const SearchProduct = () => {
  const [searchID, setSearchID] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchTrader, setSearchTrader] = useState("");
  const [searchPlace, setSearchPlace] = useState("");
  const [products, setProducts] = useState([]);

  const classes = useStyles();

  const onSearchIDHandler = (e) => {
    setSearchID(e.target.value);
  };

  const onSearchNameHandler = (e) => {
    setSearchName(e.target.value);
  };

  const onSearchTraderHandler = (e) => {
    setSearchTrader(e.target.value);
  };

  const onSearchPlaceHandler = (e) => {
    setSearchPlace(e.target.value);
  };

  const onSearchByID = (e) => {
    setSearchName("");
    axios
      .get("api/searchProduct", {
        params: {
          id: searchID,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "해당 ID의 상품이 없습니다.") {
          alert(res.data);
        } else {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSearchByName = (e) => {
    setSearchID("");
    axios
      .get("api/searchProduct", {
        params: {
          name: searchName,
        },
      })
      .then((res) => {
        if (res.data === "해당 이름의 상품이 없습니다.") {
          alert(res.data);
        } else {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSearchByTrader = (e) => {
    setSearchTrader("");
    axios
      .get("api/searchProduct", {
        params: {
          name: searchTrader,
        },
      })
      .then((res) => {
        if (res.data === "해당 거래처의 상품이 없습니다.") {
          alert(res.data);
        } else {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSearchByPlace = (e) => {
    setSearchPlace("");
    axios
      .get("api/searchProduct", {
        params: {
          name: searchPlace,
        },
      })
      .then((res) => {
        if (res.data === "해당 재고위치의 상품이 없습니다.") {
          alert(res.data);
        } else {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const oneItem = (item) => {
    console.log(item);
    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardDetails}>
          <Typography variant="subtitle1" color="primary">
            {item.id.startsWith("C") ? "위탁상품" : "일반상품"} ID : {item.id}
          </Typography>
          <Typography component="h3" variant="h5" paragraph>
            {item.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            재고위치 : {item.place || "정보없음"}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            가격 : {item.price} 원
          </Typography>
          <Typography variant="body1" color="textSecondary">
            거래처 : {item.trade || "정보없음"}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            재고위치 : {item.place || "정보없음"}
          </Typography>
        </CardContent>
      </Card>
    );
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
          상품검색
        </Typography>
        <Navigation />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              variant="outlined"
              fullWidth
              label="ID로 검색하기"
              name="id"
              onChange={onSearchIDHandler}
              value={searchID}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <Button onClick={onSearchByID}>
                      <SearchIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              variant="outlined"
              fullWidth
              label="이름으로 검색하기"
              name="name"
              value={searchName}
              onChange={onSearchNameHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <Button onClick={onSearchByName}>
                      <SearchIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              variant="outlined"
              fullWidth
              label="거래처로 검색하기"
              name="trader"
              value={searchTrader}
              onChange={onSearchTraderHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <Button onClick={onSearchByTrader}>
                      <SearchIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              variant="outlined"
              fullWidth
              label="재고위치로 검색하기"
              name="place"
              value={searchPlace}
              onChange={onSearchPlaceHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <Button onClick={onSearchByPlace}>
                      <SearchIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} className={classes.form}>
          {products &&
            products.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                className={classes.card}
                item={item}
                key={item.id}
                value={item.id}
              >
                {oneItem(item)}
              </Grid>
            ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default SearchProduct;
