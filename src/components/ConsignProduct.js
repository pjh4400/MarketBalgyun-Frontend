import React, { useState, useEffect } from 'react';
import { Typography, Paper, Grid, Button, TextField, MenuItem, InputAdornment, IconButton, FormControlLabel, Checkbox, Avatar } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import useStyles from '../pages/Style';


const ConsignProduct = ({ mode, info, onPreviousStep, history }) => {
    const [isSearched, setIsSearched] = useState(false)
    const [product, setProduct] = useState({
        first_category: '',
        second_category: '',
        third_category: '',
        id: '',
        name: '',
        price: '',
        wanted_price: '',
        quantity: 1,
        story: '',
        max_discount: 50,
        place: '',
        consigner: '',
        phone: '',
        accountable: true,
        date: '',
        expire_date: '',
    });

    const [consigner, setConsigner] = useState({
        name: '',
        phone: '',
        bank: '',
        account: '',
        account_owner: '',
        boolConsign: true,
    })

    const classes = useStyles();

    useEffect(() => {
        if (mode === 'new') {
            setProduct({
                ...product,
                first_category: info.first_category,
                second_category: info.second_category,
                third_category: info.third_category,
            })
        }
    }, []);


    const onChangeHandler = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    }

    const onChangeConsigner = (e) => {
        setConsigner({
            ...consigner,
            [e.target.name]: e.target.value,
        })
    }


    const onSearchCustomer = (e) => {
        axios.get('api/customer', {
            params: {
                phone: e.target.phone.value,
            }
        })
            .then((res) => {
                switch (res.data) {
                    case "해당 번호의 회원이 여러명입니다. 번호 전체를 입력해주세요.":
                    case "해당 번호의 회원이 없습니다.":
                        alert(res.data);
                        break;
                    default:
                        let tmp = res.data[0];
                        setConsigner({
                            name: tmp.name,
                            phone: tmp.phone,
                            bank: tmp.bank,
                            account: tmp.account,
                            account_owner: tmp.account_owner,
                            boolConsign: tmp.boolConsign,
                        });
                        setProduct({
                            ...product,
                            phone: tmp.phone,
                            consigner: tmp.name,
                        });

                        break;
                }

            })
            .catch((error) => {
                console.log(error);
            })
        e.preventDefault();

    }

    const onSearchProduct = (e) => {
        e.preventDefault();
        axios.get('api/consignProduct', {
            params: {
                id: e.target.id.value,
            }
        })
            .then((res) => {
                if (res.data === "No Consign Product") {
                    alert("해당 상품이 없습니다.");
                }
                else {
                    let tmp = res.data[0];
                    setProduct({
                        first_category: tmp.first_category,
                        second_category: tmp.second_category,
                        third_category: tmp.third_category,
                        id: tmp.id,
                        name: tmp.name,
                        price: tmp.price,
                        wanted_price: tmp.wanted_price,
                        quantity: tmp.quantity,
                        story: tmp.story,
                        max_discount: tmp.max_discount,
                        place: tmp.place,
                        consigner: tmp.consigner,
                        phone: tmp.phone,
                        accountable: tmp.accountable,
                        date: tmp.date,
                        expire_date: tmp.expire_date,
                    });
                    setConsigner({
                        name: tmp.consigner,
                        bank: tmp.bank,
                        phone: tmp.phone,
                        account: tmp.account,
                        account_owner: tmp.account_owner,
                        boolConsign: tmp.boolConsign,
                    });
                    setIsSearched(true);
                    console.log(product);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onSubmitProduct = (e) => {
        e.preventDefault();
        switch (mode) {
            case 'new':
                if (consigner.name === '') {
                    alert('위탁자 정보를 입력해주세요.');
                } else if (consigner.boolConsign === false) {
                    alert('맡겨팔기 신청서에 동의해주세요.');
                }
                else {
                    if (confirm('등록하시겠습니까?')) {
                        axios.post('api/consignProduct', product)
                            .then((res) => {
                                if (res.data) {
                                    alert('등록 되었습니다.\n⊳ ID : ' + res.data);
                                    onPreviousStep();
                                }
                            })
                            .catch((error) => {
                                alert('서버에러');
                                console.log(error);
                            });

                        axios.put('api/customer', consigner)
                            .catch((error) => {
                                alert('서버에러');
                                console.log(error);
                            });
                    }
                }
                break;

            case 'old':
                if (confirm('수정하시겠습니까?')) {
                    axios.put('api/consignProduct', product)
                        .then((res) => {
                            alert('수정되었습니다.');
                            setIsSearched(false);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
                break;

            default:
                break;
        }
    }

    const onExtendDate = () => {
        if (confirm('1개월 연장하시겠습니까?')) {
            let newDate = new Date(product.expire_date);
            newDate.setMonth(newDate.getMonth() + 1);
            setProduct({
                ...product,
                expire_date: newDate.toJSON(),
            });
        }
    }

    const onDeleteProduct = () => {
        if (confirm('정말 삭제하시겠습니까?')) {
            axios.delete('api/consignProduct', {
                params: { id: product.id }
            })
                .then((res) => {
                    alert('삭제되었습니다.');
                    setIsSearched(false);
                })
                .catch((error) => {
                    alert('서버에러');
                    console.log(error);
                })
        }
    }

    const onReset = () => {
        setProduct({
            first_category: info.first_category,
            second_category: info.second_category,
            third_category: info.third_category,
            id: '',
            name: '',
            price: '',
            wanted_price: '',
            quantity: 1,
            story: '',
            max_discount: 50,
            place: '',
            consigner: '',
            phone: '',
            accountable: true,
            date: '',
            expire_date: '',
        });
        setConsigner({
            name: '',
            phone: '',
            bank: '',
            account: '',
            account_owner: '',
            boolConsign: true,
        });
    }

    const consignerInfo = () => {
        return (
            <Grid container spacing={2}>
                {consigner.name &&
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center" color="primary">🜰 {consigner.name} 고객님 🜰</Typography>
                    </Grid>
                }

                <Grid item xs={12} sm={3}>
                    <TextField
                        type="text"
                        variant="outlined"
                        fullWidth
                        helperText="예) 국민"
                        label="은행"
                        name="bank"
                        value={consigner.bank}
                        onChange={onChangeConsigner}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        type="text"
                        variant="outlined"
                        fullWidth
                        label="계좌명의"
                        name="account_owner"
                        value={consigner.account_owner}
                        onChange={onChangeConsigner}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        variant="outlined"
                        fullWidth
                        label="계좌번호"
                        name="account"
                        value={consigner.account}
                        onChange={onChangeConsigner}
                    />
                </Grid>
                {mode === 'new' && !consigner.boolConsign &&
                    <>
                        < Paper variant="outlined" className={classes.item}>
                            <Typography variant="h6" align="center" color="primary">PASS YOUR COLLECTION</Typography>
                            <Typography variant="h6" align="center" color="primary" paragraph>이야기가 있는 마켓발견 맡겨팔기 신청서</Typography>
                            <p>1. 맡겨팔기 가능한 물품: 판매가 5만원 이상/ 의류,잡화 경우 모조품 (이미테이션)은 불가능 함 </p>
                            <p>2. 맡겨팔기 신청서 작성 시 제품관련 참고사항을 작성해 주시면 판매 감정에 도움 됩니다.</p>
                            <p>3.  맡겨팔기신청 후 3개월 이내 판매되지 않는 상품은 개별연락을 통해 맡겨팔기 연장여부를 결정하며 개별 연락 후 1개월 내 연락이 닿지 않는 경우 제품의 소유권은 '마켓발견'에 있습니다 .</p>
                            <p>4. 개인정보 수집 및 이용 동의 거부</p>
                            <p>5. 맡겨팔기기간 연장 경우, 기간에 따라 보관특성상 물품 변형이 생길 수 있습니다. </p>
                            <p>6. 마켓발견 카톡으로 사진을 보내주시면 "마켓발견"에서 맡겨팔기가능 여부를 연락드리며 가격확정시 맡겨팔기가 시작됩니다. </p>
                            <p>7. 수수료는 40% 로 판매시 판매금액의 65%를 마켓발견 포인트로 적립해드립니다. 입금 요청시에는 요청일에 판매금액의 60%가 가까운 25일에 지급됩니다. 본 위탁자는 위의 사항에 동의하였으며 맡겨팔기업무를 마켓발견에 의뢰합니다. </p>
                        </Paper>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox className={classes.checkbox} onChange={onAgree} />}
                                label="개인 정보 수집 및 취급 방침에 대하여 동의합니다."
                            />
                        </Grid>
                    </>
                }

            </Grid>
        );
    }

    const onAgree = (e) => {
        setConsigner({
            ...consigner,
            boolConsign: e.target.checked,
        });
    }

    return (
        <Grid container spacing={2}>
            {mode === "old" &&
                <form className={classes.form} onSubmit={onSearchProduct}>
                    <TextField
                        type="text"
                        variant="outlined"
                        fullWidth
                        label="위탁상품 ID"
                        name="id"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <Button type="submit"><SearchIcon /></Button>
                                </InputAdornment>
                            )
                        }}
                    />
                </form>}


            { (mode === "new" || isSearched) &&
                <Grid item xs={12}>
                    <Paper variant="outlined" className={classes.item}>
                        <Typography variant="h6" align="center" paragraph>
                            위탁자 개인정보
                        </Typography>
                        <Grid container spacing={2} justify="center">
                            {mode === 'new' &&
                                <Grid item xs={12} sm={6}>
                                    <form onSubmit={onSearchCustomer}>
                                        <TextField
                                            type="number"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="위탁자 휴대폰번호 뒤 4자리"
                                            name="phone"
                                            error
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment>
                                                        <IconButton type="submit"><SearchIcon /></IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </form>
                                </Grid>
                            }


                            {consignerInfo()}

                            {mode === 'new' &&
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Button className={classes.checkbox} onClick={() => {
                                            history.push('/register-customer');
                                        }}>회원이 아니신가요? 회원등록</Button >
                                    </Grid>
                                </Grid>
                            }

                        </Grid>

                    </Paper>

                    <Paper variant="outlined" className={classes.item}>

                        <Typography variant="h6" align="center" paragraph>
                            상품정보
                        </Typography>
                        <form className={classes.form} onSubmit={onSubmitProduct}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="상품명"
                                        name="name"
                                        value={product.name}
                                        onChange={onChangeHandler}
                                        error
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="수량"
                                        name="quantity"
                                        value={product.quantity}
                                        onChange={onChangeHandler}
                                        InputProps={{
                                            inputProps: { min: 0 }
                                        }}
                                        error
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="감정가(판매가격)"
                                        name="price"
                                        value={product.price}
                                        onChange={onChangeHandler}
                                        error
                                    />
                                </Grid>


                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        label="희망가(고객희망)"
                                        name="wanted_price"
                                        value={product.wanted_price}
                                        onChange={onChangeHandler}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField select label="고객정산방법" variant="outlined" name="accountable" value={product.accountable} onChange={onChangeHandler} className={classes.menuitem}>
                                        <MenuItem value={false}>포인트</MenuItem>
                                        <MenuItem value={true}>계좌이체</MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="최대할인율"
                                        name="max_discount"
                                        value={product.max_discount}
                                        onChange={onChangeHandler}
                                        InputProps={{
                                            inputProps: { min: 0, max: 100 }
                                        }}
                                        error
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        label="재고위치"
                                        name="place"
                                        value={product.place}
                                        onChange={onChangeHandler}
                                    />
                                </Grid>


                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        label="제품에 대한 사연"
                                        name="story"
                                        value={product.story}
                                        onChange={onChangeHandler}
                                    />
                                </Grid>

                                {mode === 'old' &&
                                    <Grid item xs={12}>
                                        <Typography variant="body1" color="textSecondary">
                                            위탁날짜 : {product.date.split('T')[0]}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            만료날짜 : {product.expire_date.split('T')[0]}
                                            <IconButton className={classes.inlineComponents} onClick={onExtendDate}><AddCircleIcon /></IconButton>
                                        </Typography>
                                    </Grid>
                                }
                            </Grid>
                            {mode === 'new'
                                ?
                                <Button className={classes.submit} size="large" type="submit">상품등록</Button>
                                :
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Button className={classes.submit} type="submit" size="large">
                                            상품수정</Button>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Button className={classes.submit} size="large" onClick={onDeleteProduct}>
                                            상품삭제</Button>
                                    </Grid>
                                </Grid>


                            }
                        </form>

                        {mode === 'new' &&
                            <Grid container justify="flex-end">
                                <Button className={classes.next} onClick={onPreviousStep}>이전</Button>
                                <Button className={classes.next} onClick={onReset}>초기화</Button>
                            </Grid>}
                    </Paper>
                </Grid>
            }
        </Grid>
    );
}

export default ConsignProduct;