import React from "react"; 
import {cleanup, fireEvent, render} from "@testing-library/react"; 
import { EmployeeForm } from "./EmployeeForm";
import Employee from "../../models/Employee";
import Person from "../../models/Person";

afterEach(cleanup);

function renderEmployeeForm(args?: any) { 
    let defaultProps = {
        employee: {
            firstName: "",
            lastName: "",
            dependents: []
        },
        benefitCostPreview: 0
    }; 
 
    const props = {...defaultProps, ...args}; 
    return render(<EmployeeForm {...props} />); 
}

it('should contain add dependent button', () => {
    const { getByText } = renderEmployeeForm();

    getByText("Add Dependent");
});

it('should maintain state', () => {
    const currentState: Employee = createInitialState();
    const dependents: Array<Person> = currentState.dependents;

    const { getByDisplayValue } = renderEmployeeForm({employee: currentState});

    getByDisplayValue(currentState.firstName);
    getByDisplayValue(currentState.lastName);
    getByDisplayValue(dependents[0].firstName);
    getByDisplayValue(dependents[0].lastName);
    getByDisplayValue(dependents[1].firstName);
    getByDisplayValue(dependents[1].lastName);
});

describe('updating employee state', () => {
    it('should update employee first name', () => {
        const { getByTestId } = renderEmployeeForm();
        const expectedFirstName = "Anakin";

        const input = getByTestId("firstName") as HTMLInputElement;

        fireEvent.change(input, { target: { value: expectedFirstName}});

        expect(input.value).toBe(expectedFirstName);
    });

    it('should update employee last name', () => {
        const { getByTestId } = renderEmployeeForm();
        const expectedLastName = "Skywalker";

        const input = getByTestId("lastName") as HTMLInputElement;

        fireEvent.change(input, { target: { value: expectedLastName}});

        expect(input.value).toBe(expectedLastName);
    });
});

describe('dependents', () => {
    it('should add blank dependent when clicking add dependent', () => {
        const { getByText, getByTestId } = renderEmployeeForm();

        const addDependentButton = getByText("Add Dependent");

        fireEvent.click(addDependentButton);

        const firstNameInput = getByTestId("dependent0FirstName") as HTMLInputElement;
        const lastNameInput = getByTestId("dependent0LastName") as HTMLInputElement;

        expect(firstNameInput.value).toBe("");
        expect(lastNameInput.value).toBe("");
    });

    it('should update dependent first name', () => {
        const initialState = createInitialState();
        const expectedFirstName = "Jedi"

        const { getByTestId } = renderEmployeeForm({employee: initialState});

        const input = getByTestId("dependent0FirstName") as HTMLInputElement;

        fireEvent.change(input, { target: { value: expectedFirstName}});

        expect(input.value).toBe(expectedFirstName);
    });

    it('should update dependent last name', () => {
        const initialState = createInitialState();
        const expectedLastName = "Master";

        const { getByTestId } = renderEmployeeForm({employee: initialState});

        const input = getByTestId("dependent0LastName") as HTMLInputElement;

        fireEvent.change(input, { target: { value: expectedLastName}});

        expect(input.value).toBe(expectedLastName);
    });
});

describe('benefits preview', () => {
    it('should show cost preview', () => {
        const {getByText} = renderEmployeeForm({benefitCostPreview: 2000});
    
        getByText("Benefit Cost Preview: $2000");
    });

    it('should hide benefits preview when 0', () => {
        const {getByText} = renderEmployeeForm({benefitCostPreview: 0});
    
        const element = getByText("Benefit Cost Preview: $2000");
        
        expect(element).not.toBeInTheDocument();
    });
});

const createInitialState: () => Employee = () => {
    const dependents: Array<Person> = [
        {firstName: "Luke", lastName: "Skywalker"},
        {firstName: "Leia", lastName: "Organa"}
    ];
    const currentState: Employee = {
        firstName: "Darth",
        lastName: "Vader",
        dependents: dependents
    };
    return currentState;
}