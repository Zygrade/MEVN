const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// GET
router.get('/', async (req,res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// POST
router.post('/', async (req,res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text : req.body.text,
        createdAt : new Date()
    });
    res.status(201).send();
});

// DELETE
router.delete('/:id', async (req,res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id : new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
});

async function loadPostsCollection() {

    const client = await mongodb.MongoClient.connect
    ('mongodb://yadnesh:hsenday123@ds113713.mlab.com:13713/vue_express',{
        useNewUrlParser : true
    });

    return client.db('vue_express').collection('posts');
}

module.exports = router;