import { Request, Response } from "express";

export class Logger {

    public static log = async (req: Request, res: Response, next) => {
        try {
            next();
        } catch (error) {
            console.log(error);
        }
    }
} 