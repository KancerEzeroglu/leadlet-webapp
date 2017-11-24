import {activityConstants} from "../constants/activity.constants";

export function createActivity(activity) {
    return {
        type: activityConstants.ACTIVITY_CREATE_SUCCESS,
        payload: activity
    }
}

export function getAllActivity() {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    return {
        type: activityConstants.ACTIVITY_GETALL_SUCCESS,
        events: [
            {
                title: 'All Day Event',
                start: new Date(y, m, 1),
                description: 'bla bla bla',
                type: 'MEETING'
            },
            {
                title: 'Long Event',
                start: new Date(y, m, d - 5),
                end: new Date(y, m, d - 2),
                description: 'bla bla bla',
                type: 'MEETING'
            },
            {
                title: 'Repeating Event',
                start: new Date(y, m, d - 3, 16, 0),
                description: 'bla bla bla',
                type: 'MEETING'
            },
            {
                title: 'Repeating Event',
                start: new Date(y, m, d + 4, 16, 0),
                description: 'bla bla bla',
                type: 'CALL'
            },
            {
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                description: 'bla bla bla',
                type: 'MEETING'
            },
            {
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                description: 'bla bla bla',
                type: 'MEETING'
            },
            {
                title: 'Call John',
                start: new Date(y, m, d + 1, 19, 0),
                end: new Date(y, m, d + 1, 22, 30),
                description: 'bla bla bla',
                type: 'CALL'
            },
            {
                title: 'Click for Google',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                description: 'bla bla bla',
                type: 'TASK'
            }
        ]
    }
}

export function updateActivity(activity) {
    return {
        type: activityConstants.UPDATE_SUCCESS,
        payload: activity
    }
}

export function deleteActivity(activityTitle) {
    return {
        type: activityConstants.DELETE_SUCCESS,
        payload: activityTitle
    }
}

export function getFilterActivity(selectedType) {
    return {
        type: activityConstants.FILTER_SUCCES,
        payload: selectedType
    }
}