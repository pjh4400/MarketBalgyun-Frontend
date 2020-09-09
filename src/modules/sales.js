const ADD_ITEM = 'sales/ADD_ITEM'; // 판매목록에 상품 추가
const DELETE_ITEM = 'sales/DELETE_ITEM'; // 판매목록에서 상품 제거
const CHANGE_QUANTITY = 'sales/CHANGE_QUANTITY' // 상품 판매 수량 수정

const initialState = {
    items : [],
    price : 0,
    quantities : [],
}

export const addItem = (item) => ({
    type : ADD_ITEM,
    item,
});

export const deleteItem = (item) => ({
    type : DELETE_ITEM,
    item
});

export const changeQuantity = (item, quantity) => ({
    type : CHANGE_QUANTITY,
    item,
    quantity
})


function sales(state = initialState, action) {
    switch(action.type) {
        case ADD_ITEM:
            return{
                ...state,
                items : state.items.concat(action.item),
                price : state.price + action.item.price,
                quantities : state.quantities.concat(1),
            };

        case DELETE_ITEM:
            let index = state.items.findIndex(item => item.id === action.item.id);
            return{
                ...state,
                items : state.items.splice(index, 1),
                price : state.price - action.item.price,
                quantities : state.quantities.splice(index, 1),
            };

        
        case CHANGE_QUANTITY:
            let cur_quantity = state.quantities.slice();
            cur_quantity[state.items.findIndex(item => item.id === action.item.id)] = action.quantity;

            return{
                ...state,
                price : state.price - action.item.price + action.item.price * action.quantity,
                quantities : cur_quantity,
            };


        default:
            return state;
    }
}

export default sales;