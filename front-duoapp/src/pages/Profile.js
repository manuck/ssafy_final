import React from 'react';
import './Profile.scss';
import ProfileRegister from '../components/profile/ProfileRegister';
import ProfileList from '../components/profile/ProfileList';

const Profile = () => {
    // profile 변수 상속해야 함
    const profile={}
    return (
        <div className="profile">
            <ProfileRegister/>
            <ProfileList/>
        </div>
    );
};

export default Profile;