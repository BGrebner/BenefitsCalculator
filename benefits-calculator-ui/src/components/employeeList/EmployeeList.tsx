import { Button, TableContainer, TableBody, TableRow, TableCell, Table, TableHead, IconButton } from "@material-ui/core";
import { Paper } from '@material-ui/core';
import { Contacts } from "@material-ui/icons";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Employee from "../../models/Employee";
import "./employeeList.css";
import {loadEmployees} from "../../redux/actions/employeeActions";
import { connect } from "react-redux";


const EmployeeList: React.FC<{employees: Array<Employee>, loadEmployees: Function}> = ({employees, loadEmployees}) => {
    useEffect(() => {
        if(employees.length === 0) {
            loadEmployees();
        }
    }, [employees.length]);

    return (
    <div>
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
                <TableBody>
                    {employees?.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.firstName}</TableCell>
                            <TableCell>{employee.lastName}</TableCell>
                            <TableCell align="right">
                                <IconButton color="primary" aria-label="show dependents" component="span">
                                    <Contacts />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>    
            </Table>
        </TableContainer>

        <Link to={"/employee"}>
            <Button className="float-right" variant="contained" color="primary">Add Employee</Button>
        </Link>                    
    </div>
)};

function mapStateToProps(state: any) {
    return { employees: state.employees };
}

const mapDispatchToProps = {
    loadEmployees
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);