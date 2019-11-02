import React from 'react';
import RecruitRegister from '../components/recruit/RecruitRegister';
import RecruitList from '../components/recruit/RecruitList';
import './Main.scss';

const Main = () => {
    return (
        // <div className="home">
        //     <div className="content">
        //         <RecruitRegister/>
        //         <RecruitList/>
        //     </div>
        // </div>
        <div className="home">
            <RecruitRegister/>
            <RecruitList/>
        </div>
    );
};

export default Main;