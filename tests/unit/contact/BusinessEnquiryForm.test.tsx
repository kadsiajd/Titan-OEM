import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BusinessEnquiryForm } from '@/features/contact/components/BusinessEnquiryForm';
import { useSubmitEnquiry } from '@/features/contact/hooks/useSubmitEnquiry';

vi.mock('@/features/contact/hooks/useSubmitEnquiry');

describe('BusinessEnquiryForm', () => {
  const mutateAsync = vi.fn();

  beforeEach(() => {
    mutateAsync.mockReset();
    vi.mocked(useSubmitEnquiry).mockReturnValue({
      mutateAsync,
      isPending: false,
      isError: false,
    } as unknown as ReturnType<typeof useSubmitEnquiry>);
  });

  it('renders every field of the enquiry form', () => {
    render(<BusinessEnquiryForm />);

    expect(screen.getByText('Business Enquiry')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your company name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your phone number')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit enquiry/i })).toBeInTheDocument();
  });

  it('shows validation errors when required fields are missing', async () => {
    render(<BusinessEnquiryForm />);

    fireEvent.click(screen.getByRole('button', { name: /submit enquiry/i }));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Company name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(mutateAsync).not.toHaveBeenCalled();
  });

  it('submits the enquiry and shows a confirmation message', async () => {
    mutateAsync.mockResolvedValue(undefined);
    render(<BusinessEnquiryForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your company name'), {
      target: { value: 'Acme Corp' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email address'), {
      target: { value: 'jane@acme.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit enquiry/i }));

    expect(await screen.findByText('Thank you for reaching out!')).toBeInTheDocument();
    expect(mutateAsync).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Jane Doe', company: 'Acme Corp', email: 'jane@acme.com' })
    );
  });

  it('does not show a success message when the submission fails, and does not throw', async () => {
    mutateAsync.mockRejectedValue(new Error('network error'));
    render(<BusinessEnquiryForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your company name'), {
      target: { value: 'Acme Corp' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email address'), {
      target: { value: 'jane@acme.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit enquiry/i }));

    await waitFor(() => expect(mutateAsync).toHaveBeenCalled());
    expect(screen.queryByText('Thank you for reaching out!')).not.toBeInTheDocument();
  });

  it('accepts a formatted international phone number', async () => {
    mutateAsync.mockResolvedValue(undefined);
    render(<BusinessEnquiryForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your company name'), {
      target: { value: 'Acme Corp' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email address'), {
      target: { value: 'jane@acme.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your phone number'), {
      target: { value: '+1 234-567-8900' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit enquiry/i }));

    expect(await screen.findByText('Thank you for reaching out!')).toBeInTheDocument();
    expect(mutateAsync).toHaveBeenCalledWith(
      expect.objectContaining({ phone: '+1 234-567-8900' }),
    );
  });

  it('rejects a phone number containing letters', async () => {
    render(<BusinessEnquiryForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your company name'), {
      target: { value: 'Acme Corp' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email address'), {
      target: { value: 'jane@acme.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your phone number'), {
      target: { value: '123-abc-4567' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit enquiry/i }));

    expect(await screen.findByText('Enter a valid phone number')).toBeInTheDocument();
    expect(mutateAsync).not.toHaveBeenCalled();
  });
});
