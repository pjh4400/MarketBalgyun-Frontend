const PUT_CONSIGN_INFO = 'sales/PUT_CONSIGN_INFO'; // 계좌로 보내야 할 위탁상품 정보 입력
const COMPLETE_ALL = 'sales/COMPLETE_ALL'; // 전체 송금 완료 

const initialState = {
    consign_info: [],
}

export const putConsignInfo = (consign_info) => ({
    type: PUT_CONSIGN_INFO,
    consign_info,
});

export const completeALL = () => ({
    type: COMPLETE_ALL
})

function consigner(state = initialState, action) {
    switch (action.type) {
        case PUT_CONSIGN_INFO:
            return {
                consign_info: action.consign_info,
            };

        case COMPLETE_ALL:
            return {
                consign_info: [],
            };

        default:
            return state;
    }
}

export default consigner;