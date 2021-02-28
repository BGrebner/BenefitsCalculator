import { Button, TextField, Table, TableContainer, TableBody, TableRow, TableCell, TableHead } from "@material-ui/core";
import { Paper } from '@material-ui/core';
import React, { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import Employee from "../../models/Employee";
import Person from "../../models/Person";
import "./employeeForm.css";


export const EmployeeForm: React.FC<{employee: Employee}> = ({employee: initialEmployee}) => {
    const [employee, setEmployee] = useState({...initialEmployee});

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setEmployee(previousEmployee => ({
            ...previousEmployee,
            [name]: value
        }));
    }

    return (
    <form noValidate autoComplete="off">
        <h2>New Employee</h2>
        <div className="employeeInfo">
            <TextField inputProps={{"data-testid": "firstName"}} name="firstName" label="First Name" onChange={handleChange} value={employee.firstName} />
            <TextField inputProps={{"data-testid": "lastName"}} name="lastName" label="Last Name" onChange={handleChange} value={employee.lastName}/>
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
                    {employee.dependents?.map((dependent, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <TextField label="First Name" value={dependent.firstName} />
                            </TableCell>
                            <TableCell>
                                <TextField label="Last Name" value={dependent.lastName} />
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="right"><Button variant="contained" color="primary">Add Dependent</Button></TableCell>
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