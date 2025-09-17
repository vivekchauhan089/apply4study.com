import { Application } from 'express';
import { warning } from '../../../../lib/log/logger.js';
import { Handler } from '../../../../lib/middleware/Handler.js';
import { Event } from '../watchHandler.js';

export function removeMiddleware(app: Application, event: Event) {
  try {
    const filePath = event.jsPath?.toString();
    Handler.removeMiddlewares(filePath);
  } catch (error) {
    warning(
      `Failed to remove middleware from ${event.jsPath}: ${error.message}. Skipping.`
    );
  }
}
