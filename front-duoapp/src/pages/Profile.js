import React from 'react';
import './Profile.scss';

const Profile = () => {
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
                        <input type="submit" value="찾기" />
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