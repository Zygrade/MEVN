const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const posts = require('./routes/api/posts.js');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/posts',posts);

// Handling production
if (process.env.NODE_ENV === 'production') {
    // static folder
    app.use(express.static(__dirname + '/public/'));
    
    // Handling SPA
    app.get(/.*/, (req.res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at port ${port}`));