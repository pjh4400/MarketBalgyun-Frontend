import React, {useState} from 'react';
import CustomerInfo from './CustomerInfo';
import { Container, Paper, Typography, Grid, Button} from "@material-ui/core"
import useStyles from "./Style";

const CustomerPage = () => {
    const [mode, setMode] = useState("new");

    const classes = useStyles();

    return(
        <Container className={classes.root}>

        <Paper width="50%" component='main' elevation={3} className={classes.paper}>

            <Typography component="h1" variant="h4" align="center" className={classes.header}>
                회원관리
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Button className={classes.submit} type="submit" size="large" onClick={() => {setMode("new");}}>
                        회원등록
                    </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Button className={classes.submit} type="submit" size="large" onClick={() => {setMode("old");}}>
                        회원조회 및 수정
                    </Button>
                </Grid>
                
                <CustomerInfo mode={mode} />
            </Grid>
        </Paper>
    </Container>
    );
}

export default CustomerPage; 