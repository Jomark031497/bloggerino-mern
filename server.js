const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/api/userRoute');
const blogRoute = require('./routes/api/blogRoute');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.db_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
  // eslint-disable-next-line
  console.log('Connected to mongoDB');
});

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
// routes
app.use('/api/users', userRoute);
app.use('/api/blogs', blogRoute);

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server listening at port ${5000}`);
});
