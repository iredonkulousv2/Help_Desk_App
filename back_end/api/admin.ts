import app from '../server';

const adminRoute = require("../routes/test");
app.use("/api/", adminRoute);


module.exports = app;