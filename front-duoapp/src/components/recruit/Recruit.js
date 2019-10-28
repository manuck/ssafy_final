import React from 'react';
import './Recruit.scss';

const Recruit = () => {
    return (
        <div className="recruit__each">
            <div className="column1">
                <div className="tier">
                    tier
                </div>
                <div className="position">
                    position
                </div>
                <div className="nickname">
                    nickname
                </div>
            </div>
            <div className="column2">
                <div className="records">
                    records
                </div>
            </div>
            <div className="column3">
                <div className="status">
                    status
                </div>
                <div className="time">
                    created_time
                </div>
                <div className="submit">
                    신청
                </div>
            </div>
        </div>
    );
};

export default Recruit;