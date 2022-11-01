//import { createRequire } from 'module';
//const require = createRequire(import.meta.url);

import express  from "express";
import http from "http";


const app = express();
const httpServer = http.createServer(app);


app.use(express.static('./client'));
app.use(express.static('./common'));
app.use(express.static('./client/view'));
console.log('oi');

import gameFactory from '../server/gameFactory.js';
const game = gameFactory.create(httpServer);

httpServer.listen(3000, ()=> console.log("listen on localhost port: 3000"));





