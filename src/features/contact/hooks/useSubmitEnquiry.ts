import { useMutation } from '@tanstack/react-query';
import { contactApi } from '../services/contactApi';

export function useSubmitEnquiry() {
  return useMutation({
    mutationFn: contactApi.submitEnquiry,
  });
}
