/** @format */

// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
/** @format */

// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
    this.getOfficeNumber = function () {
      return this.officeNumber;
    };
    this.getRole = function () {
      return "Manager";
    };
  }
}

module.exports = Manager;
