import { Request, Response } from "express";

import { StorageService } from '../services/storage-service';

export class StorageController {

    private storageService: StorageService;

    constructor() {
        this.storageService = new StorageService();
    }

    public getStorage = async (req: Request, res: Response) => {
        try {
            let data = await this.storageService.getStorageOfDisk()
            res.send(data)
        } catch (error) {
            console.log(error);
        }
    }
}