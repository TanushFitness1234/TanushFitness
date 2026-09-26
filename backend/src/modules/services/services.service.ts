import { prisma } from '../../config/database';
import { ApiError } from '../../utils/apiError';
import { CreateServiceEnquiryInput } from './services.types';

export class BusinessServicesService {
  /**
   * Public: Get All Business Services
   */
  static async getServices() {
    return prisma.businessService.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        shortDesc: true,
        overview: true,
        image: true,
        badge: true,
      },
    });
  }

  /**
   * Public: Get Service Details by ID or Slug
   */
  static async getServiceById(idOrSlug: string) {
    const service = await prisma.businessService.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        deletedAt: null,
      },
    });

    if (!service) {
      throw ApiError.notFound('Business service not found');
    }

    return service;
  }

  /**
   * Protected (GYM_OWNER Only): Submit Service Consultation Request
   */
  static async createServiceEnquiry(userId: string, input: CreateServiceEnquiryInput) {
    const service = await prisma.businessService.findUnique({
      where: { id: input.serviceId },
    });

    if (!service) {
      throw ApiError.notFound('Target service not found');
    }

    const enquiry = await prisma.serviceEnquiry.create({
      data: {
        serviceId: input.serviceId,
        name: input.contactName,
        gymName: input.gymName,
        serviceRequired: service.name,
        mobile: input.contactPhone,
        email: input.contactEmail,
        additionalRequirements: input.requirements,
        createdById: userId,
      },
      include: {
        service: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    return enquiry;
  }
}
