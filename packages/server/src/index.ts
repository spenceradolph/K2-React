import express from 'express';
import session from 'express-session';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { router } from './router';
import { socketSetup } from './socketSetup';

// Create the server
const app = express();
const server = http.createServer(app);

// Create the session store
const LokiStore = require('connect-loki')(session);
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'asdf123DefAuLt__secRet*&^%',
    store: new LokiStore(),
    cookie: { maxAge: 10800000 }, // 3 hours
    resave: false,
    saveUninitialized: false
});

// App has access to sessions
app.use(sessionMiddleware);

// Serve static files
app.use(express.static(`${__dirname}/build`));

// Server Routing
app.use('/', router);

// Socket Setup
const io = new Server(server);

// Sockets have access to session data
io.use((socket, next) => {
    sessionMiddleware(socket.request as any, {} as any, next as any); // TODO: figure out correct typings for this?
});

// Setup Sockets as they connect
io.on('connection', (socket: Socket) => {
    try {
        socketSetup(socket);
    } catch (error) {
        console.error('unable to setup socket...');
    }
});

const port = process.env.PORT || '80';
server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
