const db = require("../config/connection");

class SqlQueries {
  constructor() {
    this.db = db;
  }
  viewEmployees = function () {
    return `SELECT * FROM employee`;
  };
  updateEmployee = function (employee, role) {
    return `UPDATE employee SET role_id = ${role} WHERE id = ${employee}`;
  };
  roleNames = function () {
    return `SELECT * FROM roles`;
  };
  viewRoles = function () {
    return `SELECT r.title, r.salary, d.dept_name FROM roles r JOIN department d ON d.id = r.department_id`;
  };
  viewDepartment = function () {
    return `SELECT * FROM department`;
  };
  getManager = function () {
    return `SELECT * FROM employee\
      WHERE manager_id IS NULL`;
  };
  addEmployee = function (firstName, lastName, roleID, managerID) {
    return `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${roleID}, ${managerID})`;
  };
  addRole = function (title, salary, department_id, isManagement) {
    return `INSERT INTO roles(title, salary, department_id, isManagement) VALUES ("${title}", ${salary}, ${department_id}, ${isManagement})`;
  };
  addDepartment = function (department) {
    return `INSERT INTO department (dept_name) VALUES ("${department}")`;
  };
}

module.exports = new SqlQueries(db);
