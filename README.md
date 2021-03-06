hey GreenInvoice

### Installation

Assuming you have Docker and docker-compose installed on your machine, running and installing the project would not be a problem.

To install and run the project, run:

`yarn install && yarn all`

To run again run only

`yarn all`

### Project Structure

This project is a server side project built with Node.JS and Typescript. The Database chosen was MongoDB (see data schema).
I divided the server project to 3 modules: departments, managers, and employees (each one is a library inside server/src/).
Each module has it's own interfaces, controller, model and restful policy.
A MongoDB container will run on localhost:27019, so, it will not collide with existing MongoDB server on your machine (localhost:27017) and can be connected to from your machine on localhost:27019.
Server will run on localhost:10003.
Both ports and database name can be changed at the .env file in the main folder.

### Data schema (and thoughts)

I used a rather "flat" data structure here (MySQL would not have beed a bad chioce here).
I chose MongoDB because, at start, I wanted "nest" managers inside departmens and nest employees inside managers. My insticts was wrong here, because, some of requests are are to assign employees to managers or assign managers to departments, managers wgho could already have or not have a department.
While I could delete from one and push to another, this didn't seem like the best way.
Transferring a nested manager would give him a different _id value as a nested document (a solid id is always a good).
Same with transferring an employee between managers.
And last, this will give a low level of abstraction. Example: an employee under 2 managers, one proffesional and one as a tech lead could receive another key like employee.tech_lead.

I chose a flat manner where a department id is saved in the manager and the manager id is saved in the employee for several, and not saving an array of manager ids inside the department, or an array of employee ids inside a manager for the reasons reasons:

1. If I saved an array if manager ids inside the department, transferring a manager would cause deletion from one array and pushing to another array instead of just changing the department id (sams as for employees).
2. The query to get most employees would, again, be double nested (by mongooose.popuplate() or $aggregate), unwinded, and counted. Instead if not unwinding or grouping anything at getDepartmentWithMostEmployees() in departments model.

### Routes

#### Departments

POST /departments
Posts a new department. name value in request body is mandatory

GET /departments
Retrieved all raw departments (non aggregated, made for testing and conveniece)

GET /departments/most_employees
Return the department with the most employees and the number of employees

#### Managers

POST /managers
Posts a new manager. name value in request body is mandatory.

GET /managers
Retrieved all raw managers (non aggregated, made for testing and conveniece)

POST /managers/:manager_id/department/:department_id
assigns a manager with manager_id to department with department_id.

#### Employees

POST /employees
Posts a new employee. name value in request body is mandatory.

GET /employees
Retrieved all raw employees (non aggregated, made for testing and conveniece)

POST /employees/:employee_id/manager/:manager_id
assigns a employee with an employee_id to manager with manager_id.




Enjoy
