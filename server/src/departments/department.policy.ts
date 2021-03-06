import { NextFunction, Response, Request } from "express";
import DepartmentsModel from "./departments.model";



const departmentPolicy = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.department_id) {
        res.status(400);
        return res.send('No department id provided');
    }
    const foundDepartment = await DepartmentsModel.findById(req.params.department_id);
    if (!foundDepartment) {
        res.status(400);
        return res.send('No Department with id ' + req.params.department_id + ' was found');
    }
    req['department'] = foundDepartment;
    next();
}


export default departmentPolicy;