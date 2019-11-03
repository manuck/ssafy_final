import React from 'react';
import RecruitRegister from '../components/recruit/RecruitRegister';
import RecruitList from '../components/recruit/RecruitList';
import './Main.scss';
import RecruitFilter from '../components/recruit/RecruitFilter';

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
            {/* <RecruitFilter/> */}
            <RecruitList/>
        </div>
    );
};

export default Main;