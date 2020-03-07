import express from 'express';
import * as bodyParser from 'body-parser';

import { StorageRouter } from './routers/storage-router';

class App {

    public app: express.Application;
    public storageRoute: StorageRouter;

    constructor() {
        this.app = express();
        this.setRouters();
        this.config();
    }

    private setRouters(): void {
        this.storageRoute = new StorageRouter();
    }

    private config(): void {

        this.app.use('/storage', this.storageRoute.routes());

        this.app.use((err, req, res, next) => {
            if (err) {
                if (err.statusCode && err.message) {
                    return res.status(err.statusCode).json({ message: err.message })
                }
                console.log(err);
                return res.status(500).json({ message: "Service not available" });
            } else {
                next();
            }
        });
    }
}

export default new App().app;