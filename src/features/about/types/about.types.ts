export interface Customer {
  id: string;
  name: string;
  logoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetCustomersResponse {
  success: boolean;
  data: Customer[];
}