console.log('\nRunning server...');

import express from 'express';

// ===========[ Internal Imports ]==============
import db from './config/db.config';
import userRoute from './routes/User';
import venicleRoute from './routes/Venicles';
import saleRoute from './routes/Sales';
// =============================================

db.sync().then(() => {
    console.log('Database synced')
});

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());

// ===========[ Internal Routes ]==============
app.use('/api/users', userRoute);
app.use('/api/venicles', venicleRoute);
app.use('/api/sales', saleRoute);
// ============================================

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});