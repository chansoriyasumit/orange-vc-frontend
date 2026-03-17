import { IServiceRepository } from '../types/IServiceRepository';
import { Service } from '../types/Service';
import servicesData from '../services.json';

export class StaticServiceRepository implements IServiceRepository {
  private services: Service[] = servicesData;

  async getAllServices(): Promise<Service[]> {
    return this.services;
  }

  async getServiceById(id: string): Promise<Service | null> {
    const service = this.services.find(s => s.id === id);
    return service || null;
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return this.services.filter(s => s.category === category);
  }

  async getPopularServices(): Promise<Service[]> {
    return this.services.filter(s => s.popular);
  }
}
