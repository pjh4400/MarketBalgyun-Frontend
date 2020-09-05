import React from 'react';
import { useSelector } from 'react-redux';
import Payment from '../pages/Payment';


const PaymentContainer = () => {
    const { items, price } = useSelector( ({sales}) => ({
        items: sales.items,
        price: sales.price,
    }));


    return (
    <Payment
    price={price} 
    />
    );
};

export default React.memo(PaymentContainer);