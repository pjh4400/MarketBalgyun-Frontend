import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sale from '../pages/Sale';
import  { addItem, deleteItem, changePrice } from '../modules/sales';


const SaleContainer = () => {
    const { items, sum_price } = useSelector( ({sales}) => ({
        items: sales.items,
        sum_price: sales.sum_price,
    }));

    const dispatch = useDispatch();
    const onAddItem = useCallback(item => dispatch(addItem(item)), [dispatch]);
    const onDeleteItem = useCallback((id,price) => dispatch(deleteItem(id,price)), [dispatch]);
    const onChangePrice = useCallback((prevPrice,newPrice) => dispatch(changePrice(prevPrice,newPrice)), [dispatch]);


    

    return (
    <Sale 
    items={items}
    sum_price={sum_price} 
    onAddItem={onAddItem} 
    onDeleteItem={onDeleteItem}
    onChangePrice={onChangePrice}
    />
    );
};

export default SaleContainer;