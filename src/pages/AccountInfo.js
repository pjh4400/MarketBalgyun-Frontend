import React, {useCallback} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Container, Typography, Paper, Grid, Button, Card, CardContent, IconButton } from '@material-ui/core';

import useStyles from './Style';
import Navigation from '../components/Navigation';
import { completeALL } from '../modules/consigner';

const AccountInfo = ({history}) => {
    const { consign_info } = useSelector(({ consigner }) => ({
        consign_info: consigner.consign_info,
    }));

    const dispatch = useDispatch();
    const onCompleteALL = useCallback(() => dispatch(completeALL()), [dispatch]);
    const classes = useStyles();


    const onCompleteAccount = () => {
        onCompleteALL();
        history.push('/');
    }


    const oneInfo = (consign) => {
        return (
            <Card className={classes.card}>
                <CardContent className={classes.cardDetails}>
                    <Typography variant="body1">
                        위탁자 : {consign.consignerName}
                    </Typography>
                    <Typography variant="body1">
                        판매상품 : {consign.consignProductName} ({consign.quantity}개)
            </Typography>
                    <Typography variant="body1">
                        개당 가격 : {consign.price}
                    </Typography>
                    <Typography variant="body1">
                        예금주 : {consign.account_owner}
                    </Typography>
                    <Typography variant="body1" color="primary">
                        계좌 : {consign.bank} {consign.account}
                    </Typography>

                    <Typography variant="body1" color="primary">
                        송금 가격 : {consign.sum_price} 원
</Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Container className={classes.root}>
            <Paper component='main' elevation={3} className={classes.paper}>
                <Typography component="h1" variant="h4" align="center" className={classes.header}>
                    위탁자 정보
        </Typography>

                <Navigation />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {consign_info && consign_info.map(consign => (
                            oneInfo(consign)
                        ))}
                    </Grid>
                </Grid>

                <Grid container justify="flex-end">
                    <Button className={classes.next} onClick={onCompleteAccount}>
                        송금 완료
                  </Button>
                </Grid>
            </Paper>
        </Container>
    );
}

export default AccountInfo;