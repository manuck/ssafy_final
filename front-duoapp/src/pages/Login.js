import React from 'react';
import './Login.scss';

const Login = () => {
    return (
        <div className="google__login">
            <a href="http://localhost:4000/api/auth/google" className="login__button">
                구글로 로그인하기
            </a>
        </div>
    );
};

export default Login;