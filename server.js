const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3999;

app.use(cors());
app.use(express.json());
app.get('/weather', async (req, res) => {
  try {
    const apiKey = '';  //get a api Key from openweathermap.org and initialize this apiKey with that. 
    const city = req.query.city;
    console.log(city);
    const forecastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    const forecastData = forecastResponse.data.list;
    const temperatureData = forecastData.map(item => ({
      time: item.dt_txt,
      temperature: item.main.temp,
      humidity:item.main.humidity,
      windspeed:item.wind.speed,
      description:item.weather[0].description
    }));
    res.json(temperatureData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
   
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});