import React, { useState, useEffect } from 'react';
import Recruit from './Recruit';
import './RecruitList.scss';

const RecruitList = () => {
    const [recruitList, setRecruitList] = useState([]);
    const requestBody = {
        query: `
            query {
                recruitmentsAndUsers {
                    _id,
                    userId,
                    position,
                    status,
                    recentgames {
                        win,
                        kills,
                        deaths,
                        assists,
                        champion
                    },
                    tiers {
                        tier,
                        rank,
                        leaguePoint,
                    }
                }
            }
        `
    };
    const requestRecruit = async() => {
        const res = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await res.json().then(data => {
            setRecruitList(data.data.recruitmentsAndUsers);
            // console.log(data.data.recruitmentsAndUsers);
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