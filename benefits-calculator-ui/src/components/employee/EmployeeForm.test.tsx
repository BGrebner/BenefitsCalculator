import React from "react"; 
import {cleanup, render} from "@testing-library/react"; 
import EmployeeForm from "./EmployeeForm";
import Employee from "../../models/Employee";
import Person from "../../models/Person";

 
afterEach(cleanup);

function renderEmployeeForm(args?: any) { 
    let defaultProps = {
        employee: {}
    }; 
 
    const props = {...defaultProps, ...args}; 
    return render(<EmployeeForm {...props} />); 
}

it('contains add dependent button', () => {
    const { getByText } = renderEmployeeForm();

    getByText("Add Dependent");
});

it('maintains state', () => {
    const dependents: Array<Person> = [
        {firstName: "Luke", lastName: "Skywalker"},
        {firstName: "Leia", lastName: "Organa"}
    ];
    const currentState: Employee = {
        firstName: "Darth",
        lastName: "Vader",
        dependents: dependents
    };

    const { getByDisplayValue } = renderEmployeeForm({employee: currentState});

    getByDisplayValue(currentState.firstName);
    getByDisplayValue(currentState.lastName);
    getByDisplayValue(dependents[0].firstName);
    getByDisplayValue(dependents[0].lastName);
    getByDisplayValue(dependents[1].firstName);
    getByDisplayValue(dependents[1].lastName);
});