import { NextFunction, Response, Request } from "express";
import ManagersModel from "./managers.model";



const managerPolicy = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.manager_id) {
        res.status(400);
        return res.send('No manager id provided');
    }
    const foundManager = await ManagersModel.findById(req.params.manager_id);
    if (!foundManager) {
        res.status(400);
        return res.send('No manager with id ' + req.params.manager_id + ' was found');
    }
    req['manager'] = foundManager;
    next();
}


export default managerPolicy;