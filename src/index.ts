// start all the servers/services and the database
import dotenv from 'dotenv';
dotenv.config();

import * as http from 'http';
import * as https from 'https';
import { compilerService } from './service';

let server: Error | null | http.Server | https.Server = null;

const closeServer = () => {
    console.log('closing server');
    server && (server instanceof http.Server || server instanceof https.Server) && server.close();
}

process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception = ', err);
});
process.on('unhandledRejection', (err) => {
    console.log('Unhandled Rejection = ', err);
});

process.on('SIGINT', () => {
    closeServer();
    process.exit();
});

Promise.all([
    compilerService.startService()
])
.then((res: any) => {
    server = res;
})
.catch(err => {
    console.log('ERROR!', err);
});