import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();

import authRoute from './src/routes/authRoute'

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoute);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});