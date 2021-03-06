import mongoose, { Types, Schema, Document, Model, UpdateQuery } from 'mongoose';
import timeStamps from '../services/timestamps';
import IManager, { ICreateManagerParams, InsertManagerResponse } from './manager.interface';



export type IManagerWithMethods = IManager & Document & {

}


export interface IManagerModel extends Model<IManagerWithMethods> {
    createManager(params: ICreateManagerParams): Promise<InsertManagerResponse>;
    assignManagerToDepartment(manger_id: Types.ObjectId, department_id: Types.ObjectId): Promise<UpdateQuery<IManager>>;
}



const ManagersSchema = new Schema({
    name: { type: String, required: true },
    department: { type: Schema.Types.ObjectId, ref: 'departments' },
}, timeStamps);




ManagersSchema.statics.createManager = async function (params: ICreateManagerParams): Promise<InsertManagerResponse> {
    const Manager: IManagerModel = this.model('managers');
    const createdManager = await Manager.create({ name: params.name });
    return {
        success: true,
        created: createdManager,
        message: 'Manager with id ' + createdManager._id + ' was created successfully'
    };
}




ManagersSchema.statics.assignManagerToDepartment = async function (manger_id: Types.ObjectId, department_id: Types.ObjectId):Promise<UpdateQuery<IManager>> {
    const Manager: IManagerModel = this.model('managers');
    await Manager.findByIdAndUpdate(manger_id, { department: department_id });
    return;
}


export default mongoose.model<IManagerWithMethods, IManagerModel>('managers', ManagersSchema);

