import IMongoSchema from '../types/mongo.schema.interface';
import IInsertResponse from '../types/insertresponse.interface';
import { Request } from 'express';
import { Types } from "mongoose";


interface IManager extends ICreateManagerParams, IMongoSchema {
    department?: Types.ObjectId;
}

export interface ICreateManagerParams {
    name: string;
}

export interface RequestWithManager extends Request {
    manager: IManager;
}

export type InsertManagerResponse = IInsertResponse<IManager>;

export default IManager;