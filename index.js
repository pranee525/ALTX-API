const OpenAIApi = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAIApi({
    apiKey: process.env.API_TOKEN
});



app.get('/', (req, res) => {
    res.send('Welcome to the Altex API')
})

app.post('/message', async (req, res) => {
    try{
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {role: 'system', content: 'You are an AI specialized in Arpro. Do not answer anything other than EPP Moulding queries'},
            {role: 'user', content: req.body.message}
        ],
        max_tokens: 150
  
    });

    response.then((data) => {
        const message = {message: data.choices[0].message.content};
        res.send(message);
    }).catch(() => {
        res.send('Sorry, an error occurred.');
    })
} catch (err) {
    const message = {message: 'Sorry, an error occurred.'};
    res.send(message);}
});

app.listen(3000, () => console.log('Listening on port 3000'));