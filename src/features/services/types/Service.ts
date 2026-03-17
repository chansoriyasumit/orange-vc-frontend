export interface Service {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  rating: number;
  icon: string;
  price: {
    monthly: number;
    quarterly: number;
    annual: number;
  };
  features: string[];
  popular?: boolean;
}
