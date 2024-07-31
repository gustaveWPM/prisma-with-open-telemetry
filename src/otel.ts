import type { Tracer } from '@opentelemetry/api';

import { TraceIdRatioBasedSampler, SimpleSpanProcessor, BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { PrismaInstrumentation } from '@prisma/instrumentation';
import { Resource } from '@opentelemetry/resources';
import { trace } from '@opentelemetry/api';

export default function initializeTracing(serviceName: string): Tracer {
  const traceRatio = process.env.NODE_ENV === 'production' ? 0.1 : 1.0;

  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName
    }),
    sampler: new TraceIdRatioBasedSampler(traceRatio)
  });

  const jaegerExporter = new OTLPTraceExporter();

  if (process.env.NODE_ENV === 'production') {
    provider.addSpanProcessor(new BatchSpanProcessor(jaegerExporter));
  } else {
    provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));
  }

  registerInstrumentations({
    instrumentations: [new PrismaInstrumentation()],
    tracerProvider: provider
  });

  provider.register();

  return trace.getTracer(serviceName);
}
