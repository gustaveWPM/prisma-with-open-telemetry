import { PrismaInstrumentation } from '@prisma/instrumentation';

import initializeTracing from '../otel';
export const prismaTelemetry = initializeTracing({ instrumentations: [new PrismaInstrumentation()], serviceVersion: '0.0.1', serviceName: 'prisma' });

// eslint-disable-next-line import/first
import { PrismaClient } from '@prisma/client';

export default new PrismaClient();
