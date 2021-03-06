import express, { NextFunction, Response, Request } from "express";
import IController from "../types/controller.interface";
import EmployeesModel from "./employees.model";
import employeePolicy from './employee.policy';
import managerPolicy from '../managers/manager.policy';
import { RequestWithManager } from "../managers/manager.interface";
import { RequestWithEmployee } from "./employee.interface";



export default class EmployeesController implements IController {
    public path = '/employees';
    public router = express.Router();
    private Employee = EmployeesModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            `${this.path}`,
            this.getEmployees
        );
        this.router.post(
            `${this.path}`,
            this.postEmployee
        );
        this.router.post(
            `${this.path}/:employee_id/manager/:manager_id`,
            employeePolicy,
            managerPolicy,
            this.assignEmployee
        )
    }

    private getEmployees = async (req: Request, res: Response, next: NextFunction) => {
        const employees = await this.Employee.find();
        res.status(200)
            .json({ success: true, employees })
    }

    private postEmployee = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.name) {
            res.status(400)
                .send('A name for the Employee was not provided');
        }
        if (req.body.name === '') {
            res.status(400)
                .send('A name for the Employee cannot be an empty string');
        }
        const createdEmployee = await this.Employee.createEmployee({ name: req.body.name });

        if (!createdEmployee.success) {
            res.status(400)
                .send(createdEmployee.message || 'Unexpected error');
        }
        res.status(200).json(createdEmployee);
    }
    private assignEmployee = async (req: RequestWithManager & RequestWithEmployee, res: Response, next: NextFunction) => {
        await this.Employee.assignEmployeeToManager(req.employee._id, req.manager._id);
        res.status(200).json({
            success: true,
            message: 'Employee with id ' + req.employee._id + ' was assigned to manager with id ' + req.manager._id
        })

    }



}