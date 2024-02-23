"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const checkAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, password } = req.body;
    if (user === 'admin' && password === 'admin') {
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 5);
        try {
            const session = yield prisma.session.create({
                data: {
                    expiresAt: expirationTime
                },
            });
            return res.json({ admin: true, sessionId: session.id });
        }
        catch (error) {
            console.error('Error creating session:', error);
            return res.status(500).json({ error: 'Failed to create session' });
        }
    }
    else {
        return res.json({ admin: false });
    }
});
module.exports = {
    checkAdmin,
};
//# sourceMappingURL=adminController.js.map