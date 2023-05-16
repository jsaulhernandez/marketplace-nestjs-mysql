export interface Response<T extends Object> {
    statusCode: number;
    message: string;
    response: T;
}
