import React from 'react';
import RecruitList from './RecruitList.js';
// let RecruitList = require('./RecruitList.jsx')

const RecruitFilter = () => {
    return (
        <div className="recruit__filter">
            <button onClick={RecruitList.positionList(1)}>TOP</button>
            <button onClick={RecruitList.positionList(2)}>JUNGLE</button>
            <button onClick={RecruitList.positionList(3)}>MID</button>
            <button onClick={RecruitList.positionList(4)}>AD</button>
            <button onClick={RecruitList.positionList(5)}>SUPPORT</button>
        </div>
    );
};

export default RecruitFilter;