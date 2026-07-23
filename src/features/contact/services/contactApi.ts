import { useMockData } from '@/config/use-mock-data';
import { mockContactApi } from '@/mocks/mock-contact-api';
import { publicClient } from '@/utils/api-client';
import type { CreateEnquiryRequest, Enquiry } from '../types/enquiry.types';

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

export const contactApi = {
  submitEnquiry: async (payload: CreateEnquiryRequest): Promise<Enquiry> => {
    if (useMockData) {
      return mockContactApi.submitEnquiry(payload);
    }
    const { data } = await publicClient.post<ApiEnvelope<Enquiry>>('/enquiries', payload);
    return data.data;
  },
};
