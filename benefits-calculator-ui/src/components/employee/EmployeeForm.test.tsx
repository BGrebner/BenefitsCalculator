import React from "react"; 
import {cleanup, render} from "@testing-library/react"; 
import EmployeeForm from "./EmployeeForm";

 
afterEach(cleanup);

function renderEmployeeForm(args?: any) { 
    let defaultProps = {
    }; 
 
    const props = {...defaultProps, ...args}; 
    return render(<EmployeeForm {...props} />); 
}

it('contains add dependent button', () => {
    const { getByText } = renderEmployeeForm();

    getByText("Add Dependent");
});