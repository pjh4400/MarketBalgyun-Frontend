import React, { useState } from 'react';
import axios from 'axios';

import {Typography, Grid, Button, TextField, MenuItem, InputAdornment } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './Style';

const SignOut = () => {
    const [name, setName] = useState('');
    const classes = useStyles();

    const onChangeName = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const onSearchEmployee = (e) => {
        e.preventDefault();
        axios.get('/api/user', {
            params: {
                name: name
            }
        }).then((res) => {
            alert('직원 ' + name + ' 을(를) 찾았습니다.');
            setLevel(res.data[0].level);
            console.log(res);
        })
            .catch((error) => {
                console.log(error);
            })
    }

    const onDeleteEmployee = (e) => {
        e.preventDefault();
        axios.delete('api/user', {
            params: {
                name: name
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onChangeHandler = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (form.password === form.password2) {
            alert('정상적으로 등록되었습니다.');
            axios.put('api/user', {
                name: form.name,
                password: form.password,
                level: form.level,
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    }

    return (
        <form className={classes.form} noValidate onSubmit={onSubmitForm}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        variant="outlined"
                        fullWidth
                        label="직원이름"
                        name="name"
                        onChange={onChangeName}
                        value={name}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <Button onClick={onSearchEmployee}><SearchIcon /></Button>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onDeleteEmployee}
            >
                직원삭제
          </Button>
        </form>

    );
}



export default SignOut;