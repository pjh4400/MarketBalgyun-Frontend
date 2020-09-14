const ADD_ITEM = 'sales/ADD_ITEM'; // 판매목록에 상품 추가
const DELETE_ITEM = 'sales/DELETE_ITEM'; // 판매목록에서 상품 제거
const CHANGE_PRICE = 'sales/CHANGE_PRICE'; // 할인, 수량 변경 등으로 가격 비교

const initialState = {
    items : [],
    sum_price : 0,  
}

export const addItem = (item) => ({
    type : ADD_ITEM,
    item,
});

export const deleteItem = (id, price) => ({
    type : DELETE_ITEM,
    id,
    price,
});

export const changePrice = (prevPrice, newPrice) => ({
    type : CHANGE_PRICE,
    prevPrice,
    newPrice,
});



function sales(state = initialState, action) {
    switch(action.type) {
        case ADD_ITEM:
            return{
                ...state,
                items : state.items.concat(action.item),
                sum_price : state.sum_price + action.item.price,
            };

        case DELETE_ITEM:
            let index = state.items.findIndex(item => item.id === action.id);
            let newItems = state.items;
            newItems.splice(index,1);
            return{
                ...state,
                items : newItems,
                sum_price : state.sum_price - action.price,
            };

        case CHANGE_PRICE:
            return{
                ...state,
                sum_price : state.sum_price - action.prevPrice + action.newPrice,
            };

        default:
            return state;
    }
}

export default sales;