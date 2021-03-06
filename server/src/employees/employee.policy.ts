import { NextFunction, Response, Request } from "express";
import EmployeesModel from "./employees.model";



const employeePolicy = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.employee_id) {
        res.status(400);
        return res.send('No employee id provided');
    }
    const foundEmployee = await EmployeesModel.findById(req.params.employee_id);
    if (!foundEmployee) {
        res.status(400);
        return res.send('No employee with id ' + req.params.employee_id + ' was found');
    }
    req['employee'] = foundEmployee;
    next();
}


export default employeePolicy;