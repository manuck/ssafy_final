import React, { useState, useEffect } from 'react';
import Recruit from './Recruit';
import './RecruitList.scss';

const RecruitList = () => {
    const [recruitList, setRecruitList] = useState([]);
    const requestBody = {
        query: `
            query{
                recruitmentAndWriters{
                    _id,
                    position,
                    status,
                    created_at,
                    updated_at,
                    writer {
                        username,
                        representationNickname,
                        tiers {
                            tier,
                            rank,
                            leaguePoint
                        },
                        recentgames {
                            win,
                            kills,
                            deaths,
                            assists,
                            champion
                        }
                    }
                }
            }
        `
    };
    const requestRecruit = async() => {
        const res = await fetch('http://13.125.226.179:80/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await res.json().then(data => {
            console.log(data.data.recruitmentAndWriters);
            setRecruitList(data.data.recruitmentAndWriters);
        });
    };

    const recruitPostList = recruitList.map((each, index) => {
        // console.log(each)
        return (
            <Recruit
                key={each._id}
                each={each}
            />
        )
    });
    useEffect(() => {
        requestRecruit();
    }, []);
    return (
        <div className="matchnow__list">
            {recruitPostList}
            {/* <Recruit/> */}
        </div>
    );
};

export default RecruitList;