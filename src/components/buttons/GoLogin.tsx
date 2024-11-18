import styles from './goLogin.module.scss';
import React, { useEffect, useState } from 'react';

interface IGoLogin {
    textType: '로그인' | '회원가입';
}

export default function GoLogin ({textType}:IGoLogin) {
    const [text, setText] = useState<string>('');
    const [buttonText, setButtonText] = useState<string>('');

    useEffect(()=>{
        if(textType === '로그인'){
            setText('기존 회원이신가요?');
            setButtonText('로그인');
        }else if(textType === '회원가입'){
            setText('아직 회원이 아니신가요?');
            setButtonText('회원가입');
        }
    },[]);

    return(
        <div className={styles.Container}>
            <p className={styles.Text}>{text}</p>
            <p className={styles.ButtonText}>{buttonText}</p>
        </div>
    )
}