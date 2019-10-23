import React from 'react';
import TopNav from '../components/TopNav';
import RecruitRegister from '../components/RecruitRegister';
import RecruitList from '../components/RecruitList';
import Footer from '../components/Footer';
import './Home.scss';

const Home = () => {
    return (
        <div className="home">
            <TopNav/>
            <div className="content">
                <RecruitRegister/>
                <RecruitList/>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;