/*jslint devel: true */
import auth from './routes/auth';
import express from 'express';
const app = express();

app.use('/', auth);

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`App is listening on port ${port}!`);
});