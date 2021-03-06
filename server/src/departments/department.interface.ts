import IMongoSchema from '../types/mongo.schema.interface';
import IInsertResponse from '../types/insertresponse.interface';
import { Request } from 'express';

interface IDepartment extends ICreateDepartmentParams, IMongoSchema {
    num_of_employees?: number;
}

export interface ICreateDepartmentParams {
    name: string;
}

export type InsertDerpartmentResponse = IInsertResponse<IDepartment>;

export interface RequestWithDepartment extends Request {
    department: IDepartment;
}

export default IDepartment;