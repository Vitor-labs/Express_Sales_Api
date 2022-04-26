console.log('\nRunning server...');

import express from 'express';

// internal imports
import db from './config/db.config';
import userRoute from './routes/User';
import venicleRoute from './routes/Venicles';

db.sync().then(() => {
    console.log('Database synced')
});

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());

// Internal Routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/venicles', venicleRoute);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});