import React, {Component} from 'react';
import '../../../node_modules/fullcalendar/dist/fullcalendar.css';
import connect from "react-redux/es/connect/connect";
import Timeline from "../Timeline/Timeline";
import moment from 'moment';
import EditOrCreateActivity from "../Activity/EditOrCreateActivity";
import {getUser} from "../../actions/user.actions";
import {getTimelineByPersonId, getTimelineByPersonIdAndRefresh} from "../../actions/timeline.actions";
import {createNote} from "../../actions/note.actions";
import CreateEditAgent from "./CreateEditAgent";


class AgentDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            isAgentModalVisible: false,
            isActivityModalVisible: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openActivityModal = this.openActivityModal.bind(this);
        this.closeActivityModal = this.closeActivityModal.bind(this);
        this.openEditAgentModal = this.openEditAgentModal.bind(this);
        this.closeAgentModal = this.closeAgentModal.bind(this);
        this.refreshTimeline = this.refreshTimeline.bind(this);
    }

    closeAgentModal() {
        this.setState({
            isAgentModalVisible: false
        });
    }

    openEditAgentModal() {
        this.setState({
            isAgentModalVisible: true
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Note Event: ", event.target);
        this.props.createNote({
            content: this.state.value,
            userId: this.props.viewedUser.id
        }, () => this.props.getTimelineByPersonIdAndRefresh(null, null, null, this.props.match.params.userId));
        this.setState({value: ''});
    }

    componentDidMount() {
        this.props.getUser(this.props.match.params.userId);
    }

    openActivityModal() {
        this.setState({isActivityModalVisible: true});
    }

    closeActivityModal() {
        this.setState({isActivityModalVisible: false});
    }

    refreshTimeline() {
        this.props.getTimelineByPersonIdAndRefresh(null, null, null, this.props.viewedUser.id)
    }

    render() {
        const user = this.props.viewedUser;
        if (!user) {
            return (
                <em>Loading details for {this.props.match.params.userId}</em>
            );
        } else {

            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="ibox">
                                <div className="ibox-content info-card">
                                    <div className="row">
                                        <dl className="dl-horizontal">
                                            <dt>First Name:</dt>
                                            <dd>{user.firstName}</dd>
                                            <dt>Last Name:</dt>
                                            <dd>{user.lastName}</dd>
                                            <dt>Email:</dt>
                                            <dd>{user.login}</dd>
                                        </dl>
                                    </div>
                                    <div className="row">
                                        <button onClick={this.openEditAgentModal}
                                                className="btn btn-white btn-xs pull-right">Edit Agent
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="ibox">
                                <div className="ibox-content">
                                    <div className="row m-t-sm">
                                        <div className="col-lg-12">
                                            <div className="panel blank-panel">
                                                <div className="panel-heading">
                                                    <div className="panel-options">
                                                        <ul className="nav nav-tabs">
                                                            <li className="active"><a href="#tab-1"
                                                                                      data-toggle="tab">Add
                                                                a Note</a></li>
                                                            <li className="disabled"><a href="#tab-2">Send an
                                                                Email</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="panel-body">
                                                    <div className="tab-content">
                                                        <div className="tab-pane active" id="tab-1">
                                                            <div className="note-form">
                                                                <form onSubmit={this.handleSubmit}>
                                                                    <div className="form-group">
                                                                            <textarea placeholder="Please enter a note."
                                                                                      className="form-control"
                                                                                      value={this.state.value}
                                                                                      onChange={this.handleChange}
                                                                            />
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <button type="submit"
                                                                                className="btn btn-sm btn-primary m-t-n-xs">
                                                                            <strong>Save</strong></button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane" id="tab-2">

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ibox">
                                <Timeline
                                    pageSize={5}
                                    getTimelineItems={this.props.getTimelineByPersonId}
                                    itemId={this.props.viewedUser.id}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="ibox">
                                <div className="ibox-title">
                                    <i className="fa fa-plus pull-right" aria-hidden="true"
                                       onClick={() => this.openActivityModal({
                                           start: moment(),
                                           end: moment()
                                       })}
                                    />
                                    <h5>Activities</h5>
                                </div>
                                <div className="ibox-content">
                                    <div id="contact-calendar"/>
                                </div>
                            </div>
                        </div>

                        {
                            this.state.isAgentModalVisible &&
                            <CreateEditAgent showModal={this.state.isAgentModalVisible}
                                         close={this.closeAgentModal}
                            />
                        }
                        {
                            this.state.isActivityModalVisible &&
                            <EditOrCreateActivity showModal={this.state.isActivityModalVisible}
                                                  close={this.closeActivityModal}
                                                  initialValues={{userId: this.props.viewedUser.id}}
                                                  createCallback={this.refreshTimeline}
                                                  showDealSelection={true} // ????
                            />
                        }


                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        viewedUser: state.users.viewedUser
    };
}

export default connect(mapStateToProps, {
    getUser,
    createNote,
    getTimelineByPersonId,
    getTimelineByPersonIdAndRefresh
})(AgentDetail);
