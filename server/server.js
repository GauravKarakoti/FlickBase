const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const { checkToken } = require('./middleware/auth');
const articles = require('./routes/api/articles');
const cors = require('cors');
const files = require('./routes/api/files');
require('dotenv').config();
const mongoUri = process.env.MONGOURI;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
app.use(cors({
    origin: process.env.SITE_DOMAIN,
    credentials: true
}));
app.use(bodyParser.json());
app.use(checkToken);
app.use("/api/users", users);
app.use("/api/articles", articles);
app.use("/api/files", files);
app.use(express.static('client/build'));
if(process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});