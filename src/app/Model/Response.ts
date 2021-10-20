export class Response {
    status: ResponseStatus;
    message: string;
    errors: any;
    data: any;
}
export enum ResponseStatus {
    Error= 0,
    Success=1
}