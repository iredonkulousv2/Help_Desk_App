require('dotenv').config();
import express from 'express';

const cookieParser = require('cookie-parser');
const ticketsRouter = require('./routes/tickets');
const adminRouter = require('./routes/admin');


const cors = require('cors')
const app = express();
const path = require('path');

const port = 4000;

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
  
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())

app.use('/', express.static('public'));

app.use('/api/login', adminRouter)
app.use('/api/tickets', ticketsRouter)

app.get('/admin', (req,res) => {
  return res.send('admin dashboard')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

export default app;