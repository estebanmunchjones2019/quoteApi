const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`);
});

app.use(express.static('public'));

app.get('/api/quotes', (req,res,next)=>{
    if(!req.query.person){
        res.send({quotes: quotes});
    }else{
        let foundQuotes =[];
        quotes.forEach((quote)=>{
            if (quote.person.toLocaleLowerCase() == req.query.person.toLocaleLowerCase()){
                foundQuotes.push(quote);
            }
        });
        res.send({quotes: foundQuotes});
    }   
});

app.get('/api/quotes/random', (req,res,next)=>{
    let randomQuote = getRandomElement(quotes);
    res.send({quote: randomQuote});
});

app.post('/api/quotes',(req,res,next)=>{
    if(!req.query.quote || !req.query.person){
        res.status(400).send('Please fill out quote and person input fields');
    }else{
        quotes.push({
            quote: req.query.quote,
            person: req.query.person
        });
        console.log({
            quote: req.query.quote,
            person: req.query.person
        })
        res.send({
            quote: req.query.quote,
            person: req.query.person
        });
    }
});



