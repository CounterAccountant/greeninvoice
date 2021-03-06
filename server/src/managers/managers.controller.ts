import express, { NextFunction, Response, Request } from "express";
import IController from "../types/controller.interface";
import { RequestWithManager } from "./manager.interface";
import ManagersModel from "./managers.model";
import managerPolicy from './manager.policy';
import employeePolicy from "../employees/employee.policy";
import { RequestWithEmployee } from "../employees/employee.interface";
import departmentPolicy from '../departments/department.policy';
import { RequestWithDepartment } from "../departments/department.interface";



export default class ManagersController implements IController {
    public path = '/managers';
    public router = express.Router();
    private Manager = ManagersModel
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            `${this.path}`,
            this.getManagers,
        )
        this.router.post(
            `${this.path}`,
            this.postManager
        );
        this.router.post(
            `${this.path}/:manager_id/department/:department_id`,
            managerPolicy,
            departmentPolicy,
            this.assignManager
        );
    }



    private postManager = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.name) {
            res.status(400);
            return res.send('A name for the manager was not provided');
        }
        if (req.body.name === '') {
            res.status(400);
            return res.send('A name for the manager cannot be an empty string');
        }
        const createdManager = await this.Manager.createManager({ name: req.body.name });

        if (!createdManager.success) {
            res.status(400);
            return res.send(createdManager.message || 'Unexpected error');
        }
        res.status(200);
        res.json(createdManager)
    }
    
    private getManagers = async (req: Request, res: Response, next: NextFunction) => {
        const managers = await this.Manager.find();
        res.status(200);
        res.json({
            success: true,
            managers,
        })
    }

    private assignManager = async (req: RequestWithManager & RequestWithDepartment, res: Response, next: NextFunction) => {
        await this.Manager.assignManagerToDepartment(req.manager._id, req.department._id);
        res.status(200);
        res.json({
            success: true,
            message:'Manager with id ' + req.manager._id + ' was assigned to department with id ' + req.department._id
        });

    }




}