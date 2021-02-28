import React from 'react';
import {Route} from "react-router-dom";
import Header from "./common/Header"
import EmployeeForm from "./employee/EmployeeForm";
import EmployeeList from "./employeeList/EmployeeList";
import "./app.css";

function App() {
  return (
    <div>
      <Header />
      <div className="body">
        <Route exact path="/" component={EmployeeList} />
        <Route path="/employee" component={EmployeeForm} />
      </div>
    </div>
  );
}

export default App;
