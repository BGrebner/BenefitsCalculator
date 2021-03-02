import Employee from "../models/Employee";
import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/employee/";

export function getEmployees() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveEmployee(employee: Employee) {
    return fetch((baseUrl), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(employee)
    })
    .then(handleResponse)
    .catch(handleError);
}