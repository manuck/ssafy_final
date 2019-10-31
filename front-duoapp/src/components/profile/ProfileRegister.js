import React, { useState, useEffect } from 'react';
import './ProfileRegister.scss';

let userInfo = []
const ProfileRegister = () => {
    const profile = {}
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
        // console.log('user:', res.json().then(data => console.log(data.username)));
        // const username = '';
        userInfo = await res.json().then(data => {
            setUser(data);
            return [data['username'], data['_id']]
            // console.log(data['username']);
        });
    }

    const findName = async() => {
        const nickname = document.querySelector('.accounts .form input').value;
        console.log(nickname);
        try {
            const res = await fetch('http://localhost:4000/test', {
                // crossDomain: true,
                method: 'POST',
                // mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({nickname: nickname, username: userInfo[0], userId: userInfo[1]})
                // body: {'nickname': nickname}
            });
            console.log('result', res);
            // const res = await fetch('http://localhost:4000/test', {
            //     crossDomain: true,
            //     method: 'POST',
            //     mode: 'cors',
            //     // redirect: 'follow',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(nickname)
            // });
        } catch (err) {
            console.log('fuck');
            console.log(err);
        }
        console.log('after fetch in frontend')
        // console.log(res)
    }
    return (
        <div className="accounts cardview">
            <span className="title">계정 등록하기</span>
            <div className="form">
                <input name="nickname" type="text" />
                <button onClick={findName}>등록</button>
            </div>
            <div className="myaccounts">
                계정 목록
                {/* <MyAccount/> */}
            </div>
        </div>
    );
};

export default ProfileRegister;