import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from "@material-ui/core/IconButton";
import Grid from '@material-ui/core/Grid';

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
}));
const SaleGeneralItem = ({ item, key }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6}>
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary" paragraph>
                ID : {item.id}
                <IconButton className={classes.clear}><ClearIcon /></IconButton>
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
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default SaleGeneralItem;
