const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const trendsRouter = require('./routes/trends');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/trends', trendsRouter);

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/trend-arbitrage';

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
  console.log('Connected to MongoDB');
  app.listen(PORT, ()=>console.log(`Server listening ${PORT}`));
}).catch(err=>{
  console.error('Mongo connection error', err);
  app.listen(PORT, ()=>console.log(`Server listening ${PORT} (no mongo)`));
});
