import Person from "./person.js";

class Employee extends Person { // extends 繼承的關鍵字
    constructor(name = '', age = 20, employee_id = "") {
        super(name, age);
        this.employee_id = employee_id;
    }
    toJSON() {
        const { name, age, employee_id } = this;
        return { name, age, employee_id };
    }
}

export default Employee;