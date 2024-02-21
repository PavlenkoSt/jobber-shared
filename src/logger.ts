import winston, { Logger } from "winston";
import {
  ElasticsearchTransformer,
  ElasticsearchTransport,
  TransformedData,
} from "winston-elasticsearch";

export const createLogger = (
  elasticsearchNode: string,
  name: string,
  level: string
): Logger => {
  const consoleTransport = new winston.transports.Console({
    level,
    format: winston.format.json(),
    handleExceptions: true,
  });

  const elasticsearchTransport = new ElasticsearchTransport({
    level,
    transformer: (logData): TransformedData => {
      return ElasticsearchTransformer(logData);
    },
    clientOpts: {
      node: elasticsearchNode,
      sniffOnStart: false,
      requestTimeout: 10000,
      maxRetries: 2,
    },
  });

  const logger = winston.createLogger({
    level,
    handleExceptions: true,
    format: winston.format.json(),
    defaultMeta: { service: name },
    exitOnError: false,
    transports: [consoleTransport, elasticsearchTransport],
  });

  return logger;
};
