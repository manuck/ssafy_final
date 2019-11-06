import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import TopNavLogo from './TopNavLogo';
// import TopNavUser from './TopNavUser';
import './TopNav.scss';



const TopNav = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        // profile에서 유저 정보 가져오기
        getUser();
    },[]);
    const getUser = async() => {
        try {
            // cookie가 여러개인 경우 오류가 날수도 있을 것 같다.
            const token = document.cookie.split("MnMsToken=");
            console.log('token', token);
            // const res = await fetch('http://localhost:4000/authtest', {
            const res = await fetch('http://localhost:4000/authtest', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'applicatoin/json',
                    'authorization': token[1] 
                },
            });
  
            const username = '';
            await res.json().then(data => {
                setUser(data);
            });
        } catch(err) {
            console.log('TopNav error Msg:', err);
        }
    }

    return (
        <div className="topnav">
            <div className="topnav__logo">
                <Link to="/">
                    <span>DUO.GG</span>
                </Link>
            </div>
            <div className="topnav__user">
                {user.representationNickname ? (
                    <Link to="/profile">{user.representationNickname}</Link>
                ) : user.username ? (
                    <Link to="/profile">소환사 등록하기</Link>
                ) : (
                    <Link to="login">로그인</Link>
                )}
            </div>
        </div>
    );
};

export default TopNav;