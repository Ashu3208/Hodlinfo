const express = require('express');
const axios = require('axios');
const path = require('path');
const mongoose=require('mongoose')
const Ticker = require('./model')
require('dotenv').config()
const app = express();

mongoose.connect(process.env.DB_CONNECT)
  .then(() => console.log('Database Connected!'));

  app.get('/api/data', async (req, res) => {
    try {
      const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
      const data = response.data;
      const dataArray = Object.values(data);
      const top10 = dataArray.slice(0, 10).map(item => ({
        name: item.name,
        last: item.last,
        buy: item.buy,
        sell: item.sell,
        volume: item.volume,
        base_unit: item.base_unit
      }));
  
      // Save the data to the database
      await Ticker.insertMany(top10);
  
      console.log(top10);
      res.json(top10);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data from the API');
    }
  });
  app.use(express.static('public'));
  
  app.get('/', async (req, res) => {
    try {
      const tickers = await Ticker.find().limit(10);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data from the database');
    }
    res.sendFile(path.join(__dirname, 'index.html'));
  });



app.listen(8000, () => {
  console.log('Server started on port 8000');
});




