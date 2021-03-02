import Employee from "../models/Employee";
import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/BenefitsPreview/";

export function getBenefitsPreview(employee: Employee) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(employee)
  })
    .then(handleResponse)
    .catch(handleError);
}