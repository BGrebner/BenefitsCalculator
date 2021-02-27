import React from 'react';
import {Route} from "react-router-dom";
import Header from "./common/Header"
import EmployeeForm from './employee/EmployeeForm';
import EmployeeList from './employeeList/EmployeeList';

function App() {
  return (
    <div>
      <Header />
      <Route exact path="/" component={EmployeeList} />
      <Route path="/employee" component={EmployeeForm} />
    </div>
  );
}

export default App;
