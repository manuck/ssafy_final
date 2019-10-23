import React from 'react';
import TopNavLogo from './TopNavLogo';
import TopNavUser from './TopNavUser';
import './TopNav.scss';

const TopNav = () => {
    return (
        <div className="topnav">
            <TopNavLogo/>
            <TopNavUser/>
        </div>
    );
};

export default TopNav;