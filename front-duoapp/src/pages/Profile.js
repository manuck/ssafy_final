import React from 'react';
import './Profile.scss';

const Profile = () => {
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
                        <button type="submit" value="찾기" onClick={findName} />
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