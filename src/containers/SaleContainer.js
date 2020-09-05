import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sale from '../pages/Sale';
import  { addItem, deleteItem } from '../modules/sales';


const SaleContainer = () => {
    const { items, price } = useSelector( ({sales}) => ({
        items: sales.items,
        price: sales.price,
    }));

    const dispatch = useDispatch();
    const onAddItem = useCallback(item => dispatch(addItem(item)), [dispatch]);
    const onDeleteItem = useCallback(item => dispatch(deleteItem(item)), [dispatch]);

    return (
    <Sale 
    items={items}
    price={price} 
    onAddItem={onAddItem} 
    onDeleteItem={onDeleteItem}
    />
    );
};

export default React.memo(SaleContainer);