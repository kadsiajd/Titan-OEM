import {  publicClient } from '@/utils/api-client';
import type {
  Customer,
  GetCustomersResponse,
} from '../types/about.types';

export const getCustomers = async (): Promise<Customer[]> => {
  const { data } = await publicClient.get<GetCustomersResponse>(
    '/customers',
  );

  return data.data;
};