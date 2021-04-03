const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const  mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// const corn = require('cors');
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');
const path = require('path');
const app = express();

//Body parser MiddleWare
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ type: 'application/*+json' }));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//DB Config
const db = require('./config/connect').mongoURI;

// mongo Db setup
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true }).catch(
  (error) =>console.log(JSON.stringify(error))
)
console.log('DB Connected!')
// const client = new MongoClient(db, { useNewUrlParser: true, useUnifiedTopology: true });
// client
//   .connect()
//   .then(() => console.log('DB Connected!'))
//   .catch(err => {
//     console.log(`DB Connection Error: ${err.message}`);
//   });

//Passport inilization
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//Define
// app.get('/', (req, res) => res.send(" Starting node server ....."));

//Define Routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);

//Server Static assets if in production
if(process.env.NODE_ENV === 'production'){
  //Set Static Folder
  app.use(express.static('client/build'));
  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// const hostname = '127.0.0.1';

const port = process.env.PORT || 5000;
// App listen on local 5000 port
app.listen(port, () => {
  // console.log(`Server running at http://${hostname}:${port}/`);
  console.log(`Server running at ${port}`);
});