import React from 'react';
import { useSelector } from 'react-redux';
import Payment from '../pages/Payment';


const PaymentContainer = () => {
    const { items, sum_price } = useSelector( ({sales}) => ({
        items: sales.items,
        sum_price: sales.sum_price,
    }));


    return (
    <Payment
    sum_price={sum_price} 
    />
    );
};

export default React.memo(PaymentContainer);