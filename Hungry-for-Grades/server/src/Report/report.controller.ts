import { HttpResponse } from '@Utils/HttpResponse';
import HttpStatusCodes from '@Utils/HttpStatusCodes';
import { NextFunction, Request, Response } from 'express';
import ReportService from './report.dao';
import { ReportDTO } from './report.dto';
import { IReportFilters, Report } from './report.interface';

class ReportController {
  public reportService = new ReportService();

  //request a course controller
  public reportProblemOrRequestCourse = async (req: Request, res: Response<HttpResponse<object>>, next: NextFunction) => {
    try {
      const reportData: ReportDTO = req.body;
      const createdReport = await this.reportService.reportProblemOrRequestCourse(reportData);
      res.status(HttpStatusCodes.CREATED).json({ data: createdReport, message: 'Request Created Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // get report by id
  public getReportById = async (req: Request, res: Response<HttpResponse<Report>>, next: NextFunction) => {
    try {
      const { reportId } = req.params;
      const report = await this.reportService.getReportById(reportId);
      res.status(HttpStatusCodes.OK).json({ data: report, message: 'Report Rejected Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // update report controller
  public updateReport = async (req: Request, res: Response<HttpResponse<Report>>, next: NextFunction) => {
    try {
      const { reportId } = req.params;
      const reportData: ReportDTO = req.body;
      const updatedReport = await this.reportService.updateReport(reportId, reportData);
      res.status(HttpStatusCodes.OK).json({ data: updatedReport, message: 'Report Updated Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  //delete report
  public deleteReport = async (req: Request, res: Response<HttpResponse<Report>>, next: NextFunction) => {
    try {
      const { reportId } = req.params;
      const report = await this.reportService.deleteReport(reportId);
      res.status(HttpStatusCodes.OK).json({ data: report, message: 'Report Deleted Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // get all reports controller
  public getAllReports = async (req: Request, res: Response<HttpResponse<Report[]>>, next: NextFunction) => {
    try {
      const reportFilters = req.query as unknown as IReportFilters;
      //default page and limit
      if (!reportFilters.page) reportFilters.page = 1;
      else reportFilters.page = parseInt(`${reportFilters.page}`);

      if (!reportFilters.limit) reportFilters.limit = 10;
      else reportFilters.limit = parseInt(`${reportFilters.limit}`);

      // If sent as comma seperated string, convert to array
      if (typeof reportFilters.reason === 'string') {
        reportFilters.reason = reportFilters.reason.split(',');
        reportFilters.reason = reportFilters.reason.map(reason => reason.trim());
      }

      const paginatedReponse = await this.reportService.getAllReports(reportFilters);
      res.status(HttpStatusCodes.OK).json({ ...paginatedReponse, message: 'Reports Retrieved Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // add follow up message controller
  public addFollowUpMessage = async (req: Request, res: Response<HttpResponse<Report>>, next: NextFunction) => {
    try {
      const { reportId, userId } = req.params;
      const followUpMessage = req.body;
      const updatedReport = await this.reportService.addMessageToFollowUp(userId, reportId, followUpMessage);
      res.status(HttpStatusCodes.OK).json({ data: updatedReport, message: 'Follow Up Message Added Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };
}

export default ReportController;
