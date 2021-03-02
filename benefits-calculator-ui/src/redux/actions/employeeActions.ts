import Employee from "../../models/Employee";
import * as types from "./actionTypes";
import * as employeeApi from "../../api/employeeApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadEmployeesSuccess(employees: Array<Employee>) {
    return {type: types.LOAD_EMPLOYEES_SUCCESS, employees };
}

export function createEmployeeSuccess(employee: Employee) {
    return {type: types.CREATE_EMPLOYEE_SUCCESS, employee}
}

export function loadEmployees() {
    return function(dispatch: any) {
        dispatch(beginApiCall());
        return employeeApi.getEmployees().then(
            employees => { dispatch(loadEmployeesSuccess(employees))}
        ).catch(error => {
            dispatch(apiCallError());
            throw error;
        });
    }
}

export function createEmployee(employee: Employee) {
    //eslint-disable-next-line no-unused-vars
    return function(dispatch: any, getState: any) {
        dispatch(beginApiCall());
        return employeeApi.saveEmployee(employee)
            .then(savedEmployee => dispatch(createEmployeeSuccess(savedEmployee)))
            .catch(error => {
                dispatch(apiCallError());
                throw error;
        });
    }
};