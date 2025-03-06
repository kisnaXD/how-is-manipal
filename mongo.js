const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;
const uri = 'mongodb://localhost:27017';
const dbName = 'items';
const collectionName = 'items';


app.use(cors());
app.use(express.json());

async function connectToMongoDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(dbName).collection(collectionName);
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        throw err;
    }
}

app.get('/api/items', async (req, res) => {
    try {
        const collection = await connectToMongoDB();
        const items = await collection.find({}).toArray();
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
    try {
        const collection = await connectToMongoDB();
        const items = await collection.find({ type: itemType }).toArray();
        if (items.length > 0) {
            res.status(200).json(items);
            items.forEach(item => {
                console.log(item.name)
            })
        } else {
            res.status(404).json({ error: `No items found for type '${itemType}'` });
        }
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