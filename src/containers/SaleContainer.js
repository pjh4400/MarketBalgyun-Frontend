import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sale from '../pages/Sale';
import  { addItem, deleteItem, changeQuantity } from '../modules/sales';


const SaleContainer = () => {
    const { items, price, quantities } = useSelector( ({sales}) => ({
        items: sales.items,
        price: sales.price,
        quantities: sales.quantities,
    }));

    const dispatch = useDispatch();
    const onAddItem = useCallback(item => dispatch(addItem(item)), [dispatch]);
    const onDeleteItem = useCallback(item => dispatch(deleteItem(item)), [dispatch]);
    const onChangeQuantity = useCallback((item,quantity) => dispatch(changeQuantity(item, quantity)), [dispatch]);


    return (
    <Sale 
    items={items}
    price={price} 
    onAddItem={onAddItem} 
    onDeleteItem={onDeleteItem}
    onChangeQuantity={onChangeQuantity}
    />
    );
};

export default SaleContainer;