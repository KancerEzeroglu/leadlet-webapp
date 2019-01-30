import React from 'react';
import PropTypes from 'prop-types';
import Link from "react-router-dom/es/Link";
import moment from 'moment';
import * as _ from "lodash";

const propTypes = {
    item: PropTypes.object.isRequired,
    style: PropTypes.object
};

function getActivityStatusColor(item) {
    if (item.activity_status === "EXPIRED") {
        return "red";
    }
    if (item.activity_status === "TODAY") {
        return "green";
    }
    if (item.activity_status === "IN_FUTURE") {
        return "orange";
    }
    if (item.activity_status === "NO_ACTIVITY") {
        return "gray";
    }
}

const DealCard = (props) => {
    const {item} = props;
    //const agentFirstName = item.agent && item.agent.firstName.charAt(0);
    //const agentLastName = item.agent && item.agent.lastName.charAt(0);
    const dealChannelName = item.deal_channel ? item.deal_channel.name.slice(0, 12) : 'Not Found';
    const dealSourceName = item.deal_source ? item.deal_source.name.slice(0, 8) : 'Not Found';
    const dealPhoneNumber = _.get(item, ["contact","phones","0","phone"], 'Not Number');
    let dealProdutsName = item.products.map( x => x.length !== 0 ? dealProdutsName = x.name.slice(0, 15) : dealProdutsName = 'Not Products Name');
    console.log(item, '>>>item');
    const formattedDate = moment(item.createdDate).fromNow();
    return (
        <li className="info-element">
            <Link style={{ textDecoration: 'inherit', color:'inherit' }} to={"/deal/" + item.id}>
                <div className="lead-card">
                    <span className="lead-photo"><img alt="Deal Card" src="https://media.nngroup.com/media/people/photos/Kim-Flaherty-Headshot.png.400x400_q95_autocrop_crop_upscale.png" /></span>
                    <span className="lead-product">{dealProdutsName}</span>
                    <span className="lead-name">{item.contact && item.contact.name}</span>
                    <span className="lead-phone">{dealPhoneNumber}</span>
                    <span className={"lead-status " + getActivityStatusColor(item)}>{item.activity_status}</span>
                    <div className="lead-icon">
                        <span></span>
                        <span></span>
                        <span><i className="fa fa-pencil" aria-hidden="true"></i></span>
                    </div>
                    <div className="lead-channel">
                        <span className="first">{dealSourceName}</span>
                        <span className="second">{dealChannelName}</span>
                    </div>
                    <span className="lead-time">{formattedDate}</span>
                    <span className="lead-score"><span className="score high orange"></span></span>
                </div>
            </Link>
        </li>
    );
};

DealCard.propTypes = propTypes;
export default DealCard;