import User from '../models/userModel.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import fs from 'fs';

import 'dotenv/config';

const SECRET_KEY = process.env.SECRET_KEY;
const YT_LOGIN = process.env.YT_LOGIN;
const YT_PASS = process.env.YT_PASS;

export const register = async function (req, res) {
    try {
        const password = req.body.password;

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const { email, firstName, lastName } = req.body;

        const formattedEmail = email.toLowerCase();

        const formattedFirstName =
            firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

        const formattedLastName =
            lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

        const doc = new User({
            email: formattedEmail,
            firstName: formattedFirstName,
            lastName: formattedLastName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            SECRET_KEY,
            {
                expiresIn: '30d',
            },
        );

        const { passwordHash, ...userData } = user._doc;
        res.json({
            ...userData,
            token,
        });
    } catch (error) {
        res.status(500).send({
            message: 'Не вдалось зареєструватись',
        });
    }
};

export const login = async function (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });

        console.log(process.env.SECRET_KEY);

        if (!user) {
            return res.status(404).json({
                message: 'Помилка авторизації. Перевірте правильність пошти та паролю',
                success: false,
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(404).json({
                message: 'Помилка авторизації. Перевірте правильність пошти та паролю',
                success: false,
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            SECRET_KEY,
            {
                expiresIn: '30d',
            },
        );

        const { passwordHash, ...userData } = user._doc;

        console.log(userData);

        res.json({
            success: true,
            ...userData,
            token,
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            message: 'Не вдалось залогінитись',
        });
    }
};

export const update = async function (req, res) {
    try {
        const userId = req.params.id;

        const { firstName, lastName } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, { firstName, lastName });

        res.status(200).json({
            id: updatedUser.id,
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            avatar: updatedUser.avatar,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const me = async function (req, res) {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Користувач не знайдений',
            });
        }

        res.send({
            success: true,
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
        });
    } catch (error) {
        console.log(error);
        res.status(403).json({
            message: 'Немає доступу',
        });
    }
};

export const uploadProfilePicture = async function (req, res) {
    try {
        const file = req.files.file;
        const user = await User.findById(req.userId);
        const avatarName = Math.round(Math.random() * Number.MAX_SAFE_INTEGER) + '.jpg';
        file.mv('G:\\Програмування\\reactPractice\\Todo\\Server\\static' + '\\' + avatarName);
        user.avatar = avatarName;
        await user.save();
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Помилка завантаження фотографії' });
    }
};

export const deleteProfilePicture = async function (req, res) {
    try {
        const user = await User.findById(req.userId);
        fs.unlinkSync(
            'G:\\Програмування\\reactPractice\\Todo\\Server\\static' + '\\' + user.avatar,
        );
        user.avatar = null;
        await user.save();
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Помилка видалення фотографії' });
    }
};

export const forgetPassword = async function (req, res) {
    try {
        const email = req.body.email;

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'Перевірте правильність пошти' });
        }

        const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '10m' });
        user.resetPasswordToken = token;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: YT_LOGIN,
                pass: YT_PASS,
            },
        });

        const mailOptions = {
            to: email,
            from: 'highqualityrust@gmail.com',
            subject: 'Відновлення пароля',
            text: `Посилання діє 10 хвилин: http://localhost:3000/forgetPassword/${token} 
            Якщо ви передумали змінювати пароль, то ігноруйте цей лист та ваш пароль залишиться незмінним.`,
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                res.status(500).json({
                    message: 'Повідомлення на вашу пошту не надіслано',
                    success: false,
                });
            } else {
                res.status(200).json({
                    message: 'Повідомлення надійшло вам на пошту',
                    success: true,
                });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Помилка', success: false });
    }
};

export const resetPassword = async function (req, res) {
    try {
        const { token, password } = req.body;

        const user = await User.findOne({ resetPasswordToken: token });

        if (!user) {
            return res.status(400).json({ message: 'Користувача не знайдено', success: false });
        }

        jwt.verify(token, SECRET_KEY, async (error, decodedToken) => {
            if (error) {
                return res.status(400).json({ message: 'Недійсний токен', success: false });
            }

            if (user._id.toString() !== decodedToken._id) {
                return res
                    .status(400)
                    .json({ message: 'Помилка розкодування токена', success: false });
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            user.passwordHash = hash;
            user.resetPasswordToken = null;
            await user.save();

            res.status(200).json({ message: 'Ви змінили пароль!', success: true });
        });
    } catch (error) {
        return res.status(400).json({ message: 'Помилка', success: false });
    }
};
