import React  from 'react';
import { connect } from 'react-redux';

import './App.css';
import TopMenuLayout from "./common/TopMenuLayout";
import { alertActions } from './actions';
import { LoginPage } from './components/Login';
import { RegisterPage } from './components/Register';
import { Switch, Route } from 'react-router-dom';
import {NotPermitted} from "./components/ErrorPages/NotPermitted";

var NotificationSystem = require('react-notification-system');

class App extends React.Component {
    _notificationSystem;

    componentDidUpdate(){
        if(this.props.alert.level){
            this._notificationSystem.addNotification({
                message: this.props.alert.message,
                level: this.props.alert.level,
                position: 'bl',
                autoDismiss: 5
            });
            this.props.dispatch(alertActions.clear());
        }
    }
    componentDidMount(){
        this._notificationSystem = this.refs.notificationSystem;
    }
    render() {
        return (
            [
                <NotificationSystem key="notificationSystem" ref="notificationSystem" />,
                <Switch key="appSwitch">
                    <Route exact={true} path="/login" component={LoginPage} />
                    <Route exact={true} path="/register" component={RegisterPage} />
                    <Route exact={true} path="/notpermitted" component={NotPermitted} />
                    <Route path="/" component={TopMenuLayout} />
                </Switch>
            ]
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert
    };
}

const connectedApp = connect(mapStateToProps, null, null, {
    pure: false
})(App);

export { connectedApp as App };