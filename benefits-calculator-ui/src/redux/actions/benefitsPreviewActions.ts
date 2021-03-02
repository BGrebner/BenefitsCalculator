import * as types from "./actionTypes";
import * as benefitsPreviewApi from "../../api/benefitsPreviewApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import BenefitsPreview from "../../models/BenefitsPreview";
import Employee from "../../models/Employee";

export function loadBenefitsPreviewSuccess(benefitsPreview: BenefitsPreview) {
    return {type: types.LOAD_BENEFITS_PREVIEW_SUCCESS, benefitsPreview}
}

export function loadBenefitsPreview(employee: Employee){
    //eslint-disable-next-line no-unused-vars
    return function(dispatch: any, getState: any) {
        dispatch(beginApiCall());
        return benefitsPreviewApi.getBenefitsPreview(employee).then(
            benefitsPreview => dispatch(loadBenefitsPreviewSuccess(benefitsPreview))
        ).catch(error => {
            dispatch(apiCallError());
            throw error;
        });
    }
}