import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecruitRegister.scss';
import TopIcon from '../../assets/icons/ranked-positions/Position_Challenger-Top.png';
import JungleIcon from '../../assets/icons/ranked-positions/Position_Challenger-Jungle.png';
import MidIcon from '../../assets/icons/ranked-positions/Position_Challenger-Mid.png';
import BotIcon from '../../assets/icons/ranked-positions/Position_Challenger-Bot.png';
import SupportIcon from '../../assets/icons/ranked-positions/Position_Challenger-Support.png';

const RecruitRegister = () => {
    const [user, setUser] = useState({});
    const [registerResult, setState] = useState({});
    const getUsername = async() => {
        const token = document.cookie.split("MnMsToken=");
        console.log('user', user);
        const res = await fetch('http://localhost:4000/authtest', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'applicatoin/json',
                'authorization': token[1]
            },
        });
        await res.json().then(data => {
            setUser(data);
        });
    };
    const registerSubmit = async() => {
        const selectedPosition = document.querySelector('input[name="position"]:checked').id.toUpperCase();
        const requestBody = {
            query: `
                mutation {
                    createRecruitment(createRecruitmentInput: {username: "${user.username}", position: "${selectedPosition}"}) {
                        position
                    }
                }
            `
        }
        // console.log(requestBody);
        const res = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await res.json().then(data => {
            setState(data);
            console.log('data22',data);
        });
    };
    useEffect(() => {
        getUsername();
    },[]);
    return (
        <React.Fragment>
            {user.representationNickname ? (
                // 대표 소환사가 등록된 경우
                <div className="register__form">
                    <div className="register__title">
                        매칭 등록하기
                    </div>
                    <div className="register__content">
                        <div className="position__radio__wrap">
                            <input type="radio" name="position" id="top" />
                            <label for="top">TOP</label>
                            <input type="radio" name="position" id="jungle" />
                            <label for="jungle">JUNGLE</label>
                            <input type="radio" name="position" id="mid" />
                            <label for="mid">MID</label>
                            <input type="radio" name="position" id="ad" />
                            <label for="ad">AD</label>
                            <input type="radio" name="position" id="support" />
                            <label for="support">SUPPORT</label>
                        </div>
                        {/* <div className="position">
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
                        </div> */}
                        <div className="submit">
                            <button onClick={registerSubmit} className="button">
                                등록
                            </button>
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