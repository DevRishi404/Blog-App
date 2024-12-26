import { Response } from "express";


export const responseHandler = (res: Response, message: string, data: object | null, status = 200) => {
    res.status(status).json({
        message: message,
        data: data
    })
}

export const errorHandler = (res: Response, message: string, status = 500) => {
    res.status(status).json({
        message: message,
    })
}