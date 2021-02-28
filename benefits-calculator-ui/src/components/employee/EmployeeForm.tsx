import { Button, TextField, Table, TableContainer, TableBody, TableRow, TableCell, TableHead } from "@material-ui/core";
import { Paper } from '@material-ui/core';
import React, { useState } from "react";
import Employee from "../../models/Employee";
import "./employeeForm.css";


const EmployeeForm: React.FC<{employee: Employee}> = ({employee}) => {
    const [employeeState, setEmployee] = useState({...employee});

    return (
    <form noValidate autoComplete="off">
        <h2>New Employee</h2>
        <div className="employeeInfo">
            <TextField label="First Name" value={employeeState.firstName} />
            <TextField label="Last Name" value={employeeState.lastName}/>
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
                    {employeeState.dependents?.map((dependent) => (
                        <TableRow>
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

export default EmployeeForm