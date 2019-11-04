import React, { useState, useEffect } from 'react';
import RecruitRegister from '../components/recruit/RecruitRegister';
import RecruitList from '../components/recruit/RecruitList';
import './Main.scss';
import RecruitFilter from '../components/recruit/RecruitFilter';

const Main = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        // profile에서 유저 정보 가져오기
        getUser();
    },[]);
    const getUser = async() => {
        try {
            // cookie가 여러개인 경우 오류가 날수도 있을 것 같다.
            const token = document.cookie.split("MnMsToken=");
            console.log('token', token);
            const res = await fetch('http://localhost:4000/authtest', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'applicatoin/json',
                    'authorization': token[1] 
                },
            });
            // console.log('user:', res.json().then(data => console.log(data.username)));
            const username = '';
            await res.json().then(data => {
                console.log(data)
                // console.log('userdata', data);
                { this.props.onCreate(data) } 
                // console.log('user1', user);
                setUser(data);
                // console.log('user2', user);
            });
        } catch(err) {
            console.log('TopNav error Msg:', err);
        }
    }

    return (
        // <div className="home">
        //     <div className="content">
        //         <RecruitRegister/>
        //         <RecruitList/>
        //     </div>
        // </div>
        <div className="home">
            <RecruitRegister/>
            {/* <RecruitFilter/> */}
            <RecruitList/>
        </div>
    );
};

export default Main;