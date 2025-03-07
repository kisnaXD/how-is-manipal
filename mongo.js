const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;
const uri = 'mongodb://localhost:27017';
const dbName = 'items';

app.use(cors());
app.use(express.json());

async function connectToMongoDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(dbName);
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        throw err;
    }
}

async function connectToMongoDBRatings() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected to MongoDB for Ratings');
        return client.db('ratings');
    } catch (err) {
        console.error('Failed to connect to MongoDB For Ratings', err);
        throw err;
    }
}

app.get('/api/items', async (req, res) => {
    try {
        const dataBase = await connectToMongoDB()
        const items = await dataBase.collection('all').find({}).toArray();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch items', details: err.message });
    }
});

app.get('/api/items/:name', async (req, res) => {
    const itemName = req.params.name;
    try {
        const collection = await connectToMongoDB();
        const item = await collection.findOne({ name: itemName });
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ error: `Item '${itemName}' not found` });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch item', details: err.message });
    }
});

app.get('/api/items/type/:type', async (req, res) => {
    const itemType = req.params.type;
    console.log("Crazy" + itemType)
    try {
        const dataBase = await connectToMongoDB();
        const typeMap = {
            'Academic-Block': 'academic-blocks',
            'Restaurants': 'restaurants',
            'Professors': 'professors',
            'Student-Clubs': 'student-clubs',
            'Food-Court': 'food-courts',
            'Boys-Hostel-Blocks': 'boys-hostel-blocks',
            'Girls-Hostel-Blocks': 'girls-hostel-blocks',
            'Campus-Services': 'campus-services',
            'Events': "events"
        };
        console.log(typeMap[itemType])
        const items = await dataBase.collection(typeMap[itemType]).find().toArray();
        if (items.length > 0) {
            res.status(200).json(items);
        } else {
            res.status(404).json({ error: `No items found for type '${itemType}'` });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch items by type', details: err.message });
    }
});

app.get('/api/ratings/rating/:rating', async (req, res) => {
    const itemType = req.params.rating;
    console.log("Item Type" + itemType)
    try {
        const dataBase = await connectToMongoDBRatings();
        const items = await dataBase.collection('ratings').find({name: itemType}).toArray();
        console.log(items)
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch items by type', details: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    process.exit(0);
});