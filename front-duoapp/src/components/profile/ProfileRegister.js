import React from 'react';
import './ProfileRegister.scss';

const ProfileRegister = () => {
    const profile = {}
    const findName = async() => {
        const nickname = document.querySelector('.accounts .form input').value;
        console.log(nickname);
        try {
            const res = await fetch('http://localhost:4000/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nickname: nickname})
            });
            console.log('result', res);
        } catch (err) {
            console.log(err);
        }
        console.log('after fetch in frontend')
    }
    return (
        <div className="accounts cardview">
            <span className="title">계정 등록하기</span>
            <div className="form">
                <input name="nickname" type="text" />
                <button onClick={findName}>등록</button>
            </div>
        </div>
    );
};

export default ProfileRegister;