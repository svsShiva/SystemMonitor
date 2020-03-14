import app from './app';

export class Socket {
    private io = app.getIO();
    constructor() {
    }

    public static onConnect(socket){
        console.log("Connected client on port %s.", 3000);
    
          socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
        
    }

}