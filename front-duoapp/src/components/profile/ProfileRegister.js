import React from 'react';
import './ProfileRegister.scss';

const ProfileRegister = () => {
    const profile = {}
    const findName = async() => {
        const nickname = document.querySelector('.accounts .form input').value;
        console.log(nickname);
        try {
            const res = await fetch('http://localhost:4000/test2', {
                // crossDomain: true,
                method: 'POST',
                // mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nickname: nickname})
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