const OpenAIApi = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
import OpenAIApi from 'openai';


const PORT = process.env.PORT || 3000;
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
            {role: 'user', content: req.body.prompt}
        ],
        max_tokens: 150
 
    }).then((data) => {
       
        const message = {message: data.choices[0].message.content};
        res.send(message);
    }).catch(() => {
        res.send('Sorry, an error occurred.');
    })
} catch (err) {
    const message = {message: 'Sorry, an error occurred.'};
   
    res.send(message);}
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
