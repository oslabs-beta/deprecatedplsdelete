/* tracing.js */

// Require dependencies
//WORKS
// const { WebTracerProvider } = require("@opentelemetry/web");
// const { SimpleSpanProcessor, ConsoleSpanExporter } = require("@opentelemetry/tracing");
// const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
// const { registerInstrumentations } = require('@opentelemetry/instrumentation');

// // Create a tracer provider
// const provider = new WebTracerProvider();

// // The exporter handles sending spans to your tracing backend
// const exporter = new ConsoleSpanExporter();

// // The simple span processor sends spans to the exporter as soon as they are ended.
// const processor = new SimpleSpanProcessor(exporter);
// provider.addSpanProcessor(processor);

// // The provider must be registered in order to
// // be used by the OpenTelemetry API and instrumentations
// provider.register();

// // // This will automatically enable all instrumentations
//   registerInstrumentations({
//     instrumentations: [getNodeAutoInstrumentations()],
//   });


//test with deno v that throws no errors, but does not log ot data
// const { WebTracerProvider } = require('@opentelemetry/web');
// const { ZoneContextManager } = require('@opentelemetry/context-zone');
// const { SimpleSpanProcessor, ConsoleSpanExporter } = require("@opentelemetry/tracing");


// const provider = new WebTracerProvider();
// console.log(provider);

// // // // The exporter handles sending spans to your tracing backend
// // const exporter = new ConsoleSpanExporter();

// provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

// provider.register({
//   // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
//   contextManager: new ZoneContextManager(),
// });



//Ania Kubow's exact code less zipkin

const { NodeTracerProvider } = require('@opentelemetry/node')
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing')
const provider = new NodeTracerProvider()
const consoleExporter = new ConsoleSpanExporter()
const spanProcessor = new SimpleSpanProcessor(consoleExporter)
provider.addSpanProcessor(spanProcessor)
provider.register();