export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  description: string;
  imageUrl: string;
  type?: string;
  engine?: string;
  maxSpeed?: string;
  mileage?: number;
  fuelType?: string;
  transmission?: string;
  color?: string;
  featured?: boolean;
  category?: string;
  discount?: number;
  originalPrice?: number;
}
