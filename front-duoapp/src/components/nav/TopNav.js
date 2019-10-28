import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import TopNavLogo from './TopNavLogo';
// import TopNavUser from './TopNavUser';
import './TopNav.scss';

const TopNav = () => {
    const [user, setUser] = useState('');
    useEffect(() => {
        console.log('mounted');
    });
    // const user = {
    //     username: 'kbs3539@gmail.com',
    //     nicknames: ['싹싹김치', '싹싹김치2', '갓김치'],
    //     representationNickname: '싹싹김치',
    //     tiers: {
    //         tier: 'diamond',
    //         rank: 'IV',
    //         leaguePoint: 3000
    //     },
    //     recentGames: [
    //         {
    //             win: true,
    //             kills: 10,
    //             deaths: 1,
    //             assists: 5,
    //             champNo: 22
    //         },
    //         {
    //             win: false,
    //             kills: 10,
    //             deaths: 2,
    //             assists: 3,
    //             champNo: 10
    //         },
    //         {
    //             win: true,
    //             kills: 2,
    //             deaths: 10,
    //             assists: 15,
    //             champNo: 1
    //         },
    //         {
    //             win: true,
    //             kills: 6,
    //             deaths: 4,
    //             assists: 5,
    //             champNo: 40
    //         },
    //         {
    //             win: true,
    //             kills: 9,
    //             deaths: 8,
    //             assists: 7,
    //             champNo: 32
    //         }
    //     ],
    //     majorPosition: 'bot',
    //     minorPosition: 'top',
    //     apiUpdatedAt: '2016-05-18T16:00:00Z',
    // }
    return (
        <div className="topnav">
            <div className="topnav__logo">
                <span>DUO.GG</span>
            </div>
            <div className="topnav__user">
                {user ? (
                    <Link to="/profile">{user.representationNickname} &gt;</Link>
                ) : (
                    <Link to="/login">시작하기</Link>
                )}
            </div>
        </div>
    );
};

export default TopNav;