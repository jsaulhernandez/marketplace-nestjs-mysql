import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorManager extends HttpException {
    constructor(type: keyof typeof HttpStatus, message: string) {
        super(`${type} :: ${message}`, HttpStatus[type]);
    }

    public static createSignatureError(message: string) {
        const name = message.split(' :: ');
        if (name[0]) throw new HttpException(message, HttpStatus[name[0]]);
        else throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
