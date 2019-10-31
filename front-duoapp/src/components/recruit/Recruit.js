import React from 'react';
import './Recruit.scss';
import Emblem_Iron from '../../assets/icons/ranked-emblems/Emblem_Iron.png';
import Emblem_Bronze from '../../assets/icons/ranked-emblems/Emblem_Bronze.png';
import Emblem_Silver from '../../assets/icons/ranked-emblems/Emblem_Silver.png';
import Emblem_Gold from '../../assets/icons/ranked-emblems/Emblem_Gold.png';
import Emblem_Platinum from '../../assets/icons/ranked-emblems/Emblem_Platinum.png';
import Emblem_Diamond from '../../assets/icons/ranked-emblems/Emblem_Diamond.png';
import Emblem_Master from '../../assets/icons/ranked-emblems/Emblem_Master.png';
import Emblem_Grandmaster from '../../assets/icons/ranked-emblems/Emblem_Grandmaster.png';
import Emblem_Challenger from '../../assets/icons/ranked-emblems/Emblem_Challenger.png';
import TopIcon from '../../assets/icons/ranked-positions/Position_Challenger-Top.png';
import JungleIcon from '../../assets/icons/ranked-positions/Position_Challenger-Jungle.png';
import MidIcon from '../../assets/icons/ranked-positions/Position_Challenger-Mid.png';
import BotIcon from '../../assets/icons/ranked-positions/Position_Challenger-Bot.png';
import SupportIcon from '../../assets/icons/ranked-positions/Position_Challenger-Support.png';

const Recruit = props => {
    console.log('props', props);
    const each = props.each;
    const getEmblem = tier => {
        switch(tier) {
            case 'IRON':
                return <img alt="Emblem_Iron" src={Emblem_Iron} />;
            case 'BRONZE':
                return <img alt="Emblem_Bronze" src={Emblem_Bronze} />;
            case 'SILVER':
                return <img alt="Emblem_Silver" src={Emblem_Silver} />;
            case 'GOLD':
                return <img alt="Emblem_Gold" src={Emblem_Gold} />;
            case 'PLATINUM':
                return <img alt="Emblem_Platinum" src={Emblem_Platinum} />;
            case 'DIAMOND':
                return <img alt="Emblem_Diamond" src={Emblem_Diamond} />;
            case 'MASTER':
                return <img alt="Emblem_Master" src={Emblem_Master} />;
            case 'GRANDMASTER':
                return <img alt="Emblem_Grandmaster" src={Emblem_Grandmaster} />;
            case 'CHALLENGER':
                return <img alt="Emblem_Challenger" src={Emblem_Challenger} />;
        }
    }
    const getPositionEmblem = position => {
        switch(position) {
            case 'TOP':
                return <img alt="TopIcon" src={TopIcon} />;
            case 'JUNGLE':
                return <img alt="JungleIcon" src={JungleIcon} />;
            case 'MID':
                return <img alt="MidIcon" src={MidIcon} />;
            case 'BOT':
                return <img alt="BotIcon" src={BotIcon} />;
            case 'SUPPORT':
                return <img alt="SupportIcon" src={SupportIcon} />;
        }
    }
    return (
        <div className="recruit__each">
            <div className="column1">
                <div className="emblem">
                    {getEmblem(each.tiers.tier)}
                </div>
                <div className="tier">
                    {each.tiers.tier} {each.tiers.rank}
                </div>
            </div>
            <div className="column2">
                <div className="position__emblem">
                    {getPositionEmblem(each.position)}
                </div>
                <div className="position">
                    {each.position}
                </div>
            </div>
            <div className="column3">
                <div className="records">
                    {/* {each.recent[0].win ? 'win' : 'lose'} */}
                </div>
                <div className="status">
                    {each.status ? 'true' : 'false'}
                </div>
                <div className="time">
                    created_time
                </div>
            </div>
        </div>
    );
};

export default Recruit;