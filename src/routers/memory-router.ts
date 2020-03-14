import { Router, Request, Response } from 'express';

import { Logger } from '../middleware/logger';
import { MemoryController } from '../controllers/memory-controller';

export class MemoryRouter {
    private router: Router;
    private memoryController: MemoryController;

    constructor() {
        this.router = Router();
        this.memoryController = new MemoryController();
    }

    public routes(): Router {
        this.router
            .get('/', this.memoryController.getMemory);

        return this.router;
    }
}