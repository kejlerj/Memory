const express = require('express');
const visitor = require('../controllers/visitors');
const validator = require('../validators/validateVisitor');
const tokens = require('../utils/tokens');

const router = express.Router();

router.post('/game', validator.validateLaunch, visitor.launch);
router.post(
    '/game/:gameID/action',
    tokens.verifyToken,
    validator.validateAction,
    visitor.action
);
router.get('/leaderboard', visitor.leaderboard);
router.get('/', visitor.menu);
router.use('*', visitor.notFound);

module.exports = router;
