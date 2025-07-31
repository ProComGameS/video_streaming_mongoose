import express from 'express';


const router = express.Router();

router.get('/set-theme/:theme', (req, res) => {
    const theme = req.params.theme;
    res.cookie('theme', theme);
    res.redirect('/');
});

router.use((req, res, next) => {
    res.locals.theme = req.cookies.theme || 'light';
    next();
});

router.get('/toggle-theme', (req, res) => {
    const current = req.cookies.theme || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    res.cookie('theme', next, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.redirect('articles');
});

router.get('/set-name/:name', (req, res) => {
    req.session.username = req.params.name;
    res.send(`Імʼя збережено: ${req.session.username}`);
});

router.get('/get-name', (req, res) => {
    res.send(`Вітаю ${req.session.username} вдома`);
});



const articles = [
    { id: 1, title: '30 найкращих країн, міст і локацій для туристів у 2025 році', content: 'Отож, експерти з подорожей радять...' },
    { id: 2, title: 'DIE SCHÖNSTEN URLAUBSZIELE IM ÜBERBLICK', content: 'TÜRKEI ÄGYPTEN KROATIEN THAILAND SPANIEN ITALIEN.' }
];

router.get('/articles', (req, res) => {
    res.render('articles', {
        articles,
        username: req.session.username || null,
    });
});

router.get('/articles/:articleid', (req, res) => {
    const article = articles.find(obj => obj.id === parseInt(req.params.articleid));
    if (!article) {
        return res.status(404).send('Не знайдено');
    } else {
        res.render('article', { article: article });
    }
});

export default router;

