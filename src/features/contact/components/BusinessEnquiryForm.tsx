'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Building2, Mail, MessageSquare, Phone, Send, Shield, User } from 'lucide-react';
import { useSubmitEnquiry } from '../hooks/useSubmitEnquiry';

const enquirySchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .regex(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
  company: z.string().min(1, 'Company name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || (/^\+?[0-9\s()-]+$/.test(val) && /\d/.test(val)),
      'Enter a valid phone number',
    ),
  message: z.string().optional(),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

export function BusinessEnquiryForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutateAsync, isPending, isError } = useSubmitEnquiry();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    mode: 'onChange',
  });

  async function onSubmit(values: EnquiryFormValues) {
    try {
      await mutateAsync(values);
      setIsSubmitted(true);
      reset();
    } catch {
      // isError from useSubmitEnquiry already drives the visible error message below
    }
  }

  return (
    <section className="flex min-h-screen items-center bg-gray-50 py-16">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <span className="block h-1 w-12 bg-brand-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Business Enquiry
          </h2>

          <span className="mt-8 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <MessageSquare className="h-5 w-5" />
          </span>

          <h3 className="mt-4 text-lg font-bold text-gray-900">Let&apos;s Work Together</h3>
          <p className="mt-3 text-gray-600">
            Have a question or looking for a custom manufacturing solution? Fill out the form and
            our team will get back to you shortly.
          </p>

          <div className="mt-8 overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/enquiry.jpg"
              alt="Precision manufactured components"
              className="h-48 w-full object-cover"
            />
          </div>
        </div>

        <div>
          <div className="rounded-lg bg-white p-6 shadow-sm sm:p-10">
            {isSubmitted ? (
              <div className="py-12 text-center">
                <p className="text-lg font-semibold text-gray-900">Thank you for reaching out!</p>
                <p className="mt-2 text-gray-600">
                  Your enquiry has been received. Our team will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-gray-900">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-2">
                      <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        {...register('name')}
                        className="w-full rounded-md border border-gray-300 py-2.5 pl-10 pr-3 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-900">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-2">
                      <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter your company name"
                        {...register('company')}
                        className="w-full rounded-md border border-gray-300 py-2.5 pl-10 pr-3 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
                      />
                    </div>
                    {errors.company && (
                      <p className="mt-1 text-xs text-red-600">{errors.company.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-900">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-2">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        {...register('email')}
                        className="w-full rounded-md border border-gray-300 py-2.5 pl-10 pr-3 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-900">Phone Number</label>
                    <div className="relative mt-2">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        {...register('phone')}
                        className="w-full rounded-md border border-gray-300 py-2.5 pl-10 pr-3 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="text-sm font-semibold text-gray-900">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Type your message here..."
                    {...register('message')}
                    className="mt-2 w-full rounded-md border border-gray-300 p-3 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
                  />
                </div>

                {isError && (
                  <p className="mt-4 text-sm text-red-600">
                    Something went wrong submitting your enquiry. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {isPending ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 text-center">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Shield className="h-4 w-4" />
            </span>
            <p className="text-sm text-gray-600">
              Your information is secure and will only be used to respond to your enquiry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
