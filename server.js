const inquirer = require("inquirer");
const db = require("./config/connect");
const SqlQueries = require("./db/sqlqueries");
const sql = new SqlQueries();

const initDb = () => {
    db.connect((err) => {
        if (err) throw err;
        console.log("Connected to database!");
        console.log("Welcome to the Employee Management App");
    });
};

initDb();

const promptUser = () => { 
    inquirer
        .prompt([
            {
                type: "checkbox",
                name: "choices",
                message: "What would you like to do?",
                choices: [
                    "View all employees",
                    "Add employee",
                    "Update employee roll",
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
            
        })
}