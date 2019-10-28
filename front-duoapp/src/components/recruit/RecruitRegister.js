import React from 'react';
import './RecruitRegister.scss';
import TopIcon from '../../assets/icons/ranked-positions/Position_Challenger-Top.png';
import JungleIcon from '../../assets/icons/ranked-positions/Position_Challenger-Jungle.png';
import MidIcon from '../../assets/icons/ranked-positions/Position_Challenger-Mid.png';
import BotIcon from '../../assets/icons/ranked-positions/Position_Challenger-Bot.png';
import SupportIcon from '../../assets/icons/ranked-positions/Position_Challenger-Support.png';

const RecruitRegister = () => {
    // getUserInfo
    // const user = {'nickname': 'dummy'};
    const user = '';
    return (
        <React.Fragment>
            {user ? (
                <div className="register__form">
                    <div className="register__title">
                        매칭 등록하기
                    </div>
                    <div className="register__content">
                        <div className="position">
                            <div className="top">
                                <img alt="top-icon" src={TopIcon} />
                            </div>
                            <div className="jungle">
                                <img alt="jungle-icon" src={JungleIcon} />
                            </div>
                            <div className="mid">
                                <img alt="mid-icon" src={MidIcon} />
                            </div>
                            <div className="ad">
                                <img alt="bot-icon" src={BotIcon} />
                            </div>
                            <div className="support">
                                <img alt="support-icon" src={SupportIcon} />
                            </div>
                        </div>
                        <div className="submit">
                            <div className="button">
                                등록
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="register__form">
                    <div className="register__title">
                        
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default RecruitRegister;