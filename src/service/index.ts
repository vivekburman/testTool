import * as http from 'http';
import * as https from 'https';
import { server } from './server/server';
import { config } from './config/config';

const startService = async () => {
    // start the server
    let app: Error | http.Server | https.Server | null = null;
    console.log('-- Compiler Service --');
    try{
        app = await server.start(config.port);
        console.log(`Compiler Server has started in port number = ${config.port}`);
    }catch(err) {
        console.log('Error starting server = ', err);
    };
    return app;
}

export const compilerService = Object.assign({}, {startService});