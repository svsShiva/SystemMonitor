import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as http from "http";
import { Config } from "./config/config";
import { StorageRouter } from './routers/storage-router';
import { MemoryRouter } from './routers/memory-router';
import { Socket } from './socket';

class App {
    public port = Config.getInstance().getPort();
    private app: express.Application;
    private server: http.Server;
    private io;
    public storageRoute: StorageRouter;

    public memoryRoute: MemoryRouter;

    constructor() {
        this.createApp();
        this.setRouters();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private setRouters(): void {
        this.storageRoute = new StorageRouter();
        this.memoryRoute = new MemoryRouter();
    }

    private createApp(): void {
        this.app = express();
    }
    
    private createServer(): void {
        this.server = http.createServer(this.app);
    }


    private config(): void {
        this.app.use(cors());
        this.app.options('*', cors());
        this.app.use('/storage', this.storageRoute.routes());
        this.app.use('/memory', this.memoryRoute.routes());

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

    private sockets(): void {
        this.io = require("socket.io").listen(this.server, { origins: '*:*'});
    }
    
    private listen(): void {
        this.server.listen(this.port, () => {
          console.log("Running server on port %s", this.port);
        });
    
        this.io.on("connect", Socket.onConnect);
    }

    public getApp(): express.Application {
        return this.app;
    }

    public getIO() {
        return this.io;
    }
}

export default new App();