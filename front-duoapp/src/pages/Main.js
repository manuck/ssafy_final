import React from 'react';
import RecruitRegister from '../components/recruit/RecruitRegister';
import RecruitList from '../components/recruit/RecruitList';
import RecruitDetail from '../components/recruit/RecruitDetail';
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
            <RecruitDetail/>
        </div>
    );
};

export default Main;