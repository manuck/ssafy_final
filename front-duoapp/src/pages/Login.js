import React, { useState } from 'react';
import './Login.scss';

const Login = () => {
    const [username, setUsername] = useState("");

    const callLoginApi = e => {
        fetch("https://localhost:4000/api/auth/login")
            .then(res => res.json())
            .then(json => {
                setUsername(e.json.title);
            })
    };

    return (
        <div className="google__login">
            <a href="https://localhost:4000/api/auth/google" className="login__button">
                구글로 로그인하기
            </a>
            {/* <button onClick={callLoginApi} className="login__button">
                구글로 로그인하기
            </button> */}
        </div>
    );
};

export default Login;