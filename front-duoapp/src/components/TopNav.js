import React from 'react';
import { Link } from 'react-router-dom';
// import TopNavLogo from './TopNavLogo';
// import TopNavUser from './TopNavUser';
import './TopNav.scss';

const TopNav = () => {
    return (
        <div className="topnav">
            <div className="topnav__logo">
                <span>DUO.GG</span>
            </div>
            <div className="topnav__user">
                {/* 로그인 안 했을 때 */}
                {/* 로그인 페이지로 이동 */}
                {/* <Link to="/login">시작하기</Link> */}
                {/* 로그인 했을 때 */}
                <Link to="/profile">[nickname] &gt;</Link>
            </div>
        </div>
    );
};

export default TopNav;