export interface Response<T extends Object> {
    statusCode: number;
    message: string;
    response: CustomResponse<T>;
}

export interface CustomResponse<T> {
    content: T | T[];
    page?: T;
}
