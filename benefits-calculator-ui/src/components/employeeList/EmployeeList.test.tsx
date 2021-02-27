import React from "react"; 
import {cleanup, render} from "@testing-library/react"; 
import EmployeeList from "./EmployeeList"; 
 
afterEach(cleanup);

function renderEmployeeList(args?: any) { 
    let defaultProps = {}; 
 
    const props = {...defaultProps, ...args}; 
    return render(<EmployeeList {...props} />); 
}

it('contains add employee button', () => {
    const { getByText } = renderEmployeeList();

    getByText("Add Employee");
});