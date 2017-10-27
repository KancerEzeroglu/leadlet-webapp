import {pipelineConstants} from "../_constants/pipeline.constants";

export function getAll(filter={}) {
    return dispatch => {
        dispatch(request());

        /*
        contactService.getAll(filter + ",type:PERSON")
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
            */
        dispatch(success());

    };

    function request() { return { type: pipelineConstants.GETALL_REQUEST } }
    function success(data) { return { type: pipelineConstants.GETALL_SUCCESS } }
    function failure(error) { return { type: pipelineConstants.GETALL_FAILURE, error } }

}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        dispatch(success(id));

        /*
        contactService.delete(id)
            .then(
                contact => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
            */
    };

    function request(id) { return { type: pipelineConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: pipelineConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: pipelineConstants.DELETE_FAILURE, id, error } }
}