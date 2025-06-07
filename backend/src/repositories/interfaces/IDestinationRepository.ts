import { IDestination } from "../../models/destinationModel";
import { IGenericRepository } from "../GenericRepository";

export interface IDestinationRepository extends IGenericRepository<IDestination> {
  findByAccountId(accountId: string): Promise<IDestination[]>;
  findByAccountAndId(accountId: string, destinationId: string): Promise<IDestination | null>;
}
