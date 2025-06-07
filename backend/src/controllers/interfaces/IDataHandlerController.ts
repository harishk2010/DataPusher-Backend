import { Request, Response } from "express";

export interface IDataHandlerController {
  handleIncomingData(req: Request, res: Response): Promise<void>;
}
