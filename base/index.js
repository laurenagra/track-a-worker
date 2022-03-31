const inquirer = require("inquirer");
const db = require("../config/connection");
const cTable = require("console.table");
const SqlQueries = require("../db/sqlQueries");
const sql = new SqlQueries();

const initDb = () => {
  db.connect((err) => {
    if (err) throw err;
    console.log("connected to the database");
    console.log("Welcome to the employee management system");
  });
};

initDb();

getChoice = () => {
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "Add employee",
          "Update employee role",
          "View all roles",
          "Add role",
          "View all departments",
          "Add department",
          "Finished",
        ],
      },
    ])
    .then((response) => {
      const choice = response.choices[0];

      choice.indexOf("View") != -1
        ? viewTable(choice)
        : choice === "Add employee"
        ? addEmployee()
        : choice === "Update employee role"
        ? updateRole()
        : choice === "Add role"
        ? addRole()
        : choice === "Add department"
        ? addDepartment()
        : choice === "Finished"
        ? terminateApp()
        : console.log("error");
    });
};
viewTable = (choice) => {
  // console.log(`Choice: ${choice}`);
  let viewQuery = "";
  if (choice === "View all employees") {
    viewQuery = sql.viewEmployees();
  } else if (choice === "View all roles") {
    viewQuery = sql.viewRoles();
  } else {
    viewQuery = sql.viewDepartment();
  }
  if (viewQuery === "") throw new error("Did not provide valid choice.");

  db.query(viewQuery, (err, results) => {
    if (err) throw err;
    console.log("");
    console.table(results);
    getChoice();
  });
};

function addEmployee() {
  let empObj = {};
  let roleNames = [];
  db.query(sql.roleNames(), (err, results) => {
    if (err) throw err;
    results.forEach((role) => {
      roleNames.push({
        name: role.title,
        value: role.id,
      });
    });
    // console.log(roleNames);
    inquirer
      .prompt([
        {
          type: "input",
          name: "first",
          message: "What's the employee's first name?",
        },
        {
          type: "input",
          name: "last",
          message: "What's the employee's last name?",
        },
        {
          type: "checkbox",
          name: "role",
          message: "What's the employee's role?",
          choices: roleNames,
        },
      ])

      .then((data) => {
        empObj.firstName = data.first;
        empObj.lastName = data.last;
        empObj.role = data.role;
        let viewManagers = [];
        db.query(sql.getManagerEmployees(), (err, results) => {
          if (err) throw err;
          results.forEach((manager) => {
            viewManagers.push({
              name: manager.first_name + " " + manager.last_name,
              value: manager.id,
            });
          });
          viewManagers.push({ name: "None", value: null });
          // console.log(viewManagers);
          inquirer
            .prompt([
              {
                type: "list",
                name: "manager",
                message: "Who's the employee's manager?",
                choices: viewManagers,
              },
            ])
            .then((data) => {
              empObj.manager = data.manager;
              // console.log(empObj);
              db.query(
                sql.addEmployee(
                  empObj.firstName,
                  empObj.lastName,
                  empObj.role,
                  empObj.manager
                ),
                (err, results) => {
                  if (err) throw err;
                  console.log("Added employee to the database.");
                  getChoice();
                }
              );
            });
        });
      });
  });
}

addRole = () => {
  let roleObj = {};
  db.query(sql.viewDepartment(), (err, results) => {
    if (err) throw err;
    let viewDepartment = [];
    results.forEach((dept) => {
      viewDepartment.push({ name: dept.dept_name, value: dept.id });
    });
    inquirer
      .prompt([
        {
          type: "list",
          name: "department",
          message: "Which department does this role belong to?",
          choices: viewDepartment,
        },
      ])
      .then((deptChoice) => {
        // console.log(deptChoice);
        // console.log(deptChoice.department);
        roleObj.deptId = deptChoice.department;

        inquirer
          .prompt([
            {
              type: "input",
              name: "title",
              message: "What role would you like to add?",
            },
            {
              type: "input",
              name: "salary",
              message: "What is the salary for this role?",
            },
            {
              type: "confirm",
              name: "isManagement",
              message: "Is this a management position?",
            },
          ])
          .then((data) => {
            roleObj.title = data.title;
            roleObj.salary = data.salary;
            roleObj.isManagement = data.isManagement;
            db.query(
              sql.addRole(
                roleObj.title,
                roleObj.salary,
                roleObj.deptId,
                roleObj.isManagement
              ),
              (err, results) => {
                if (err) throw err;
                console.log("Added role to the database.");
                getChoice();
              }
            );
          });
      });
  });
};

addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department?",
      },
    ])
    .then((data) => {
      // console.log(data);
      // console.log(data.department);
      db.query(sql.addDepartment(data.department), (err, results) => {
        if (err) throw err;
        console.log("Added department to the database.");
        getChoice();
      });
    });
};

updateRole = () => {
  let updatedData = {};
  let employees = [];
  let roleNames = [];
  db.query(sql.viewEmployeeTable(), (err, results) => {
    if (err) throw err;
    results.forEach((employee) => {
      employees.push({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      });
    });
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee's role do you want to update?",
          choices: employees,
        },
      ])
      .then((data) => {
        // data.employee = user's choice
        updatedData.employee = data.employee;
        db.query(sql.roleNames(), (err, results) => {
          if (err) throw err;
          results.forEach((role) => {
            roleNames.push({
              name: role.title,
              value: role.id,
            });
          });
          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message:
                  "Which role would you like to assign to the selected employee?",
                choices: roleNames,
              },
            ])
            .then((data) => {
              // console.log(updatedData);
              // console.log(`data: ${data.role}`)
              // console.log(`employee: ${updatedData.employee}`);
              updatedData.role = data.role;
              db.query(sql.updateEmployee(updatedData.employee, updatedData.role), (err, results) => {
                if (err) throw err;
                console.log("Employee's role has been updated in the database.");
                getChoice();
              });
            });
        });
      });
  });
};

terminateApp = () => {
  console.log("Thank you, goodbye.");
};
getChoice();