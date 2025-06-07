import { IDestination, DestinationModel } from "../models/destinationModel";
import { GenericRepository } from "./GenericRepository";
import { IDestinationRepository } from "./interfaces/IDestinationRepository";
import { Types } from "mongoose";

export class DestinationRepository
  extends GenericRepository<IDestination>
  implements IDestinationRepository
{
  constructor() {
    super(DestinationModel);
  }

  async findByAccountId(accountId: string): Promise<IDestination[]> {
    return await this.model.find({ account_id: new Types.ObjectId(accountId) });
  }

  async findByAccountAndId(accountId: string, destinationId: string): Promise<IDestination | null> {
    return await this.model.findOne({ 
      _id: destinationId, 
      account_id: new Types.ObjectId(accountId) 
    });
  }
}