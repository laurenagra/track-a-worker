const inquirer = require("inquirer");
const db = require("./config/connection");
const SqlQueries = require("./db/sqlqueries");
// const sql = new SqlQueries();
console.log(SqlQueries);

const initDb = () => {
  db.connect((err) => {
    if (err) throw err;
    console.log("Connected to database!");
    console.log("Welcome to the Employee Management App");
    promptUser();
  });
};

initDb();

const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "Add employee",
          "Update employee roll",
          "View all roles",
          "Add role",
          "View all departments",
          "Add department",
        ],
      },
    ])
    .then((response) => {
      const choice = response;
      console.log(choice);
      //   console.log(response.choices);

      choice === "Add employee"
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
  let viewQuery = "";
  if (choice === "View all employees") {
    viewQuery = sql.viewEmployees();
  } else if (choice === "view all roles") {
    viewQuery = sql.viewRoles();
  } else {
    viewQuery = sql.viewDepartment();
  }
  if (viewQuery === " ") throw new error("Did not provide valid input.");

  db.query(viewQuery, (err, results) => {
    if (err) throw err;
    console.log("");
    console.table(results);
    promptUser();
  });
};

function addEmployee() {
  //   let obj = {};
  //   let roleNames = [];
  //   db.query(SqlQueries.roleNames(), (err, results) => {
  //     results.forEach((role) => {
  //       roleNames.push({
  //         name: role.title,
  //         value: role.id,
  //       });
  //     });
  //     console.log(roleNames);
  inquirer
    .prompt([
      {
        type: "input",
        name: "first",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last",
        message: "What is their last name?",
      },
      {
        type: "Checkbox",
        name: "role",
        message: "What is their role?",
        choices: roleNames,
      },
    ])
    .then((data) => {
      obj.firstName = data.first;
      obj.lastName = data.last;
      obj.role = data.role;
      let viewManagers = [];
      db.query(SqlQueries.getManager(), (err, results) => {
        if (err) throw err;
        results.forEach((manager) => {
          viewManagers.push({
            name: manager.first_name + " " + manager.last_name,
            value: manager.id,
          });
        });
        viewManagers.push({ name: "None", value: null });

        inquirer
          .prompt([
            {
              type: "list",
              name: "manager",
              message: "who is the manager?",
              choices: viewManagers,
            },
          ])
          .then((data) => {
            obj.manager = data.manager;

            db.query(
              SqlQueries.addEmployee(
                obj.firstName,
                obj.lastName,
                obj.role,
                obj.manager
              ),
              (err, results) => {
                if (err) throw err;
                console.log("Added new employee to database");
              }
            );
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
              message: "What is the expected salary for this role?",
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
                promptUser();
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
        message: "what is the name of the department?",
      },
    ])
    .then((data) => {
      db.query(sql.addDepartment(data.department), (err, results) => {
        if (err) throw err;
        console.log("Added department to database");
        promptUser();
      });
    });
};

updateRole = () => {
  let updatedData = {};
  let employees = [];
  let roleNames = [];
  db.query(sql.viewEmployees(), (err, results) => {
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
          message: "Which employee's role would you like to update?",
          choices: employees,
        },
      ])
      .then((data) => {
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
                  "Which role would you like to assign to this employee?",
                choices: roleNames,
              },
            ])
            .then((data) => {
              updatedData.role = data.role;
              db.query(
                sql.updateEmployee(updatedData.employee, updatedData.role),
                (err, results) => {
                  if (err) throw err;
                  console.log("Employee's role has been updated");
                  promptUser();
                }
              );
            });
        });
      });
  });
};

terminateApp = () => {
  console.log("Thank you for visiting");
};
// promptUser();
