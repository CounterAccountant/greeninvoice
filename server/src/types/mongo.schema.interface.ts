import { Types } from "mongoose";


export default interface IMongoSchema {
    _id?: Types.ObjectId;
    created_at?: Date;
    updated_at?: Date;
}