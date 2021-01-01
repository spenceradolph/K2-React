import { CONSTANT_VALUE } from '@monorepo/common';
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

app.use(express.static(`${__dirname}/build`));

app.get('/', (_req, res) => {
    if (process.env.NODE_ENV == 'production') {
        res.sendFile(`${__dirname}/build/index.html`);
    } else {
        res.redirect(`http://localhost:3000`); // React
    }
});

app.get('/api/value', (_req, res) => {
    res.json({ value: CONSTANT_VALUE });
});

const port = process.env.PORT || '80';
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
