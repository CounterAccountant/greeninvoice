import 'dotenv/config';
import App from './app';

import validateEnv from './utils/validateEnv';
import DepartmentsController from "./departments/departments.controller";
import ManagersController from "./managers/managers.controller";
import EmployeesController from "./employees/employees.controller";

validateEnv();

const app = new App(
    [
        new DepartmentsController(),
        new ManagersController(),
        new EmployeesController(),
    ],
);

app.listen();

