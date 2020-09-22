import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Home from '../pages/Home';
import { login, logout } from '../modules/auth';

const RootContainer = () => {
  const { isLogin, userName } = useSelector(({ auth }) => ({
    isLogin: auth.isLogin,
    userName: auth.userName,
  }));

  const dispatch = useDispatch();
  const onLogin = useCallback((userName) => dispatch(login(userName)), [dispatch]);
  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <Home
      isLogin={isLogin}
      userName={userName}
    />
  );
};

export default RootContainer;
