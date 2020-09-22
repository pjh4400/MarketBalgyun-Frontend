const LOGIN = 'auth/LOGIN'; // 로그인
const LOGOUT = 'auth/LOGOUT'; // 로그아웃

const initialState = {
  isLogin : false,
  userName : '',
};

export const login = (userName) => ({
  type: LOGIN,
  userName,
});

export const logout = () => ({
  type: LOGOUT,
});

function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin : true,
        userName : state.userName,
      };

    case LOGOUT:
      return{
        ...state,
        isLogin : false,
        userName : '',
      };

    default:
      return state;
  };
}




export default auth;