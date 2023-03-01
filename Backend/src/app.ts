
import express from "express";
import cors from "cors";
import config from "./01-utils/config";
import dal from "./04-dal/dal";
dal.connectToMongoDB();
import controller from "./06-controllers/controller";
import errorsHandler from "./02-middleware/errors-handler";

const server = express();

server.use(cors());
server.use(express.json());
server.use("/api", controller);
server.use(errorsHandler);

server.listen(config.port, () => console.log("Listening..."));    
      
