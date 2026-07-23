export interface CreateEnquiryRequest {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string | null;
  message: string | null;
  createdAt: string;
}
