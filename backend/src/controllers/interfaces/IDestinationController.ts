import { Request, Response } from "express";

export interface IDestinationController {
  createDestination(req: Request, res: Response): Promise<void>;
  getDestinations(req: Request, res: Response): Promise<void>;
  getDestinationById(req: Request, res: Response): Promise<void>;
  updateDestination(req: Request, res: Response): Promise<void>;
  deleteDestination(req: Request, res: Response): Promise<void>;
  searchDestinations(req: Request, res: Response): Promise<void>;
}