import app from "./app";
import { Config } from "./config/config";

const port = Config.getInstance().getPort();

app.listen(port, () => {
    console.log("Express server listening on port %s", port);
})