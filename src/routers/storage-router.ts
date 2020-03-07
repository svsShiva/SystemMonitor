import { Router, Request, Response } from 'express';

import { StorageController } from '../controllers/storage-controller';
import { Logger } from '../middleware/logger';

export class StorageRouter {
    private router: Router;
    private storageController: StorageController;

    constructor() {
        this.router = Router();
        this.storageController = new StorageController();
    }

    public routes(): Router {
        this.router
            .get('/', Logger.log, this.storageController.getStorage);

        return this.router;

    }
}