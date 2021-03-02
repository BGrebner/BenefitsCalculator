import Employee from "../models/Employee";
import { handleResponse, handleError } from "./apiUtils";
const baseUrl = new URL("employee", process.env.REACT_APP_API_URL);

export function getEmployees(): Promise<Array<Employee>> {
  return fetch(baseUrl.href)
    .then(handleResponse)
    .catch(handleError);
}

export function saveEmployee(employee: Employee): Promise<Employee> {
    return fetch(baseUrl.href, {
        method: "POST",
        headers: { "content-type": "application/json"},
        body: JSON.stringify(employee)
    })
    .then(handleResponse)
    .catch(handleError);
}