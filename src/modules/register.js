const SELECT_CATEGORY = 'register/SELECT_CATEOGRY'; // 카테고리선택
const SET_STEP = 'register/SET_STEP'; // 스텝변경

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


export const setStep = (step) => ({
    type: SET_STEP,
    step,
});



function register(state = initialState, action) {
    switch (action.type) {
        case SELECT_CATEGORY:
            return {
                info: {
                    first_category: action.first,
                    second_category: action.second,
                    third_category: action.third,
                },
                step: 1,
            };

        case SET_STEP:
            return {
                ...state,
                step: action.step,
            };


        default:
            return state;
    }
}

export default register;