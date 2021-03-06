import React, {Component} from 'react';
import '../../../node_modules/fullcalendar/dist/fullcalendar.css';
import connect from "react-redux/es/connect/connect";
import {getDealById} from "../../actions/deal.actions";
import Timeline from "../Timeline/Timeline";
import CreateEditDeal from '../DealDetail/CreateEditDeal'
import LostReason from '../DealDetail/LostReason'
import moment from 'moment';
import Link from "react-router-dom/es/Link";
import Note from "../Note/Note";
import * as _ from "lodash";


class DealDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditDealModalVisible: false,
            isEditDealModalForWonVisible: false,
            lastModifiedDate: moment()
        };

        this.openEditDealModalWon = this.openEditDealModalWon.bind(this);
        this.openEditDealModal = this.openEditDealModal.bind(this);
        this.closeEditDealModal = this.closeEditDealModal.bind(this);
        this.closeEditDealModalWon = this.closeEditDealModalWon.bind(this);
        this.closeLostReasonModal = this.closeLostReasonModal.bind(this);
        this.renderAgent = this.renderAgent.bind(this);
        this.renderLastUpdateDate = this.renderLastUpdateDate.bind(this);
        this.renderPossibleCloseDate = this.renderPossibleCloseDate.bind(this);
        this.renderCreatedDate = this.renderCreatedDate.bind(this);
        this.renderDealValue = this.renderDealValue.bind(this);
        this.openLostReasonModal = this.openLostReasonModal.bind(this);
        this.getViewedDeal = this.getViewedDeal.bind(this);
        this.onPageUpdate = this.onPageUpdate.bind(this);
    }


    /*
    When we add an activity for deal or edit some field,
    we should call this function to update state. This state will be passed to timeline as props
    so timeline component will be notified about change and refresh itself.
 */
    onPageUpdate() {
        this.setState({lastModifiedDate: moment()});
    }

    closeEditDealModal() {
        this.setState({
            isEditDealModalVisible: false,
            lastModifiedDate: moment()
        });
    }

    closeEditDealModalWon() {
        this.setState({
            isEditDealModalForWonVisible: false,
            lastModifiedDate: moment()
        });
    }

    closeLostReasonModal() {
        this.setState({
            isLostReasonModalVisible: false
        });
    }

    openEditDealModal() {
        this.setState({
            isEditDealModalVisible: true
        });
    }

    openEditDealModalWon() {
        this.setState({
            isEditDealModalForWonVisible: true
        });
    }

    openLostReasonModal() {
        this.setState({isLostReasonModalVisible: true});
    }

    componentDidMount() {
        this.props.getDealById(this.props.match.params.dealId);
    }

    getViewedDeal() {
        if (_.has(this, ["props", "dealStore", "items", this.props.match.params.dealId])) {
            return this.props.dealStore.items[this.props.match.params.dealId];
        }
    }

    render() {
        const deal = this.getViewedDeal();

        // TODO fix this part
        if (!deal) {
            return (
                <em>Loading details for {this.props.match.params.dealId}</em>
            );
        } else {

            return (
                <div className="container-fluid m-lg">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="ibox">
                                <div className="ibox-content info-card">
                                    <div className="row">
                                        <dl className="dl-horizontal">
                                            <dt>Title:</dt>
                                            <dd>{deal.title}</dd>
                                            <dt>Pipeline:</dt>
                                            <dd>{deal.pipeline.name}</dd>
                                            <dt>Stage:</dt>
                                            <dd>{deal.stage.name}</dd>
                                            <dt>Deal Value:</dt>
                                            <dd>{this.renderDealValue()}</dd>
                                            <dt>Agent:</dt>
                                            <dd>{this.renderAgent()}</dd>
                                            <dt>Contact:</dt>
                                            <dd>{this.renderContacts()}</dd>
                                            <dt>Last Updated:</dt>
                                            <dd>{this.renderLastUpdateDate()}</dd>
                                            <dt>Created:</dt>
                                            <dd>{this.renderCreatedDate()}</dd>
                                            <dt>Possible Close:</dt>
                                            <dd>{this.renderPossibleCloseDate()}</dd>
                                            {
                                                deal.deal_status === "LOST" &&
                                                [<dt>Lost Reason:</dt>, <dd>{deal.lost_reason && deal.lost_reason.name}</dd>]
                                            }
                                            <dt>Deal Status:</dt>
                                            <dd>{deal.deal_status}</dd>

                                        </dl>
                                    </div>
                                    <div className="row">
                                        <button onClick={this.openEditDealModal}
                                                className="btn btn-white btn-xs pull-right">Edit Deal
                                        </button>
                                        <button onClick={() => this.openEditDealModalWon()} type="button" className="btn btn-primary btn-xs">WON
                                        </button>
                                        <button onClick={() => this.openLostReasonModal()} type="button"
                                                className="deal-danger-btn btn btn-danger btn-xs">LOST
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="ibox">
                                <div className="ibox-content">
                                    <Note initialValues={{
                                        dealId: deal.id
                                    }}
                                          onChange={this.onPageUpdate}
                                    />
                                </div>
                            </div>
                            <div className="ibox">
                                <Timeline
                                    lastModifiedDate={this.state.lastModifiedDate}
                                    initialValues={{
                                        deal: {
                                            id: deal.id
                                        },
                                        contact: deal.contact,
                                        agent: deal.agent
                                    }}
                                    defaultFilter={`deal_id:${deal.id}`}
                                    options={[
                                        {
                                            label: 'Activities',
                                            fields: ['ACTIVITY_CREATED']
                                        },
                                        {
                                            label: 'Notes',
                                            fields: ['NOTE_CREATED']
                                        }
                                    ]}
                                    showDealSelection={false}
                                />
                            </div>

                        </div>

                        {
                            this.state.isEditDealModalVisible &&
                            <CreateEditDeal showModal={this.state.isEditDealModalVisible}
                                            close={this.closeEditDealModal}
                                            initialValues={deal}
                                            showPipelineSelection={false}

                            />
                        }

                        {
                            this.state.isEditDealModalForWonVisible &&
                            <CreateEditDeal showModal={this.state.isEditDealModalForWonVisible}
                                            close={this.closeEditDealModalWon}
                                            initialValues={{...deal, deal_status: "WON"}}
                                            showPipelineSelection={false}

                            />
                        }

                        {
                            this.state.isLostReasonModalVisible &&
                            <LostReason showModal={this.state.isLostReasonModalVisible}
                                        close={this.closeLostReasonModal}
                                        initialValues={{...deal, deal_status: "LOST"}}
                            />
                        }


                    </div>
                </div>
            )
        }
    }

    renderDealStatus() {

        return (
            <p>
                <button onClick={() => this.openEditDealModalWon()} type="button" className="btn btn-primary btn-xs">WON
                </button>
                <button onClick={() => this.openLostReasonModal()} type="button"
                        className="deal-danger-btn btn btn-danger btn-xs">LOST
                </button>
            </p>
        );

    }

    renderAgent() {
        const deal = this.getViewedDeal();

        if (deal.agent) {
            return (<Link className="text-navy"
                          to={"/user/" + deal.agent.id}>{deal.agent.firstName} {deal.agent.lastName}</Link>);
        } else {
            return (<em>Not set</em>);
        }
    }

    renderContacts() {
        const deal = this.getViewedDeal();

        if (deal.contact) {

            return (<Link className="text-navy" to={"/contact/" + deal.contact.id}>{deal.contact.name}</Link>);


        } else {
            return (<em>Not set</em>);
        }
    }

    renderLastUpdateDate() {
        const deal = this.getViewedDeal();

        if (deal.last_modified_date) {
            return (
                moment(deal.last_modified_date, "YYYY-MM-DDTHH:mm:ss.sss+-HH:mm").format("DD.MM.YYYY")
            );
        } else {
            return (<em>Not set</em>);
        }
    }

    renderPossibleCloseDate() {
        const deal = this.getViewedDeal();

        if (deal.possible_close_date) {
            return (
                moment(deal.possible_close_date, "YYYY-MM-DDTHH:mm:ss+-HH:mm").format("DD.MM.YYYY")
            );
        } else {
            return (<em>Not set</em>);
        }
    }

    renderCreatedDate() {
        const deal = this.getViewedDeal();

        if (deal.created_date) {
            return (
                moment(deal.created_date, "YYYY-MM-DDTHH:mm:ss.sss+-HH:mm").format("DD.MM.YYYY")
            );
        } else {
            return (<em>Not set</em>);
        }
    }

    renderDealValue() {
        const deal = this.getViewedDeal();

        if (deal.deal_value) {
            return (
                <b>{deal.deal_value.potentialValue}</b>
            );
        } else {
            return (<em>Not set</em>);
        }
    }
}

//         viewedDeal: detailedDealSelector(state, props.match.params.dealId)


function mapStateToProps(state, props) {
    return {
        dealStore: state.dealStore
    };
}

export default connect(mapStateToProps, {
    getDealById
})(DealDetail);
