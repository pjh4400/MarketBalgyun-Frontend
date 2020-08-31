const ADD_ITEM = 'sales/ADD_ITEM'; // 판매목록에 상품 추가
const DELETE_ITEM = 'sales/DELETE_ITEM'; // 판매목록에서 상품 제거
const DISCOUNT = 'sales/DISCOUNT'; // 할인 적용
const POINT = 'sales/POINT'; // 포인트 적용

const initialState = {
    items : [],
    price : 0,
}

export const addItem = (item) => ({
    type : ADD_ITEM,
    item
});

export const deleteItem = (item) => ({
    type : DELETE_ITEM,
    item
});


function sales(state = initialState, action) {
    switch(action.type) {
        case ADD_ITEM:
            return{
                ...state,
                items : state.items.concat(action.item),
                price : state.price + action.item.price,
                };

        case DELETE_ITEM:
            return{
                ...state,
                items : state.items.filter(item => item.id !== action.item.id),
                price : state.price - action.item.price,
            };

        default:
            return state;
    }
}

export default sales;