import { Request, Response } from 'express';
import { ApiResponse } from '#/http/api-response.js';
import { sendApiResponse } from '#/http/send-api-response.js';
import { DashboardService } from './dashboard-service.js';

export class DashboardController {
  static async getCurrentMonthSummary(req: Request, res: Response) {
    const data = await DashboardService.getCurrentMonthSummary(
      req.token?.userId as string,
    );
    sendApiResponse(
      res,
      ApiResponse.success({ data, message: 'Dashboard fetched' }),
    );
  }
}
