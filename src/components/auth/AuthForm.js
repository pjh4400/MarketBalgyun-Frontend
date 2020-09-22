import React from 'react';

import SignInPage from '../../pages/SignInpage';
import SignUpPage from '../../pages/SignUppage';

/**
 * 회원가입 또는 로그인 폼을 보여 줍니다.
 */
const textMap = {
    signIn: '로그인',
    signUp: '회원가입',
  };

const AuthForm = ({type}) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      {type === 'singIn' && <SignInpage />}
      {type === 'signUp' && <SignUpPage />}
    </AuthFormBlock>
  );
};

export default AuthForm;