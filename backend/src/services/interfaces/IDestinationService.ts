import { IDestination } from "../../models/destinationModel";

export interface IDestinationService {
  createDestination(destinationData: any, accountId: string, userId: string): Promise<IDestination>;
  getDestinationById(id: string, accountId: string): Promise<IDestination | null>;
  getDestinationsByAccount(accountId: string): Promise<IDestination[]>;
  updateDestination(id: string, data: any, accountId: string, userId: string): Promise<IDestination | null>;
  deleteDestination(id: string, accountId: string): Promise<boolean>;
  searchDestinations(query: string, accountId: string): Promise<IDestination[]>;
}
