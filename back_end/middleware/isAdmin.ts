import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.headers.authorization;

    if (!sessionId) {
        return res.status(401).json({ error: 'Unauthorized: Session ID is missing' });
    }

    try {
        const session = await prisma.session.findUnique({
            where: {
                id: Number(sessionId),
            },
        });

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized: Invalid session ID' });
        }

        const currentTime = new Date();
        if (session.expiresAt <= currentTime) {
            return res.status(401).json({ error: 'Unauthorized: Session has expired' });
        }
        next()
    } catch (error) {
        console.error('Error checking session:', error);
        return res.status(500).json({ error: 'Failed to check session' });
    }
};


module.exports = {isAdmin}