import * as types from "../actions/actionTypes";
export default function benefitsPreviewReducer(state = {}, action: any) {
    switch(action.type) {
        case types.LOAD_BENEFITS_PREVIEW_SUCCESS:
            return action.benefitsPreview;
        default:
            return state;
    }
}