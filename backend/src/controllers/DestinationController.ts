import { Request, Response } from "express";
import { IDestinationService } from "../services/interfaces/IDestinationService";
import { IDestinationController } from "./interfaces/IDestinationController";

export class DestinationController implements IDestinationController {
  private destinationService: IDestinationService;

  constructor(destinationService: IDestinationService) {
    this.destinationService = destinationService;
  }

  async createDestination(req: Request, res: Response): Promise<void> {
    try {
      const { accountId } = req.params;
      // @ts-ignore
      const userId = req.user.id;
      
      const destination = await this.destinationService.createDestination(req.body, accountId, userId);
      res.status(201).json({
        success: true,
        message: "Destination created successfully",
        data: destination
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getDestinations(req: Request, res: Response): Promise<void> {
    try {
      const { accountId } = req.params;
      const destinations = await this.destinationService.getDestinationsByAccount(accountId);
      res.status(200).json({
        success: true,
        data: destinations
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getDestinationById(req: Request, res: Response): Promise<void> {
    try {
      const { accountId, id } = req.params;
      const destination = await this.destinationService.getDestinationById(id, accountId);
      
      if (!destination) {
        res.status(404).json({
          success: false,
          message: "Destination not found"
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: destination
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateDestination(req: Request, res: Response): Promise<void> {
    try {
      const { accountId, id } = req.params;
      // @ts-ignore
      const userId = req.user.id;
      
      const destination = await this.destinationService.updateDestination(id, req.body, accountId, userId);
      
      if (!destination) {
        res.status(404).json({
          success: false,
          message: "Destination not found"
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Destination updated successfully",
        data: destination
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteDestination(req: Request, res: Response): Promise<void> {
    try {
      const { accountId, id } = req.params;
      
      const deleted = await this.destinationService.deleteDestination(id, accountId);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: "Destination not found"
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Destination deleted successfully"
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async searchDestinations(req: Request, res: Response): Promise<void> {
    try {
      const { accountId } = req.params;
      const { q } = req.query;
      
      if (!q) {
        res.status(400).json({
          success: false,
          message: "Search query is required"
        });
        return;
      }

      const destinations = await this.destinationService.searchDestinations(q as string, accountId);
      res.status(200).json({
        success: true,
        data: destinations
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}