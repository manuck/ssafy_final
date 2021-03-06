import React from 'react';
// import TopNav from '../components/nav/TopNav';
import RecruitRegister from '../components/recruit/RecruitRegister';
import RecruitList from '../components/recruit/RecruitList';
// import Footer from '../components/Footer';
import './Main.scss';

const Main = () => {
    return (
        <div className="home">
            {/* <TopNav/> */}
            <div className="content">
                <RecruitRegister/>
                <RecruitList/>
            </div>
            {/* <Footer/> */}
        </div>
    );
};

export default Main;