
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static('public'));
app.use(bodyParser.json())
  
  const MongoClient = require('mongodb').MongoClient;

  MongoClient.connect('mongodb+srv://pgumas:Westbrook36@cluster0.qqqzm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
        .then(results => {
            res.render('index.ejs', {quotes: results })
        })
        .catch()
    });
    const quotesCollection = db.collection('quotes')
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error));
      })
      app.put('/quotes', (req, res) => {
       // console.log(req.body)
        quotesCollection.findOneAndUpdate(
            { name: 'Yoda' },
            {
              $set: {
                name: req.body.name,
                quote: req.body.quote
              }
            },
            {
                upsert: true
            }
          )
            .then(result => {
                res.json('Success');
            })
            .catch(error => console.error(error))
      })
      app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
          { name: req.body.name },
        )
        .then(result => {
          res.json(`Deleted Peter's quote`)
          console.log(result)
        })
        .catch(error => console.error(error))
      })
    
  })
      app.listen(3000, function() {
        console.log('listening on 3000')
    });
  