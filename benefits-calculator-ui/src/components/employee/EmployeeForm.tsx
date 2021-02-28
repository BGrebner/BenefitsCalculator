import { Button, TextField, Table, TableContainer, TableBody, TableRow, TableCell, TableHead } from "@material-ui/core";
import { Paper } from '@material-ui/core';
import React, { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import Employee from "../../models/Employee";
import Person from "../../models/Person";
import "./employeeForm.css";


export const EmployeeForm: React.FC<{employee: Employee}> = ({employee: initialEmployee}) => {
    const [employee, setEmployee] = useState({...initialEmployee});

    const handleEmployeeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

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


    return (
    <form noValidate autoComplete="off">
        <h2>New Employee</h2>
        <div className="employeeInfo">
            <TextField inputProps={{"data-testid": "firstName"}} name="firstName" label="First Name" onChange={handleEmployeeChange} value={employee.firstName} />
            <TextField inputProps={{"data-testid": "lastName"}} name="lastName" label="Last Name" onChange={handleEmployeeChange} value={employee.lastName}/>
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
                                <TextField inputProps={{"data-testid": `dependent${index}FirstName`}} name="firstName" label="First Name" onChange={(e: ChangeEvent<HTMLInputElement>) => handleDependentChange(e, index)} value={dependent.firstName} />
                            </TableCell>
                            <TableCell>
                                <TextField inputProps={{"data-testid": `dependent${index}LastName`}} name="lastName" label="Last Name" onChange={(e: ChangeEvent<HTMLInputElement>) => handleDependentChange(e, index)} value={dependent.lastName} />
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
    </form>
)};

function mapStateToProps(state: any) {
    return {
        employee: {
            firstName: "",
            lastName: "",
            dependents: [] as Array<Person>
        }
    }
}

export default connect(mapStateToProps)(EmployeeForm);