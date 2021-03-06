export default interface IInsertResponse<T> {
    success: boolean;
    message?: string;
    created?: T;
}
