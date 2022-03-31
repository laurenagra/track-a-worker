class SqlQueries { 
    constructor() {
        this.viewEmployees = function() {
            return `
            SELECT,\ 
            e.first_name,\
            e.last_name,\
            r.title as role_title,\ 
            d.dept_name,\
            r.salary,\
            CONCAT(e2.first_name, ' ', e2.last_name ) AS manager_name\
            FROM employee e\
            JOIN role r ON r.id = e.role_id\
            JOIN department d ON d.id = r.department_id\
            LEFT OUTER JOIN employee e2 ON e2.id = e.manager_id\
            `;
        };
        this.viewEmployeeTable = function () {
            return `SELECT * FROM employee`;
        };
        
    }
}