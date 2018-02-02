import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import Modal from '../../modal-shim';
import {connect} from 'react-redux';
import {create, update, _delete} from '../../actions/activity.actions';
import {ButtonToolbar} from "react-bootstrap";
import SweetAlert from 'sweetalert-react';
import ToggleButtonGroup from "react-bootstrap/es/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/es/ToggleButton";
import DropdownButton from "react-bootstrap/es/DropdownButton";
import MenuItem from "react-bootstrap/es/MenuItem";
import formValueSelector from "redux-form/es/formValueSelector";
import renderDateTimePicker from "../../formUtils/renderDateTimePicker";
import MapWithASearchBox from "../Map/MapWithASearchBox";
import renderInputField from "../../formUtils/renderInputField";
import renderAsyncSelectField from "../../formUtils/renderAsyncSelectField";
import {loadDeal, loadOrganization, loadPerson, loadUser} from "../../formUtils/form.actions";

const validate = values => {
    const errors = {}

    /*  title validation */
    if (!values.title) {
        errors.title = 'Please write a title'
    } else if (values.title.length >= 64) {
        errors.title = 'Must be 64 characters or less!'
    }

    /* activity type */
    if (!values.activityType) {
        errors.title = "Please select a type"
    }

    /* start date */
    if (!values.start) {
        errors.start = "Please select a start date"
    }

    /* end date */
    if (!values.end) {
        errors.end = "Please select an end date"
    }

    return errors
};


const renderTypeField = ({
                             input,
                             meta: {touched, error}
                         }) => (
    <div className="form-group">
        <ButtonToolbar>
            <ToggleButtonGroup {...input} type="radio" value={input.value}>
                <ToggleButton value="CALL">CALL <i className="fa fa-phone"/></ToggleButton>
                <ToggleButton value="MEETING">MEETING <i className="fa fa-users"/></ToggleButton>
                <ToggleButton value="TASK">TASK <i className="fa fa-clock-o"/></ToggleButton>
                <ToggleButton value="DEADLINE">DEADLINE <i className="fa fa-flag"/></ToggleButton>
                <ToggleButton value="EMAIL">EMAIL <i className="fa fa-paper-plane"/></ToggleButton>
            </ToggleButtonGroup>
        </ButtonToolbar>

        <span className="help-block m-b-none">{touched &&
        ((error && <span>{error}</span>))}
        </span>
    </div>
)


class EditOrCreateActivity extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.confirmDeleteActivity = this.confirmDeleteActivity.bind(this);
        this.cancelDeleteActivity = this.cancelDeleteActivity.bind(this);
        this.onDeleteActivity = this.onDeleteActivity.bind(this);
        this.onClose = this.onClose.bind(this);

        this.state = {
            showDeleteDialog: false,
        };
    }


    confirmDeleteActivity() {
        this.props._delete(this.props.initialValues.id);
        this.setState({showDeleteDialog: false});
        this.props.close();
    }

    cancelDeleteActivity() {
        this.setState({showDeleteDialog: false});
    }

    onDeleteActivity(event) {
        event.preventDefault();
        this.setState({showDeleteDialog: true});
    }

    onSubmit = (formValue) => {

        let activity = {};
        activity.id = formValue.id;
        activity.start = formValue.start ? formValue.start._d : '';
        activity.end = formValue.end ? formValue.end._d : '';
        activity.memo = formValue.memo;
        activity.type = formValue.activityType;
        activity.title = formValue.title;
        activity.personId = formValue.personId;
        activity.organizationId = formValue.organizationId;
        activity.userId = formValue.userId;
        activity.dealId = formValue.dealId;
        activity.location = formValue.location;

        if (this.props.initialValues && this.props.initialValues.id) {
            this.props.update(activity);
        } else {
            this.props.create(activity);
        }
        this.props.close();
    }

    onClose() {
        this.setState({
            startDate: null
        });
        this.props.reset();
        this.props.close();
    }

    render() {
        const {handleSubmit, initialValues, submitting, pristine, valid} = this.props;

        let title = "Create";
        if (initialValues && initialValues.title) {
            title = "Update";
        }

        return (
            <Modal show={this.props.showModal} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title} New Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Field
                            name="activityType"
                            component={renderTypeField}
                            label="Activity Type"
                        />
                        <Field
                            name="title"
                            type="text"
                            component={renderInputField}
                            label="Title"
                        />
                        <div className="form-horizontal">
                            <div className="form-group">
                                <Field
                                    label="Start Date"
                                    name="start"
                                    maximumDate={this.props.end}
                                    component={renderDateTimePicker}
                                />
                            </div>
                            <div className="form-group">
                                <Field
                                    label="End Date"
                                    name="end"
                                    minimumDate={this.props.start}
                                    component={renderDateTimePicker}
                                />
                            </div>
                        </div>

                        {this.props.showDealSelection &&
                        <Field
                            name="dealId"
                            label="Deal"
                            placeholder="Select deal"
                            component={renderAsyncSelectField}
                            loadOptions={loadDeal}
                        />
                        }

                        {this.props.showUserSelection &&
                        <Field
                            name="userId"
                            label="Owner"
                            placeholder="Select deal owner"
                            component={renderAsyncSelectField}
                            loadOptions={loadUser}
                        />
                        }

                        {this.props.showPersonSelection &&
                            <Field
                                name="personId"
                                label="Contact Person"
                                placeholder="Select contact person"
                                component={renderAsyncSelectField}
                                loadOptions={loadPerson}
                            />
                        }

                        {this.props.showOrganizationSelection &&
                            <Field
                                name="organizationId"
                                label="Contact Organization"
                                placeholder="Select contact organization"
                                component={renderAsyncSelectField}
                                loadOptions={loadOrganization}
                            />
                        }

                        <Field
                            name="location"
                            label="Location"
                            component={MapWithASearchBox}
                        />

                    </form>
                    <div>
                        <SweetAlert
                            title="Are you sure?"
                            text="You will not be able to recover this imaginary file!"
                            type="warning"
                            showCancelButton={true}
                            confirmButtonColor="#DD6B55"
                            confirmButtonText="Yes, delete it!"
                            show={this.state.showDeleteDialog}
                            onConfirm={this.confirmDeleteActivity}
                            onCancel={this.cancelDeleteActivity}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <div className="row">
                        <div className="col-md-1">
                            <DropdownButton noCaret id="detail-operations" className="btn-primary" title="...">
                                <MenuItem href="#" onClick={this.onDeleteActivity}>Delete</MenuItem>
                            </DropdownButton>
                        </div>
                        <div className="col-md-6 pull-right">
                            <div className="pull-right activity-detail-submit">
                                <button className="btn btn-sm btn-default" onClick={this.props.close}>Cancel</button>
                                <button className="btn btn-sm btn-primary"
                                        disabled={pristine || submitting || !valid}
                                        onClick={handleSubmit(this.onSubmit)}>
                                    <strong>Submit</strong></button>
                            </div>
                        </div>
                    </div>

                </Modal.Footer>
            </Modal>
        );
    }
}

EditOrCreateActivity.defaultProps = {
    showPersonSelection: true,
    showOrganizationSelection: true,
    showDealSelection: true,
    showUserSelection: true
}


const selector = formValueSelector('createEditActivityForm');

function mapStateToProps(state) {
    return {
        persons: state.persons,
        organizations: state.organizations,
        start: selector(state, 'start'),
        end: selector(state, 'end'),
        person: selector(state, 'person'),
        organization: selector(state, 'organization'),
        location: selector(state, 'location')
    };
}

export default reduxForm({
    form: 'createEditActivityForm',
    validate,
    enableReinitialize: true
})(
    connect(mapStateToProps, {
        create,
        update,
        _delete
    })(EditOrCreateActivity)
);