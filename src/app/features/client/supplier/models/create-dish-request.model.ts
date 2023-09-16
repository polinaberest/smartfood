export interface CreateDishRequest {
  supplierId: string;
  name: string;
  description: string | null;
  price: number;
}
