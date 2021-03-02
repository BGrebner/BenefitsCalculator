import * as types from "../actions/actionTypes";

export default function employeeReducer(state = [], action: any) {
    switch(action.type) {
        case types.LOAD_EMPLOYEES_SUCCESS:
            return action.employees;
        case types.CREATE_EMPLOYEE_SUCCESS:
            return [...state, { ...action.employee }];
    }
}