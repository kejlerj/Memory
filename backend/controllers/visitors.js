const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Game = require('../models/Game.js');
const Player = require('../models/Player.js');
const Card = require('../models/Card.js');
const tokens = require('../utils/tokens.js');

exports.menu = (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
};

exports.notFound = (req, res, next) => {
    try {
        res.status(404).send('404 : Page not found');
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
};

exports.leaderboard = async (req, res, next) => {
    try {
        const players = await Player.aggregate([
            {
                $group: {
                    _id: '$pseudo',
                    score: { $max: '$score' },
                },
            },
            { $sort: { score: -1 } },
            { $limit: 10 },
        ]);
        if (!players) res.status(400).send();
        else res.status(200).json(players);
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
};

const createField = async (gameID) => {
    let i, j;
    let index = 0;
    let arr = [
        { id: 0, icon: '⚖️' },
        { id: 1, icon: '🛵' },
        { id: 2, icon: '🛒' },
        { id: 3, icon: '🔧' },
        { id: 4, icon: '🚕' },
        { id: 5, icon: '🚀' },
        { id: 6, icon: '⏳' },
        { id: 7, icon: '💡' },
        { id: 8, icon: '🐦' },
        { id: 9, icon: '⏰' },
    ];
    arr = [...arr, ...arr];

    // shuffle field array
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // create and save new cards in DB
    for (let row of arr) {
        let card = new Card({
            index: index,
            id: row.id,
            icon: row.icon,
            gameID: gameID,
        });
        await card.save();
        index++;
    }
};

const getField = async (gameID) => {
    return await Card.find({ gameID: gameID });
};

exports.launch = async (req, res, next) => {
    try {
        let pseudo = req.body.pseudo;
        let id = uuidv4();
        const token = tokens.generateToken(pseudo);

        // create and save new player in DB
        const newPlayer = new Player({
            pseudo: pseudo,
        });
        newPlayer.save();

        // create and save new game in DB
        const newGame = new Game({
            id: id,
            startTime: Date.now(),
            endTime: null,
            nbClick: 0,
            player: newPlayer,
        });
        const game = await newGame.save();
        await createField(game.id);
        const field = await getField(game.id);
        res.status(201).json({ token: token, gameID: id, field: field }).send();
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
};

const genScore = async (gameID) => {
    let min_time = 20;
    let min_clicks = 20 / 2; // cards.length / 2
    let time_pts = 5;
    let click_pts = 20;
    let score = 1000;
    let game = await Game.findOne({ id: gameID });
    let clicks = game.nbClick;
    let count = Math.floor(
        (game.endTime.getTime() - game.startTime.getTime()) / 1000
    );

    score -= (clicks - min_clicks) * click_pts;
    score -= (count - min_time) * time_pts;
    if (score < 0 || score > 1000) throw 'Invalid score';
    Player.updateOne({ _id: game.player }, { $set: { score: score } }).exec();
};

const isVictory = async (gameID) => {
    const hiddenCards = await Card.findOne({
        gameID: gameID,
        status: 'HIDDEN',
    });
    if (!hiddenCards) return true;
    return false;
};

const setStatus = async (gameID, cardIndex, status) => {
    return await Card.updateOne(
        { gameID: gameID, index: cardIndex },
        { $set: { status: status } }
    );
};

const getCard = async (cardIndex, gameID) => {
    return await Card.findOne({ index: cardIndex, gameID: gameID });
};

const incrClick = async (gameID) => {
    return await Game.updateOne({ id: gameID }, { $inc: { nbClick: 1 } });
};

const saveEndtime = async (gameID) => {
    await Game.updateOne({ id: gameID }, { $set: { endTime: Date.now() } });
    genScore(gameID);
};

const checkCards = async (cardIndex, card2, gameID) => {
    const card1 = await getCard(cardIndex, gameID);
    if (!card1) throw 'Error: Card index invalid';
    if (card1.status !== 'HIDDEN') throw 'Error: Card status invalid';
    if (card2) {
        incrClick(gameID);
        if (card1.id == card2.id && card1.index !== card2.index) {
            await Promise.all([
                setStatus(gameID, card1.index, 'FOUND'),
                setStatus(gameID, card2.index, 'FOUND'),
            ]);

            // Check victory
            let victory = await isVictory(gameID);
            if (victory === true) await saveEndtime(gameID);
        } else await setStatus(gameID, card2.index, 'HIDDEN');
    } else await setStatus(gameID, cardIndex, 'VISIBLE');
};

exports.action = async (req, res, next) => {
    try {
        const gameID = req.params.gameID;
        const cardIndex = req.body.cardIndex;

        const card2 = await Card.findOne({ gameID: gameID, status: 'VISIBLE' });
        await checkCards(cardIndex, card2, gameID);
        const field = await getField(gameID);
        const game = await Game.findOne({ id: gameID });

        // Send response
        await res.status(200).json({
            field: field,
            nbClick: game.nbClick,
            count: Math.floor((Date.now() - game.startTime.getTime()) / 1000),
            isVictory: game.endTime !== null,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
};
