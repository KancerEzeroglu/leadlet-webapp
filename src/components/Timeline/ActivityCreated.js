import React from 'react';
import moment from "moment";

const ActivityCreated = (props) => (
    <div className="tracking-item" key={props.item.id}>
        <div className="tracking-icon">
            <i className="fa fa-bell"/>
        </div>
        <div className="tracking-date">{moment(props.item.createdDate).fromNow()}
        </div>
        <div className="tracking-content">Activity Created<span>{props.item.source.title}</span></div>
    </div>
);

export default ActivityCreated;