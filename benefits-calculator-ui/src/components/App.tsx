import React from 'react';
import {Route} from "react-router-dom";
import Header from "./common/Header"
import EmployeeList from './employeeList/EmployeeList';

function App() {
  return (
    <div>
      <Header />
      <Route exact path="/" component={EmployeeList} />
    </div>
  );
}

export default App;
