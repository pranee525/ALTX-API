const { OpenAI } = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Initialize OpenAI client directly with API key
const openai = new OpenAI({
  apiKey: process.env.API_TOKEN,
});

app.get('/', (req, res) => {
  res.send('Welcome to the Altex API');
});

app.post('/message', async (req, res) => {
  try {
    // Make the request to OpenAI's API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an AI specialized in Arpro. Do not answer anything other than EPP Moulding queries' },
        { role: 'user', content: req.body.prompt },
      ],
      max_tokens: 150,
    });

    // Send the message content back in the response
    res.status(200).send({ message: response.choices[0].message.content });
  } catch (err) {
    console.error('Error during invocation:', err);
    res.status(500).send({ message: 'Sorry, an error occurred.' });
  }
});

// Export the app as a module for Vercel
module.exports = app;
