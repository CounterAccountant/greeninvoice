
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import * as http from "http";
import IController from './types/controller.interface';


class App {
    public app: express.Application;
    public httpServer: http.Server;
    
    constructor(controllers: IController[]) {
        this.app = express();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    public listen() {
        this.httpServer = this.app.listen(process.env.SERVER_PORT, () => {
            console.log(`App listening on the port ${process.env.SERVER_PORT}`);
        });
    }



    private initializeMiddlewares() {
        this.app.use(morgan('tiny'));
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }


    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller) => {
            this.app.use(
                '/',
                controller.router
            );
        });
    }

    private async connectToTheDatabase() {
        try {
            const connection = await mongoose.connect(`${process.env.MONGO_PATH}/${process.env.DATABASE_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        } catch (error) {
            console.log('error when trying to connect to mongose is: ', error);
        }
    }


}

export default App;
