import { Service } from './Service';

export interface IServiceRepository {
  getAllServices(): Promise<Service[]>;
  getServiceById(id: string): Promise<Service | null>;
  getServicesByCategory(category: string): Promise<Service[]>;
  getPopularServices(): Promise<Service[]>;
}
