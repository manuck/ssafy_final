import React from 'react';
import './Login.scss';

const Login = () => {
    return (
        <div className="login__wrap">
            <div className="login__box">
                <div className="title">
                    로그인
                </div>
                <a href="http://13.125.226.179:80/api/auth/google" className="login__button">
                    구글로 로그인하기
                </a>
            </div>
        </div>
    );
};

export default Login;