import React from 'react';
import Recruit from './Recruit';
import './RecruitList.scss';

const RecruitList = () => {
    return (
        <div className="matchnow__list">
            <Recruit/>
            <Recruit/>
            <Recruit/>
            <Recruit/>
        </div>
    );
};

export default RecruitList;