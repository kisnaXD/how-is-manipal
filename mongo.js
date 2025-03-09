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
    try {
        const dataBase = await connectToMongoDB();
        const typeMap = {
            'Academic-Block': 'academic-blocks',
            'Restaurants': 'restaurants',
            'Clubs': 'clubs',
            'Student-Clubs': 'student-clubs',
            'Food-Court': 'food-courts',
            'Boys-Hostel-Blocks': 'boys-hostel-blocks',
            'Girls-Hostel-Blocks': 'girls-hostel-blocks',
            'Campus-Services': 'campus-services',
            'Events': "events",
            'Courses': "courses"
        };
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
    try {
        const dataBase = await connectToMongoDBRatings();
        const items = await dataBase.collection('ratings').find({ name: itemType }).toArray();
        if (items.length > 0) {
            const item = items[0];
            if (item.reviews_list && Array.isArray(item.reviews_list)) {
                item.reviews_list.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA;
                });
            }
            res.status(200).json(items);
        } else {
            res.status(200).json(items);
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch ratings', details: err.message });
    }
});

app.post('/api/ratings/submit', async (req, res) => {
    const { name, reviewerName, reviewText, rating, date} = req.body;

    if (!name || !reviewText || rating === undefined || !date) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    const newReview = {
        reviewerName: reviewerName,
        date: date,
        rating: Number(rating),
        reviewText: reviewText
    };

    try {
        const dataBase = await connectToMongoDBRatings();
        const collection = dataBase.collection('ratings');

        const existingItem = await collection.findOne({ name: name });

        if (existingItem) {
            const currentTotalRating = existingItem.rating * existingItem.reviews_no;
            const newTotalRating = currentTotalRating + newReview.rating;
            const newReviewsNo = existingItem.reviews_no + 1;
            const newAverageRating = (newTotalRating / newReviewsNo).toFixed(1);
            const result = await collection.updateOne(
                { name: name },
                {
                    $push: { reviews_list: newReview },
                    $set: {
                        rating: newAverageRating,
                        reviews_no: newReviewsNo
                    }
                }
            );

            if (result.modifiedCount === 1) {
                res.status(200).json({ success: true });
            } else {
                res.status(500).json({ success: false, error: 'Failed to update review' });
            }
        } else {
            const newItem = {
                name: name,
                rating: newReview.rating.toFixed(1),
                reviews_no: 1,
                reviews_list: [newReview]
            };

            const result = await collection.insertOne(newItem);

            if (result.insertedId) {
                res.status(200).json({ success: true });
            } else {
                res.status(500).json({ success: false, error: 'Failed to insert review' });
            }
        }
    } catch (err) {
        console.error('Error processing review submission:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Example Express route
app.get('/api/items/parent/:parent', async (req, res) => {
    try {
        const dataBase = await connectToMongoDB();
        const items = await dataBase.collection('all').find({ parent: req.params.parent }).toArray();
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
  });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    process.exit(0);
});