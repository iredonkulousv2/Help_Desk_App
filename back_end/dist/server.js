"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cookieParser = require('cookie-parser');
const ticketsRouter = require('./routes/api/tickets');
const adminRouter = require('./routes/api/admin');
const cors = require('cors');
const app = (0, express_1.default)();
const port = 3000;
const corsOptions = {
    origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(cookieParser());
app.use('/login', adminRouter);
app.use('/api/tickets', ticketsRouter);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map