import React  from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  clear: {
    position: "absolute",
    right: 0,
  },
}));
const SaleGeneralItem = ({items, key}) => {
  const classes = useStyles();

   return(
    <Grid item xs={12} md={6}>
    <CardActionArea component="a" href="#">
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
           <Typography variant="subtitle1" color="textSecondary"  paragraph>
              ID :{items.id}
              <IconButton className={classes.clear} ><ClearIcon /></IconButton>
            </Typography>
            <Typography component="h3" variant="h5">
              {items.name || items.third_category}
            </Typography>
            <Typography variant="subtitle1">
              재고 : {items.quantity}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              가격 : {items.price}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </CardActionArea>
  </Grid>

   );
}

export default SaleGeneralItem;
