import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import CookieParser from 'cookie-parser';
import createHttpError from 'http-errors';
import * as http from 'http';
import * as https from 'https';
import CompilerRoutes from '../routes';

const start = (port:number | string):Promise<Error | http.Server | https.Server> => {
    return new Promise((resolve, reject) => {
        if(!port) {
            throw new Error('The server must be started with an available port');
        }
        const app = express();
        if (process.env.NODE_ENV?.trim() == 'production') {
            console.log('--Starting in PROD mode --');
            app.use(morgan('combined'));
        } else {
            console.log('--Starting in DEV mode --');
            app.use(morgan('combined'));
        }
        app.use(CookieParser());
        app.use(helmet());
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        
        // add all routes here.
        CompilerRoutes.registerRoutes(app);
        app.use(async(req, res, next) => {
            next(new createHttpError.NotFound());
        });
        app.use((err:any, req: Request, res: Response, next: NextFunction) => {
            reject(new Error('Something went wrong'));
            res.status(err.status || 500).json({
                error: {
                    status: err.status || 500,
                    message: err.message
                }
            });
        });
        
        // start the server
        resolve(app.listen(port));
    });
}

export const server = Object.assign({}, {start});