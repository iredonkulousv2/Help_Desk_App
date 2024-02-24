import app from '../server'
const loginRoute = require("../routes/admin");
app.use("/api/", loginRoute);
module.exports = app;