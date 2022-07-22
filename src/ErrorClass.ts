import { NextApiResponse } from "next";

export enum ErrorEnum {
    Unauthorized = 401,
    NotFound = 404,
    InternalServerError = 500,
    BadRequest = 400,
    NotImplemented = 501,
}

export class ErrorClass {
    res: NextApiResponse;

    constructor(res: NextApiResponse) {
        this.res = res;
    }

    public Unauthorized(message: string) {
        this.res.status(ErrorEnum.Unauthorized).json({
            error: message,
        })
    }

    public NotFound(message: string) {
        this.res.status(ErrorEnum.NotFound).json({
            error: message,
        })
    }

    public InternalServerError(message: string) {
        this.res.status(ErrorEnum.InternalServerError).json({
            error: message,
        })
    }

    public BadRequest(message: string) {
        this.res.status(ErrorEnum.BadRequest).json({
            error: message,
        })
    }

    public NotImplemented(message: string) {
        this.res.status(ErrorEnum.NotImplemented).json({
            error: message,
        })
    }

    public Redirect(url: string, status: ErrorEnum) {
        this.res.writeHead(status, { Location: url }).end()
    }
}