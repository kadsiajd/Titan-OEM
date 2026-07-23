import type { CreateEnquiryRequest, Enquiry } from '@/features/contact/types/enquiry.types';

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockContactApi = {
  submitEnquiry: async (payload: CreateEnquiryRequest): Promise<Enquiry> => {
    await delay();

    return {
      id: `enquiry-${Date.now()}`,
      name: payload.name,
      company: payload.company,
      email: payload.email,
      phone: payload.phone ?? null,
      message: payload.message ?? null,
      createdAt: new Date().toISOString(),
    };
  },
};
