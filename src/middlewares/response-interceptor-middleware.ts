import { Request, Response, NextFunction } from 'express';

/**
 * Response interceptor middleware
 * Automatically sets HTTP status code from ApiResponse.statusCode
 * Eliminates need for manual res.status() calls in controllers
 *
 * @example
 * app.use(responseInterceptor);
 * // Now in controllers, just use:
 * res.json(ApiResponse.success({ data: user }));
 * // Status code is automatically set to 200
 */
export const responseInterceptorMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const originalJson = res.json.bind(res);

  res.json = function (body: any): Response {
    // If body is ApiResponse, extract statusCode and set it
    if (body && typeof body === 'object' && 'statusCode' in body) {
      res.status(body.statusCode);
    }
    return originalJson(body);
  };

  next();
};
