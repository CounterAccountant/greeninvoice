import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { IManagerModel } from '../managers/managers.model';
import timeStamps from '../services/timestamps';
import IDepartment, { ICreateDepartmentParams, InsertDerpartmentResponse } from './department.interface';



export type IDepartmentWithMethods = IDepartment & Document & {

}


export interface IDepartmentModel extends Model<IDepartmentWithMethods> {
    createDepartment(params: ICreateDepartmentParams): Promise<InsertDerpartmentResponse>;
    getDepartments(): Promise<IDepartment[]>;
    getDepartmentWithMostEmployees(): Promise<IDepartment>;
}



const DepartmentsSchema = new Schema({
    name: { type: String, required: true, unique: true },
}, timeStamps);




DepartmentsSchema.statics.createDepartment = async function (params: ICreateDepartmentParams): Promise<InsertDerpartmentResponse> {
    const department: IDepartmentModel = this.model('departments');
    const foundDepartment = await department.findOne({ name: params.name });
    if (foundDepartment) {
        return {
            success: false,
            message: 'A department with the name of ' + params.name + ' already exists',
        }
    }
    const createdDepartment = await department.create({ name: params.name });
    return {
        success: true,
        created: createdDepartment,
        message: 'Department with id ' + createdDepartment._id + ' was created successfully'
    };
}




DepartmentsSchema.statics.getDepartments = async function (): Promise<IDepartment[]> {
    const Department: IDepartmentModel = this.model('departments');
    return await Department.find();
}


DepartmentsSchema.statics.getDepartmentWithMostEmployees = async function (): Promise<IDepartment> {
    const Department: IDepartmentModel = this.model('departments');
    const departmentWithMostEmployees: IDepartment = (await Department.aggregate([
        {
            $lookup: {
                from: 'managers',
                localField: '_id',
                foreignField: 'department',
                as: 'managers',
            }
        },
        {
            $lookup: {
                from: 'employees',
                localField: 'managers._id',
                foreignField: 'manager',
                as: 'employees'
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                created_at: 1,
                updated_at: 1,
                num_of_employees: { $size: '$employees' }
            }
        },
        {
            $sort: {
                num_of_employees: -1
            }
        },
        {
            $limit: 1
        }
    ]))[0];
    return departmentWithMostEmployees;
}


export default mongoose.model<IDepartmentWithMethods, IDepartmentModel>('departments', DepartmentsSchema);

