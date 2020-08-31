import React from 'react';
import { connect } from 'react-redux';
import Sale from './Sale';
import  { addItem, deleteItem } from '../modules/sales';


const SaleContainer = ( {
    items, price, addItem, deleteItem
}) => {
    return <Sale items={items} price={price} onAddItem={addItem} onDeleteItem={deleteItem}/>;
}


export default connect(
    ( {sales} ) => ({
        items: sales.items,
        price: sales.price,
    }),
    {
        addItem,
        deleteItem,
    },
)(SaleContainer);
