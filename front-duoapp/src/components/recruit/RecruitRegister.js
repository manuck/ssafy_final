import React from 'react';
import { Link } from 'react-router-dom';
// import Profile from '../../pages/Profile';
import './RecruitRegister.scss';
import TopIcon from '../../assets/icons/ranked-positions/Position_Challenger-Top.png';
import JungleIcon from '../../assets/icons/ranked-positions/Position_Challenger-Jungle.png';
import MidIcon from '../../assets/icons/ranked-positions/Position_Challenger-Mid.png';
import BotIcon from '../../assets/icons/ranked-positions/Position_Challenger-Bot.png';
import SupportIcon from '../../assets/icons/ranked-positions/Position_Challenger-Support.png';

const RecruitRegister = () => {
    // getUserInfo
    // const user = {'nickname': 'dummy'};
    const user = {'representationName': 0};
    return (
        <React.Fragment>
            {user.representationName ? (
                // 대표 소환사가 등록된 경우
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
            ) : user ? (
                // 대표 소환사가 등록되지 않은 경우
                <Link to="/profile" className="register__form">
                    <div className="register__title">
                        대표 소환사를 등록해 주세요.
                    </div>
                </Link>
            ) : (
                // 로그인 하지 않은 경우
                <div>
                    d
                </div>
            )}
        </React.Fragment>
    );
};

export default RecruitRegister;