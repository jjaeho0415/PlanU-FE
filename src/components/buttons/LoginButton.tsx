import styles from "./loginBtn.module.scss";
import React, { useEffect, useState } from "react";
import Icon_kakao from '@assets/Icons/startPage/Icon_Kakao.svg?react';

interface ILoginBtn {
  onClick: () => void;
  buttonType: 'login_kakao' | 'login_kakao_white' | 'login_other' | 'register' | 'login'
}

export default function LoginButton({ onClick, buttonType }: ILoginBtn) {
  const [buttonText, setButtonText] =useState<string>('');

  useEffect(() =>{
    if(buttonType === 'login_kakao') {
      setButtonText('카카오톡으로 로그인');
    }else if(buttonType === 'login_kakao_white') {
      setButtonText('카카오 로그인');
    }else if(buttonType === 'login_other') {
      setButtonText('다른 방법으로 로그인');
    }else if(buttonType === 'register') {
      setButtonText('회원가입');
    }else if(buttonType === 'login') {
      setButtonText('로그인');
    }
  },[]);

  return (
    <div className={`${styles.Container} ${styles[buttonType]}`} onClick={onClick}>
      {(buttonType === 'login_kakao' || buttonType === 'login_kakao_white') && 
      <Icon_kakao/>}
      <p>{buttonText}</p>
    </div>
  );
}
