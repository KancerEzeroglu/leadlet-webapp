import React, {Component} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import TeamList from "./TeamList";
import AgentList from "../Agent/AgentList";

class TeamAgentManagement extends Component {

    render() {
        return (
            <div className="teamboard">
                <Tabs defaultActiveKey={1} animation={false} id="team-tabs">
                    <Tab eventKey={1} title="Teams">
                        <div className="row teamlist">
                            <TeamList/>
                        </div>
                    </Tab>
                    <Tab eventKey={2} title="Agents">
                        <div className="row teamlist">
                            <AgentList/>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }

}

export default TeamAgentManagement;