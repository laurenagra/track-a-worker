USE employees_db;

INSERT INTO department (dept_name)
VALUES ("Engineering"),
        ("Finance"),
        ("Legal");


INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 1),
        ("Software Engineer", 120000, 1),
        ("Account Manager", 160000, 2),
        ("Accountant", 125000, 2),
        ("Legal Team Lead", 250000, 3),
        ("Lawyer", 190000, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null),
        ("Marie", "Nicleson", 2, 1),
        ("Michelle", "Alvarez", 3, null),
        ("Peter", "Choe", 4, 3),
        ("Emerson", "Jeong", 5, null),
        ("Joe", "Gupta", 6, 5);

