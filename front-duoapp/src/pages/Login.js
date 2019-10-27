import React, { useState } from 'react';
import axios from 'axios';
import './Login.scss';

const Login = () => {
    const [username, setUsername] = useState("");

    const callLoginApi = async(e) => {
        try {
            const res = await fetch('/api/auth/google')
            console.log(res)
            // const res = await axios.get('/api/auth/google')
            // console.log('r', res.data)
            // --------
            // fetch("https://localhost:4000/api/auth/login")
            //     .then(res => res.json())
            //     .then(json => {
            //         setUsername(e.json.title);
            //     })
        } catch (e) {
            console.log('r', e);
        }
    };

    return (
        <div className="google__login">
            <a href="http://localhost:4000/api/auth/google" className="login__button">
                구글로 로그인하기
            </a>
            {/* <button onClick={callLoginApi} className="login__button">
                구글로 로그인하기
            </button> */}
        </div>
    );
};

export default Login;