import IMongoSchema from '../types/mongo.schema.interface';
import IInsertResponse from '../types/insertresponse.interface';
import { Request } from 'express';
import { Types } from 'mongoose';

interface IEmployee extends ICreateEmployeeParams, IMongoSchema {
    manager?: Types.ObjectId;
}

export interface ICreateEmployeeParams {
    name: string;
}

export interface RequestWithEmployee extends Request {
    employee: IEmployee;
}

export type InsertEmployeeResponse = IInsertResponse<IEmployee>;

export default IEmployee;