import React, { useState }  from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import useStyles from "./Style";


const RegisterCustomer = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [likeCategory, setLikeCategory] = useState('');
    const [taste, setTaste] = useState('');
    const [boolSMS, setBoolSMS] = useState(false);
    const [boolLecture, setBoolLecture] = useState(false);
    const [something, setSomething] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [mainNumber, setMainNumber] = useState('');

    const classes = useStyles();

    const onNameHandler = (e) => {
         setName(e.target.value);
    };

    const onPhoneHandler = (e) => {
        setPhone(e.target.value);
    };

    const onLikeCategoryHandler = (e) => {
         setLikeCategory(e.target.value);
    };

    
    const onTasteHandler = (e) => {
        seTaste(e.target.value);
     };

     const onBoolSMSHandler = (e) => {
        setBoolLecture(e.target.checked);
    };
        
    const onBoolLectureHandler = (e) => {
        setBoolLecture(e.target.checked);
    };

    const onSomethingHandler = (e) => {
        setSomething(e.target.value);
    };

    const onEmailHandler = (e) => {
        setEmail(e.target.value);
    };

    
    const onBirthdayHandler = (e) => {
        setBirthday(e.target.value);
    };

    const onGenderHandler = (e) => {
        setGender(e.target.value);
    };

    const onAddressHandler = (e) => {
        setAddress(e.target.value);
    };

    const onMainNumberHandler = (e) => {
        setMainNumber(e.target.value);
    };


    const onSubmitForm = (e) => {
        alert('정상적으로 등록되었습니다.' + name + phone);
        e.preventDefault(); 
    }

    return (
        <>
        <Container className={classes.root}>

        <Paper width="50%" component='main' elevation={3} className={classes.paper}>
               
               <Typography component="h1" variant="h4" align="center" className={classes.header}>
                   회원등록
               </Typography>
           
               <form className={classes.form} onSubmit={onSubmitForm}>
                   <Grid container spacing={2}>
                       <Grid item xs={12} sm={6}>
                           <TextField
                               type="text"
                               variant="outlined"
                               required
                               fullWidth
                               label="고객명"
                               name="name"
                               onChange={onNameHandler}
                               value={name}
                               autoFocus
                           />
                       </Grid>

                       <Grid item xs={12} sm={6}>
                            <TextField select label="성별" variant="outlined" value={gender} onChange={onGenderHandler} className={classes.menuitem}>
                                <MenuItem value={'F'}>여성</MenuItem>
                                <MenuItem value={'M'}>남성</MenuItem>
                            </TextField>
                       </Grid>
   
                       <Grid item xs={12}>
                           <TextField
                               type="text"
                               variant="outlined"
                               required
                               fullWidth
                               helperText="예) 01011112222"
                               label="전화번호"
                               name="phonenumber"
                               onChange={onPhoneHandler}
                               value={phone}
                           />

                       </Grid>
   
                       <Grid item xs={12}>
                       <FormControlLabel
                                control={<Checkbox value={boolSMS} onChange={onBoolSMSHandler} className={classes.checkbox} />}
                                label="SMS수신동의"
                            />
                        </Grid>

                       <Grid item xs={12} sm={6}>
                           <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                helperText="예) 브랜드그릇, 인테리어"
                                label="관심상품"
                                name="likeCategory"
                                onChange={onLikeCategoryHandler}
                                value={likeCategory}
                           />
                       </Grid>
   
                       <Grid item xs={12} sm={6}>
                           <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                helperText="예) 빈티지"
                                label="선호 스타일"
                                name="taste"
                                onChange={onTasteHandler}
                                value={taste}
                           />
                       </Grid>


                       <Grid item xs={12} sm={6}>
                           <TextField
                               type="email"
                               variant="outlined"
                               fullWidth
                               helperText="예) market@naver.com"
                               label="이메일"
                               name="email"
                               onChange={onEmailHandler}
                               value={email}
                           />
                       </Grid>

                       <Grid item xs={12} sm={6}>
                           <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                helperText="예) 980626"
                                label="생년월일"
                                name="birthday"
                                onChange={onBirthdayHandler}
                                value={birthday}
                           />
                       </Grid>

                       <Grid item xs={12}>
                           <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                label="주소"
                                name="address"
                                onChange={onAddressHandler}
                                value={address}
                           />
                       </Grid>

                       <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={<Checkbox value={boolLecture} onChange={onBoolLectureHandler} className={classes.checkbox} />}
                                label="강좌관심여부"
                            />
                       </Grid>

                       <Grid item xs={12} sm={6}>
                            <TextField select label="주거래매장" variant="outlined" value={mainNumber} onChange={onMainNumberHandler}>
                                <MenuItem  value={1}>1호점</MenuItem>
                                <MenuItem  value={2}>2호점</MenuItem>
                            </TextField>
                       </Grid>

                       <Grid item xs={12}>
                           <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                label="비고"
                                name="something"
                                onChange={onSomethingHandler}
                                value={something}
                           />
                       </Grid>

                       <Grid item xs={12}>
                        <Button className={classes.submit} type="submit" size="large">
                                등록하기
                        </Button>
                        </Grid>
                   </Grid>
   
               </form>
   
           </Paper>    
        </Container>   
      
        </>
     
        
    );
}

export default RegisterCustomer;