import { Router } from "express";
import Ping from "../endpoint/ping";

const registerRouter: Router = Router();

registerRouter.get('/ping', (req, res) => {
    const pingInstance = new Ping();
    return res.json(pingInstance.ping());
});

export default registerRouter;
