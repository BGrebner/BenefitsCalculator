import { Button, TextField } from "@material-ui/core";
import React from "react";
import "./employeeForm.css";

const EmployeeForm = () => (
    <form noValidate autoComplete="off">
        <h2>New Employee</h2>
        <TextField label="First Name" />
        <TextField label="Last Name" />
        <br/>
        <Button className="float-right" variant="contained" color="primary">Add Dependent</Button>
    </form>
);

export default EmployeeForm