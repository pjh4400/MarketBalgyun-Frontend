const ADD_ITEM = 'sales/ADD_ITEM'; // 판매목록에 상품 추가
const DELETE_ITEM = 'sales/DELETE_ITEM'; // 판매목록에서 상품 제거
const CHANGE_INFO = 'sales/CHANGE_INFO'; // 상품 정보(할인, 수량) 변경
const PUT_CONSIGN_INFO = 'sales/PUT_CONSIGN_INFO'; //위탁상품 정보 입력

const initialState = {
    items: [],
    sum_price: 0,
    consign_info: [],
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

export const changeInfo = (id, quantity, discount, prePrice, newPrice) => ({
    type: CHANGE_INFO,
    id, quantity, discount, prePrice, newPrice,
});

export const putConsignInfo = (consign_info) => ({
    type: PUT_CONSIGN_INFO,
    consign_info,
});


function sales(state = initialState, action) {
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
                    sales_quantity: 0,
                    discount: 0,
                    apply_price: action.item.price,
                }),
                sum_price: state.sum_price + action.item.price,
            };

        case DELETE_ITEM:
            let index = state.items.findIndex(item => item.id === action.id);
            let newItems = state.items;
            newItems.splice(index, 1);
            return {
                ...state,
                items: newItems,
                sum_price: state.sum_price - action.price,
            };

        case CHANGE_INFO:
            let changedItems = state.items;
            let idx_ch = changedItems.findIndex(item => item.id === action.id);
            changedItems[idx_ch].sale_quantity = action.quantity;
            changedItems[idx_ch].discount = action.discount;
            changedItems[idx_ch].apply_price = action.newPrice;

            return {
                ...state,
                items: changedItems,
                sum_price: state.sum_price - action.prePrice + action.newPrice,
            };

        case PUT_CONSIGN_INFO:
            return{
                items: [],
                sum_price: 0,
                consign_info: action.consign_info,
            }


        default:
            return state;
    }
}

export default sales;