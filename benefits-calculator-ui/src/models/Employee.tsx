import Person from "./Person";

export default interface Employee extends Person {
    id?: number;
    firstName: string;
    lastName: string;
    dependents: Array<Person>;
}