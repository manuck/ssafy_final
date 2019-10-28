import React from 'react';
import './Recruit.scss';

const Recruit = () => {
    return (
        <div class="recruit__each">
            <div class="column1">
                <div class="tier">
                    tier
                </div>
                <div class="position">
                    position
                </div>
                <div class="nickname">
                    nickname
                </div>
            </div>
            <div class="column2">
                <div class="records">
                    records
                </div>
            </div>
            <div class="column3">
                <div class="status">
                    status
                </div>
                <div class="time">
                    created_time
                </div>
                <div class="submit">
                    신청
                </div>
            </div>
        </div>
    );
};

export default Recruit;