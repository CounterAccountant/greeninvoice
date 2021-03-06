import express, { NextFunction, Response, Request } from "express";
import managerPolicy from "../managers/manager.policy";
import IController from "../types/controller.interface";
import DepartmentsModel from "./departments.model";
import departmentPolicy from './department.policy';
import { RequestWithManager } from "../managers/manager.interface";
import { RequestWithDepartment } from './department.interface';
import managersModel from "../managers/managers.model";

// var upload = multer({ dest: 'uploads/' })


export default class DepartmentsController implements IController {
    public path = '/departments';
    public router = express.Router();
    private Department = DepartmentsModel
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            `${this.path}`,
            this.getDepartments
        );
        this.router.post(
            `${this.path}`,
            this.postDepartment
        );
        this.router.get(
            `${this.path}/most_employees`,
            this.getDepartmentWithMostEmployees
        )
    }


    private getDepartments = async (req: Request, res: Response, next: NextFunction) => {
        const departments = await this.Department.getDepartments();
        res.status(200).json({
            success: true,
            departments,
        })
    }

    private postDepartment = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.name) {
            res.status(400).send('A name for the department was not provided');
        }
        if (req.body.name === '') {
            res.status(400).send('A name for the department cannot be an empty string');
        }
        const createdDepartment = await this.Department.createDepartment({ name: req.body.name });
        if (!createdDepartment.success) {
            res.status(400).send(createdDepartment.message || 'Unexpected error');
        }
        res.status(200).json(createdDepartment);
    }

    private getDepartmentWithMostEmployees = async (req: Request, res: Response, next: NextFunction) => {
        const department = await this.Department.getDepartmentWithMostEmployees();
        res.status(200).json({
            success: true,
            department
        })
    }



}