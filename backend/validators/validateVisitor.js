const { check, validationResult } = require('express-validator');

exports.validateLaunch = [
    check('pseudo').trim().escape().notEmpty(),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            next();
        } catch (err) {
            console.log(err.mapped());
            return res.status(400).send();
        }
    },
];

exports.validateAction = [
    check('cardIndex').isInt(),
    check('gameID').isUUID(),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            next();
        } catch (err) {
            console.log(err.mapped());
            return res.status(400).send();
        }
    },
];
