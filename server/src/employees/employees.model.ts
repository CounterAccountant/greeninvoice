import mongoose, { Schema, Document, Model, Types, UpdateQuery } from 'mongoose';
import timeStamps from '../services/timestamps';
import IEmployee, { ICreateEmployeeParams, InsertEmployeeResponse } from './employee.interface';



export type IEmployeeWithMethods = IEmployee & Document & {

}


export interface IEmployeeModel extends Model<IEmployeeWithMethods> {
    createEmployee(params: ICreateEmployeeParams): Promise<InsertEmployeeResponse>;
    assignEmployeeToManager(employee_id: Types.ObjectId, manager_id: Types.ObjectId): Promise<UpdateQuery<IEmployee>>
}



const EmployeesSchema = new Schema({
    name: { type: String, required: true },
    manager: { type: Schema.Types.ObjectId, ref: 'managers' },
}, timeStamps);




EmployeesSchema.statics.createEmployee = async function (
    params: ICreateEmployeeParams
): Promise<InsertEmployeeResponse> {
    const Employee: IEmployeeModel = this.model('employees');
    const createdEmployee = await Employee.create({ name: params.name });
    return {
        success: true,
        created: createdEmployee,
        message: 'Employee with id ' + createdEmployee._id + ' was created successfully'
    };
}

EmployeesSchema.statics.assignEmployeeToManager = async function (
    employee_id: Types.ObjectId,
    manager_id: Types.ObjectId
): Promise<UpdateQuery<IEmployee>> {
    const Employee: IEmployeeModel = this.model('employees');
    return Employee.findByIdAndUpdate(employee_id, { manager: manager_id });
}



export default mongoose.model<IEmployeeWithMethods, IEmployeeModel>('employees', EmployeesSchema);

