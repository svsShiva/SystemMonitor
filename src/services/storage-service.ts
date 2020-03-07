const fs = require('fs');
const child_process = require('child_process');


export class StorageService {


    constructor() {
    }

    public getStorageOfDisk = async () => {
        return new Promise((resolve, reject) => {
            var workerProcess = child_process.exec('free -h',function (error, stdout, stderr){
                if (error) {
                    console.log(error.stack);
                    console.log('Error code: '+error.code);
                    console.log('Signal received: '+error.signal);
                    reject(error)
                }
                if(stdout){
                    resolve(stdout)
                }
                if(stderr){
                    reject(stderr)
                }
            });
            workerProcess.on('exit', function (code) {
            });
        });
    }
}