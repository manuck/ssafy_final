import React, { useState, useEffect } from 'react';
import './ProfileList.scss';

const ProfileList = () => {
    const [user, setUser] = useState('');
    useEffect(() => {
        // profile에서 유저 정보 가져오기
        getUsername();
    },[]);
    const getUsername = async() => {
        const token = document.cookie.split("MnMsToken=");
        const res = await fetch('http://localhost:4000/authtest', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'applicatoin/json',
                'authorization': token[1]
            },
        });
        await res.json().then(data => {
            setUser(data);
        });
    };

    const profileList = user.nicknames ? 
        (
            user.nicknames.map((name, index) => (
                <div className="profile__card cardview--border" key={index}>
                    <span>{name}</span>
                </div>
            ))
        ) : (
            <span className="no__profile">
                등록된 계정이 없습니다.
            </span>
        )
    return (
        <div className="profile__list cardview">
            <div className="title">
                계정 목록
            </div>
            <ul className="content">
                {profileList}
            </ul>
        </div>
    );
};

export default ProfileList;
