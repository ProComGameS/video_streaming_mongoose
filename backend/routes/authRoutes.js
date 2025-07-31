import express from "express";
const router = express.Router();
import passport from "passport";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send({message: 'User already exists'});
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });
    res.json({ message: 'Реєстрація успішна' });

} catch (err) {
res.status(500).json({ error: "Failed to create user" });}
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ error: info.message });

        req.login(user, (err) => {
            if (err) return next(err);
            return res.json({ message: 'Авторизація успішна', user });
        });
    })(req, res, next);
});

router.post('/logout', (req, res) => {
    req.logout(() => {
        res.json({ message: 'Вихід успішний' });
    });
});

function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: 'Неавторизовано' });
}

router.get('/protected', ensureAuth, (req, res) => {
    res.json({ message: `Вітаю ${req.user.email}` });
});

export default router;

