import { Request, Response } from "express";
import { MemoryService } from "../services/memory-service";

export class MemoryController {

    private memoryService: MemoryService;

    constructor() {
        this.memoryService = new MemoryService();
    }

    public getMemory = async (req: Request, res: Response) => {
        try {
            let path = require('path');
            // let data = await this.memoryService.getRAMStatus()
            res.sendFile(path.join(__dirname, '../pages', 'memory.html'));
        } catch (error) {
            console.log(error);
        }
    }
}