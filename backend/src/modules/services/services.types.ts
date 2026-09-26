export interface CreateServiceEnquiryInput {
  serviceId: string;
  gymName: string;
  city: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  requirements: string;
  preferredDate?: string;
}
