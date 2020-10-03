import React, { useState } from 'react';
import axios from 'axios';

import { Grid, Button, TextField } from "@material-ui/core"
import useStyles from './Style';

const SignOut = ({setMode}) => {
    const [name, setName] = useState('');
    const classes = useStyles();

    const onChangeName = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }


    const onDeleteEmployee = (e) => {
        e.preventDefault();
        axios.get('api/user', {
            params: {
                name: name
            }
        }).then((res) => {
            if (res.data === 'No User') {
                alert('해당 직원이 없습니다.');
            }
            else {
                if (confirm("직원 '" + name + "'을(를) 삭제하시겠습니까?")) {
                    axios.delete('api/auth/sign-out', {
                         params : {
                             name : name}
                    })
                        .then((res) => {
                            alert(res.data);
                            setMode('');
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
            }

        })
            .catch((error) => {
                console.log(error);
            })


    }




    return (
        <Grid container spacing={2} alignItems="center" className={classes.item}>
            <Grid item xs={12} sm={8}>
                <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    label="직원이름"
                    name="name"
                    onChange={onChangeName}
                    value={name}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.next}
                    onClick={onDeleteEmployee}
                >
                    직원삭제
          </Button>
            </Grid>
        </Grid>
    );
}



export default SignOut;