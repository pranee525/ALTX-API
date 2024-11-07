const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
    apiKey: process.env.API_TOKEN,
});
const openai = new OpenAIApi(configuration);

app.get('/', (req, res) => {
    res.send('Welcome to the Altex API');
});

app.post('/message', async (req, res) => {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are an AI specialized in Arpro. Do not answer anything other than EPP Moulding queries' },
                { role: 'user', content: req.body.prompt }
            ],
            max_tokens: 150,
        });

        const message = { message: response.data.choices[0].message.content };
        res.status(200).send(message);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({ message: 'Sorry, an error occurred.' });
    }
});

// Export the app as a module for Vercel
module.exports = app;
