import React from 'react';
import './Profile.scss';
import ProfileRegister from '../components/profile/ProfileRegister';

const Profile = () => {
    // profile 변수 상속해야 함
    const profile={}
    return (
        <div className="profile">
            {profile.representationNickname ? (
                // profile lists
                <div>
                </div>
                
            ) : (
                // profile form
                <ProfileRegister/>
            )}
        </div>
    );
};

export default Profile;