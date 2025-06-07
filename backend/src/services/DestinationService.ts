import { IDestinationService } from "./interfaces/IDestinationService";
import { IDestinationRepository } from "../repositories/interfaces/IDestinationRepository";
import { IDestination } from "../models/destinationModel";
import { Types } from "mongoose";

export class DestinationService implements IDestinationService {
  private destinationRepository: IDestinationRepository;

  constructor(destinationRepository: IDestinationRepository) {
    this.destinationRepository = destinationRepository;
  }

  async createDestination(destinationData: any, accountId: string, userId: string): Promise<IDestination> {
    const { url, http_method, headers } = destinationData;

    const newDestination = await this.destinationRepository.create({
      account_id: new Types.ObjectId(accountId),
      url,
      http_method: http_method.toUpperCase(),
      headers: headers || [],
      created_at: new Date(),
      updated_at: new Date(),
    });

    return newDestination;
  }

  async getDestinationById(id: string, accountId: string): Promise<IDestination | null> {
    return await this.destinationRepository.findByAccountAndId(accountId, id);
  }

  async getDestinationsByAccount(accountId: string): Promise<IDestination[]> {
    return await this.destinationRepository.findByAccountId(accountId);
  }

  async updateDestination(id: string, data: any, accountId: string, userId: string): Promise<IDestination | null> {
    const destination = await this.destinationRepository.findByAccountAndId(accountId, id);
    if (!destination) return null;

    const updateData = {
      ...data,
      updated_at: new Date(),
    };

    if (data.http_method) {
      updateData.http_method = data.http_method.toUpperCase();
    }

    return await this.destinationRepository.update(id, updateData);
  }

  async deleteDestination(id: string, accountId: string): Promise<boolean> {
    const destination = await this.destinationRepository.findByAccountAndId(accountId, id);
    if (!destination) return false;

    const result = await this.destinationRepository.delete(id);
    return !!result;
  }

  async searchDestinations(query: string, accountId: string): Promise<IDestination[]> {
    return await this.destinationRepository.findAll({
      account_id: new Types.ObjectId(accountId),
      $or: [
        { url: { $regex: query, $options: 'i' } },
        { http_method: { $regex: query, $options: 'i' } }
      ]
    });
  }
}