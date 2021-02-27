import React from "react"; 
import {cleanup, render} from "@testing-library/react"; 
import EmployeeList from "./EmployeeList"; 
import Employee from "../../models/Employee";
 
afterEach(cleanup);

function renderEmployeeList(args?: any) { 
    let defaultProps = {
        employees: []
    }; 
 
    const props = {...defaultProps, ...args}; 
    return render(<EmployeeList {...props} />); 
}

it('contains add employee button', () => {
    const { getByText } = renderEmployeeList();

    getByText("Add Employee");
});

it('contains employee table', () => {
    const { getByText } = renderEmployeeList();

    getByText("First Name");
    getByText("Last Name");
    getByText("Show Dependents")
});

it('lists employees', () => {
    const employees: Array<Employee> = [
        {id: 1, firstName: "Luke", lastName: "Skywalker"},
        {id: 2, firstName: "Hans", lastName: "Solo"}
    ];

    const {getByText} = renderEmployeeList({employees: employees});
    getByText(employees[0].firstName);
    getByText(employees[0].lastName);
    getByText(employees[1].firstName);
    getByText(employees[1].lastName);
});