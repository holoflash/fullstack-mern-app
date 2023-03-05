import fs from 'fs';
import path from 'path';
import admin from 'firebase-admin';
import express from 'express';
import 'dotenv/config';
import { db, connectToDb } from './db.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')))

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;
    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (e) {
            return res.sendStatus(400);
        }
    }
    req.user = req.user || {};
    next();
});


//Get a specific playlist
app.get('/api/playlists/:playlist', async (req, res) => {
    const { playlist } = req.params;
    const result = await db.collection('playlists').findOne({ [playlist]: { $exists: true } });

    if (result) {
        res.json(result[playlist].suggestions);
    } else {
        res.status(404).json({ errorCode: 404, message: 'Playlist not found' });
    }
});


//Is user logged in?
app.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
});

//Add a suggestion
app.post('/api/playlists/:name/suggestions', async (req, res) => {
    const { name } = req.params;
    const { suggestion, user } = req.body;
    const id = suggestion + user

    await db.collection('playlists').updateOne({ [`${name}.suggestions`]: { $exists: true } }, {
        $push: { [`${name}.suggestions`]: { _id: id, suggestion: suggestion, user, upvotes: 0 } },
    });

    const result = await db.collection('playlists').findOne({ [`${name}.suggestions._id`]: id });
    if (result) {
        res.json(result[`${name}.suggestions`]);
    } else {
        res.status(404).json({ errorCode: 404, message: 'Playlist not found' });
    }
});

//Delete a suggestion
app.delete('/api/playlists/:name/suggestions/:id', async (req, res) => {
    const { name, id } = req.params;

    const result = await db.collection('playlists').updateOne(
        { [`${name}.suggestions._id`]: id },
        { $pull: { [`${name}.suggestions`]: { _id: id } } }
    );

    if (result.modifiedCount === 1) {
        res.status(204).end();
    } else {
        res.status(404).json({ errorCode: 404, message: 'Suggestion not found' });
    }
});

//Upvote a suggestion
app.put('/api/playlists/:name/suggestions/:id/upvote', async (req, res) => {
    const { name, id } = req.params;

    await db.collection('playlists').updateOne({ [`${name}.suggestions._id`]: id }, {
        $inc: { [`${name}.suggestions.$.upvotes`]: 1 },
    });

    const result = await db.collection('playlists').findOne({ [`${name}.suggestions._id`]: id });
    if (result) {
        res.json(result[name].suggestions.find(suggestion => suggestion._id === id));
    } else {
        res.status(404).json({ errorCode: 404, message: 'Suggestion not found' });
    }
});

//Downvote a suggestion
app.put('/api/playlists/:name/suggestions/:id/downvote', async (req, res) => {
    const { name, id } = req.params;

    await db.collection('playlists').updateOne({ [`${name}.suggestions._id`]: id }, {
        $inc: { [`${name}.suggestions.$.upvotes`]: -1 },
    });

    const result = await db.collection('playlists').findOne({ [`${name}.suggestions._id`]: id });
    if (result) {
        res.json(result[name].suggestions.find(suggestion => suggestion._id === id));
    } else {
        res.status(404).json({ errorCode: 404, message: 'Suggestion not found' });
    }
});

const PORT = process.env.PORT || 8000

connectToDb(() => {
    console.log('Successfully connected to database!');
    app.listen(PORT, () => {
        console.log('Server is listening on port ' + PORT);
    });
})