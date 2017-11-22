import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import draggable from '../../../node_modules/jquery-ui/ui/widgets/draggable';
import fullCalendar from 'fullcalendar';
import ActivityDetail from "./ActivityDetail";
import {getAllActivity} from "../../actions/activity.actions";

class Activity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            activitySelectedForEdit: null
        };

        this.openActivityModal = this.openActivityModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openActivityModal(activity) {
        this.setState({showModal: true});
        this.setState({activitySelectedForEdit: activity});
    }

    closeModal() {
        this.setState({showModal: false});
    }

    componentDidMount() {

        $(document).ready(function () {
            $('#external-events div.external-event').each(function (index, element) {

                // store data so the calendar knows to render an event upon drop
                $(element).data('event', {
                    title: $.trim($(element).text()), // use the element's text as the event title
                    stick: true // maintain when user navigates (see docs on the renderEvent method)
                });

                // make the event draggable using jQuery UI
                $(element).draggable({
                    zIndex: 1111999,
                    revert: true,      // will cause the event to go back to its
                    revertDuration: 0  //  original position after the drag
                });

            });

        });

        this.props.getAllActivity();
    }

    componentDidUpdate() {

        const events = this.props.activity.items;
        console.log("ALL EVENTS: ", events);

        //TODO: fullCalendar her update de render olmamalı.
        if (events) {
            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                editable: true,
                droppable: true, // this allows things to be dropped onto the calendar
                drop: function () {
                    // is the "remove after drop" checkbox checked?
                    if ($('#drop-remove').is(':checked')) {
                        // if so, remove the element from the "Draggable Events" list
                        $(this).remove();
                    }
                },
                events
            });
        }
    }

    render() {
        return (
            <div className="wrapper wrapper-content">
                <div className="row animated fadeInDown">
                    <div>
                        <div>
                            <p className="pull-right ">
                                <button className="btn btn-primary btn-sm" type="button"
                                        onClick={this.openActivityModal}><i
                                    className="fa fa-plus"></i>&nbsp;New Activity
                                </button>
                            </p>
                        </div>
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>Striped Table </h5>
                                <div className="ibox-tools">
                                    <a className="collapse-link">
                                        <i className="fa fa-chevron-up"></i>
                                    </a>
                                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                        <i className="fa fa-wrench"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-user">
                                        <li><a href="#">Config option 1</a>
                                        </li>
                                        <li><a href="#">Config option 2</a>
                                        </li>
                                    </ul>
                                    <a className="close-link">
                                        <i className="fa fa-times"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="ibox-content">
                                <div id="calendar"></div>
                            </div>
                        </div>

                        <div>
                            <ActivityDetail showModal={this.state.showModal}
                                            close={this.closeModal}
                                            contact={this.state.activitySelectedForEdit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activity: state.activity
    }
}

export default connect(mapStateToProps, {getAllActivity})(Activity);
