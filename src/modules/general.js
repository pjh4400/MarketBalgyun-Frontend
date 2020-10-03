const SELECT_CATEGORY = 'product/SELECT_CATEOGRY'; // 카테고리선택
const PREVIOUS_STEP = 'product/PREVIOUS_STEP'; // 이전으로 가기

const initialState = {
    info: {
        first_category: '',
        second_category: '',
        third_category: '',
        id: '',
    },
    step: 0,
}


export const selectCategory = (first, second, third) => ({
    type: SELECT_CATEGORY,
    first,
    second,
    third,
});


export const previousStep = () => ({
    type: PREVIOUS_STEP,
});



function general(state = initialState, action) {
    switch (action.type) {
        case SELECT_CATEGORY:
            return {
                info: {
                    first_category: action.first,
                    second_category: action.second,
                    third_category: action.third,
                    id: action.first+action.second+action.third,
                },
                step: 1,
            };

        case PREVIOUS_STEP:
            return {
                ...state,
                step: 0,
            };


        default:
            return state;
    }
}

export default general;