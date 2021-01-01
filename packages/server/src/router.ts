import { Router } from 'express';

export const router: Router = Router();

router.get('/', (req, res) => {
    req.session.ir2 = {}; // Clear session when on homepage

    if (process.env.NODE_ENV == 'production') {
        res.sendFile(`${__dirname}/build/index.html`); // Send Compiled Frontend
    } else {
        res.redirect('http://localhost:3000'); // React Dev Server
    }
});

router.get('/troubleshoot', (req, res) => {
    req.session.ir2 = {};

    if (process.env.NODE_ENV == 'production') {
        res.sendFile(`${__dirname}/build/index.html`);
    } else {
        res.redirect('http://localhost:3000/troubleshoot');
    }
});

router.get('/credits', (req, res) => {
    req.session.ir2 = {};

    if (process.env.NODE_ENV == 'production') {
        res.sendFile(`${__dirname}/build/index.html`);
    } else {
        res.redirect('http://localhost:3000/credits');
    }
});

router.get('/teacher', (_req, res) => {
    if (process.env.NODE_ENV == 'production') {
        res.sendFile(`${__dirname}/build/index.html`);
    } else {
        res.redirect('http://localhost:3000/teacher');
    }
});

router.get('/courseDirector', (_req, res) => {
    if (process.env.NODE_ENV == 'production') {
        res.sendFile(`${__dirname}/build/index.html`);
    } else {
        res.redirect('http://localhost:3000/courseDirector');
    }
});

router.get('/game', (_req, res) => {
    if (process.env.NODE_ENV == 'production') {
        res.sendFile(`${__dirname}/build/index.html`);
    } else {
        res.redirect('http://localhost:3000/game');
    }
});

router.get('*', (_req, res) => {
    if (process.env.NODE_ENV == 'production') {
        res.sendFile(`${__dirname}/build/index.html`);
    } else {
        res.redirect('http://localhost:3000/404');
    }
});
