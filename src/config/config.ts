import { development } from './development';
import { production } from './production';


export class Config {
    private static _instance: Config;

    private env: string;

    private port: number;
    private secretKey: string;
    private uuidNamespace: string;

    private mongoUrl: string;

    private constructor() {
        this.env = process.env.NODE_ENV || 'development';
        this.loadData(this.getData())
    }

    public static getInstance(): Config {
        return this._instance || (this._instance = new this());
    }

    private getData(): any {
        switch (this.env) {
            case 'production':
                return production;
            default:
                return development;
        }
    }

    private loadData(data: any): void {
        this.port = parseInt(process.env.PORT ? process.env.PORT : (data.app.port || 3000));
    }

    public getPort(): number {
        return this.port
    }

}