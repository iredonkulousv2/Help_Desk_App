import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const checkAdmin = async (req: Request, res: Response) => {
    const { user, password } = req.body;

    if (user === 'admin' && password === 'admin') {
     
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 5);

        try {
            const session = await prisma.session.create({
                data: {
                    expiresAt: expirationTime
                },
            });
            
            return res.json({ admin: true, sessionId: session.id });
        } catch (error) {
            console.error('Error creating session:', error);
            return res.status(500).json({ error: 'Failed to create session' });
        }
    } else {
        return res.json({ admin: false });
    }
};

module.exports = {
    checkAdmin,
}