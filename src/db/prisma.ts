import initializeTracing from '../otel';
initializeTracing('poc');

// eslint-disable-next-line import/first
import { PrismaClient } from '@prisma/client';

export default new PrismaClient();
