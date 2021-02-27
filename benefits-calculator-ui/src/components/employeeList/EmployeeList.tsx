import { Button, TableContainer, TableBody, TableRow, TableCell, Table, TableHead } from "@material-ui/core";
import { Paper } from '@material-ui/core';
import React from "react";
import "./employeeList.css";


const EmployeeList = () => (
    <div id="employeeList">
        <h1 className="centered">Employees</h1>
        <TableContainer className="employeeListTable" component={Paper}>
            <Table size="small" aria-label="employees">
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell className="float-right">Show Dependents</TableCell>
                    </TableRow>
                </TableHead>    
            </Table>
        </TableContainer>

        <Button className="float-right" variant="contained" color="primary">Add Employee</Button>
    </div>
);

export default EmployeeList;