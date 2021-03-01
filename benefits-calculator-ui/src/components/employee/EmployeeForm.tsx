import { Button, TextField, Table, TableContainer, TableBody, TableRow, TableCell, TableHead } from "@material-ui/core";
import { Paper } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useState } from "react";
import { connect } from "react-redux";
import Employee from "../../models/Employee";
import Person from "../../models/Person";
import "./employeeForm.css";


export const EmployeeForm: React.FC<{employee: Employee, benefitCostPreview: number}> = ({employee: initialEmployee, benefitCostPreview}) => {
    const [employee, setEmployee] = useState({...initialEmployee});
    const [errors, setErrors] = useState({} as any);

    const handleEmployeeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        if(value !== "") setErrors((previousError: any) => ({
            ...previousError,
            [name]: undefined
        }));

        setEmployee(previousEmployee => ({
            ...previousEmployee,
            [name]: value
        }));
    }

    const handleDependentChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const {name, value} = event.target;

        setEmployee(previousEmployee => {
            const numberOfDependents = previousEmployee.dependents.length;
            const newDependent = {...previousEmployee.dependents[index], [name]: value};
            const newDependents = [...previousEmployee.dependents.slice(0, index), newDependent, ...previousEmployee.dependents.slice(index + 1, numberOfDependents - index)]
            
            return ({
                ...previousEmployee,
                dependents: newDependents
            });
        });
    }

    const handleAddDependent = () => {
        setEmployee(previousEmployee => {
            const newDependents = [...previousEmployee.dependents, {firstName: "", lastName: ""}];
            return ({
                ...previousEmployee,
                dependents: newDependents
            });
        });
    }

    const formIsValid = () => {
        const currentErrors: any = {};
        if(employee.firstName === "") currentErrors.firstName = true;
        if(employee.lastName === "") currentErrors.lastName = true;
        employee.dependents.forEach((dependent, index) => {
            if(dependent.firstName === "") currentErrors[`dependent${index}FirstName`] = true;
            if(dependent.lastName === "") currentErrors[`dependent${index}LastName`] = true;
        });

        setErrors(currentErrors);

        return Object.keys(currentErrors).length === 0;
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!formIsValid()) return;
    }


    return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <h2>New Employee</h2>
        <div className="employeeInfo">
            <TextField error={errors.firstName} inputProps={{"data-testid": "firstName"}} name="firstName" label="First Name" onChange={handleEmployeeChange} value={employee.firstName} />
            <TextField error={errors.lastName} inputProps={{"data-testid": "lastName"}} name="lastName" label="Last Name" onChange={handleEmployeeChange} value={employee.lastName}/>
        </div>
        <br/>
        <TableContainer className="dependentsTable" component={Paper}>
            <Table size="small" aria-label="dependents">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <h3>Dependents</h3>
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employee.dependents.map((dependent, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <TextField error={errors[`dependent${index}FirstName`]} inputProps={{"data-testid": `dependent${index}FirstName`}} name="firstName" label="First Name" onChange={(e: ChangeEvent<HTMLInputElement>) => handleDependentChange(e, index)} value={dependent.firstName} />
                            </TableCell>
                            <TableCell>
                                <TextField error={errors[`dependent${index}LastName`]} inputProps={{"data-testid": `dependent${index}LastName`}} name="lastName" label="Last Name" onChange={(e: ChangeEvent<HTMLInputElement>) => handleDependentChange(e, index)} value={dependent.lastName} />
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="right"><Button variant="contained" color="primary" name="addDependent" onClick={handleAddDependent}>Add Dependent</Button></TableCell>
                    </TableRow>
                </TableBody>    
            </Table>
        </TableContainer>

        {
            benefitCostPreview > 0 &&
            (<div id="benefitPreview">
                <p>Benefit Cost Preview: {`$${benefitCostPreview}`}</p>
            </div>)
        }
        {
            Object.keys(errors).length !== 0 &&
            <div className="error-message">All name fields must be entered to submit.</div>
        }
        <br/>
        <Button variant="contained" name="addEmployee" id="addEmployee" type="submit" color="primary">Submit</Button>
    </form>
)};

function mapStateToProps(state: any) {
    return {
        employee: {
            firstName: "",
            lastName: "",
            dependents: [] as Array<Person>
        },
        benefitCostPreview: 0
    }
}

export default connect(mapStateToProps)(EmployeeForm);