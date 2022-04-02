# track-a-worker

## Table of Contents
- [General](#general)
- [User Story](#general)
- [Installation](#installation)
- [Tech](#tech)
- [Screenshots](#screenshots)
- [Acceptance Criteria](#acceptance-criteria)
- [Authors](#authors)

## General

## User Story 
```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```
## Installation
run the following commands to install the required packages

Node: `npm init -y`

`npm i`

MySql: `npm i mysql2`

Inquirer: `npm i inquirer`

Dotenv: `npm i dotenv`

```Initiate the application through the command line with the command node server.js. You will be taken through a series of prompts that will allow you to view, add, and update various information in the database. When given a list of choices, these choices are pulled from the database to accurately reflect any changes you may have made.``` 

## Tech
- MySQL
- Node.js
- Javascript 

## Screenshots

## Acceptance Criteria 
```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## License 
MIT 

## Authors 
**Lauren Agra** 
- [LinkedIn](https://www.linkedin.com/in/lauren-agra-aa868b1b8/)
- [Github](https://github.com/laurenagra)
- [Portfolio](https://laurenagra.github.io/Portfolio-Base/)