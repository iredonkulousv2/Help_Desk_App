import app from '../server';

const ticketRoute = require("../routes/tickets");
app.use("/api/", ticketRoute);
module.exports = app;