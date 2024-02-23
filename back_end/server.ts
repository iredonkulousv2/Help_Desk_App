require('dotenv').config();
import express from 'express';
const cookieParser = require('cookie-parser');
const ticketsRouter = require('./routes/api/tickets');
const adminRouter = require('./routes/api/admin');


const cors = require('cors')
const app = express();
const port = 3000;

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
  
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req,res) => {
  return res.send('express typescript on vercel@@@')
})
app.get('/admin', (req,res) => {
  return res.send('admin dashboard')
})
app.use('/login', adminRouter)
app.use('/api/tickets', ticketsRouter)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

module.exports = app;