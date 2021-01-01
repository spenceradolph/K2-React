import { Router } from 'express';

export const router: Router = Router();

router.get('/', (req, res) => {
    req.session.ir2 = {}; // Clear session when on homepage
    req.session.save();

    if (process.env.NODE_ENV == 'production') {
        res.sendFile(`${__dirname}/build/web.html`); // Send Compiled Frontend
    } else {
        res.redirect('http://localhost:3000'); // React Dev Server
    }
});

router.get('/troubleshoot', (req, res) => {
    req.session.ir2 = {};
    req.session.save();

    if (process.env.NODE_ENV == 'production') {
        res.sendFile(`${__dirname}/build/web.html`);
    } else {
        res.redirect('http://localhost:3000/troubleshoot');
    }
});

router.get('/credits', (req, res) => {
    req.session.ir2 = {};
    req.session.save();

    if (process.env.NODE_ENV == 'production') {
        res.sendFile(`${__dirname}/build/web.html`);
    } else {
        res.redirect('http://localhost:3000/credits');
    }
});

router.get('/teacher', (req, res) => {
    if (!req.session.ir2 || !req.session.ir2.teacher) {
        res.redirect('/?error=unauthenticated'); // TODO: standardize errors (possibly with react components)
        return;
    }

    if (process.env.NODE_ENV == 'production') {
        res.sendFile(`${__dirname}/build/web.html`);
    } else {
        res.redirect('http://localhost:3000/teacher');
    }
});

router.get('/courseDirector', (req, res) => {
    if (!req.session.ir2 || !req.session.ir2.courseDirector) {
        res.redirect('/?error=unauthenticated');
        return;
    }

    if (process.env.NODE_ENV == 'production') {
        res.sendFile(`${__dirname}/build/web.html`);
    } else {
        res.redirect('http://localhost:3000/courseDirector');
    }
});

router.get('/game', (req, res) => {
    if (!req.session.ir2 || !req.session.ir2.game) {
        res.redirect('/?error=unauthenticated');
        return;
    }

    if (process.env.NODE_ENV == 'production') {
        res.sendFile(`${__dirname}/build/web.html`);
    } else {
        res.redirect('http://localhost:3000/game');
    }
});

router.get('*', (req, res) => {
    req.session.ir2 = {};
    req.session.save();

    if (process.env.NODE_ENV == 'production') {
        res.sendFile(`${__dirname}/build/web.html`);
    } else {
        res.redirect('http://localhost:3000/404');
    }
});
