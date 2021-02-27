import { Button } from "@material-ui/core";
import React from "react";
import "./employeeList.css";

const EmployeeList = () => (
    <div id="employeeList">
        <h1 className="centered">Employees</h1>

        <Button className="float-right" variant="contained" color="primary">Add Employee</Button>
    </div>
);

export default EmployeeList;