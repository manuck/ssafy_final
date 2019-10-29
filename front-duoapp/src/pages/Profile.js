import React from 'react';
import './Profile.scss';

const Profile = () => {
    const findName = async () => {
        const nickname = document.querySelector('.accounts .form input').value;
        const res = await fetch('http://localhost:4000/test', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'nickname': nickname})
            
        });
        console.log(res);
    }
    const profile = {}
    return (
        <div className="profile">
            {profile.representationNickname ? (
                // profile lists
                <div>
                </div>
                
            ) : (
                // profile form
                <div className="accounts">
                    <span className="title">계정이 없다면 설정해주세요</span>
                    <div className="form">
                        <span>계정 찾기</span>
                        <input name="nickname" type="text" />
                        <button onClick={findName}>제출</button>
                    </div>
                    <div className="myaccounts">
                        계정 목록
                        {/* <MyAccount/> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;