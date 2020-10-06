const ADD_ITEM = 'sales/ADD_ITEM'; // 판매목록에 상품 추가
const DELETE_ITEM = 'sales/DELETE_ITEM'; // 판매목록에서 상품 제거
const CHANGE_INFO = 'sales/CHANGE_INFO'; // 상품 정보(할인, 수량) 변경
const COMPLETE_SALE = 'sales/COMPLETE_SALE'; // 판매 완료 후 장바구니 비우기

const initialState = {
    items: [],
    sum_price: 0,
}

export const addItem = (item) => ({
    type: ADD_ITEM,
    item,
});

export const deleteItem = (id, price) => ({
    type: DELETE_ITEM,
    id,
    price,
});

export const changeInfo = (id, quantity, discount) => ({
    type: CHANGE_INFO,
    id, quantity, discount,
});

export const completeSale = () => ({
    type: COMPLETE_SALE,
})



function sales(state = initialState, action) {
    let sum = 0;
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                items: state.items.concat({
                    id: action.item.id,
                    name: action.item.name,
                    quantity: action.item.quantity,
                    max_discount: action.item.max_discount,
                    price: action.item.price,
                    sale_quantity: 1,
                    discount: 0,
                    apply_price: action.item.price,
                }),
                sum_price: state.sum_price + action.item.price,
            };

        case DELETE_ITEM:
            let index = state.items.findIndex(item => item.id === action.id);
            let newItems = state.items;
            newItems.splice(index, 1);
            newItems.forEach((item) => {
                sum += item.apply_price;
            })
            return {
                ...state,
                items: newItems,
                sum_price: sum,
            };

        case CHANGE_INFO:
            let changedItems = state.items;
            let idx_ch = changedItems.findIndex(item => item.id === action.id);
            changedItems[idx_ch].sale_quantity = action.quantity;
            changedItems[idx_ch].discount = action.discount;
            changedItems[idx_ch].apply_price = ( changedItems[idx_ch].price - action.discount ) * action.quantity;
            state.items.forEach((item) => {
                sum += item.apply_price;
            })
            return {
                ...state,
                items: changedItems,
                sum_price: sum,
            };

        case COMPLETE_SALE:
            return{
                ...state,
                items : [],
                sum_price: 0,
            };


        default:
            return state;
    }
}

export default sales;