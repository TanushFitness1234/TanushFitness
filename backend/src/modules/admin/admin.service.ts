import { UserRole, UserStatus, EnquiryStatus } from '@prisma/client';
import { prisma } from '../../config/database';
import { ApiError } from '../../utils/apiError';
import { logger } from '../../config/logger';

export class AdminService {
  /**
   * Protected (ADMIN Only): Platform Overview & Stats Dashboard
   */
  static async getDashboardStats() {
    const [
      totalUsers,
      totalGymOwners,
      totalJobSeekers,
      totalEquipmentEnquiries,
      totalServiceEnquiries,
      totalJobs,
      totalApplications,
      recentAuditLogs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: UserRole.GYM_OWNER } }),
      prisma.user.count({ where: { role: UserRole.JOB_SEEKER } }),
      prisma.equipmentEnquiry.count(),
      prisma.serviceEnquiry.count(),
      prisma.job.count({ where: { isActive: true } }),
      prisma.jobApplication.count(),
      prisma.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          admin: {
            select: { id: true, email: true, name: true },
          },
        },
      }),
    ]);

    return {
      stats: {
        totalUsers,
        totalGymOwners,
        totalJobSeekers,
        totalEquipmentEnquiries,
        totalServiceEnquiries,
        totalJobs,
        totalApplications,
      },
      recentAuditLogs,
    };
  }

  // =========================================================
  // MODULE 1: USER MANAGEMENT & VERIFICATION
  // =========================================================

  static async getUsers(filters: {
    role?: UserRole;
    status?: UserStatus;
    isVerified?: boolean;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Math.max(1, filters.page || 1);
    const limit = Math.max(1, Math.min(100, filters.limit || 20));
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filters.role) where.role = filters.role;
    if (filters.status) where.status = filters.status;
    if (filters.isVerified !== undefined) where.isVerified = filters.isVerified;

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { mobile: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          gymOwnerProfile: true,
          jobSeekerProfile: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    // Sanitize passwords out
    const sanitized = users.map(u => {
      const { password, ...userWithoutPass } = u;
      return userWithoutPass;
    });

    return {
      users: sanitized,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async updateUserStatus(adminId: string, userId: string, status: UserStatus) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw ApiError.notFound('User not found');

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        status,
        isActive: status === UserStatus.ACTIVE,
      },
    });

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        adminId,
        action: `UPDATE_USER_STATUS_${status}`,
        entity: 'User',
        entityId: userId,
      },
    });

    logger.info(`🛡️ Admin [${adminId}] updated status of User [${user.email}] to [${status}]`);
    return updated;
  }

  static async verifyUser(adminId: string, userId: string, isVerified: boolean) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw ApiError.notFound('User not found');

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        isVerified,
        emailVerified: isVerified,
        mobileVerified: isVerified,
      },
    });

    await prisma.auditLog.create({
      data: {
        adminId,
        action: isVerified ? 'VERIFY_USER_GST' : 'UNVERIFY_USER',
        entity: 'User',
        entityId: userId,
      },
    });

    return updated;
  }

  // =========================================================
  // MODULE 2: CATALOG MANAGEMENT
  // =========================================================

  static async createProduct(adminId: string, data: any) {
    const slug = data.slug || `${data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`;

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug,
        brand: data.brand,
        categoryId: data.categoryId,
        equipmentType: data.equipmentType || 'Strength',
        applicationTypes: data.applicationTypes || ['Commercial Gym'],
        minOrderQty: data.minOrderQty || 1,
        leadTime: data.leadTime || '7-14 Days',
        badge: data.badge || null,
        description: data.description,
        image: data.image || 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
        gallery: data.gallery || [],
        specs: data.specs || {},
        features: data.features || [],
        createdById: adminId,
      },
    });

    await prisma.auditLog.create({
      data: {
        adminId,
        action: 'CREATE_PRODUCT',
        entity: 'Product',
        entityId: product.id,
      },
    });

    return product;
  }

  static async updateProduct(adminId: string, id: string, data: any) {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) throw ApiError.notFound('Product not found');

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: data.name ?? existing.name,
        brand: data.brand ?? existing.brand,
        categoryId: data.categoryId ?? existing.categoryId,
        equipmentType: data.equipmentType ?? existing.equipmentType,
        minOrderQty: data.minOrderQty ?? existing.minOrderQty,
        leadTime: data.leadTime ?? existing.leadTime,
        inStock: data.inStock ?? existing.inStock,
        badge: data.badge !== undefined ? data.badge : existing.badge,
        description: data.description ?? existing.description,
        image: data.image ?? existing.image,
        gallery: data.gallery ?? existing.gallery,
        specs: data.specs ?? existing.specs,
        features: data.features ?? existing.features,
        updatedById: adminId,
      },
    });

    await prisma.auditLog.create({
      data: {
        adminId,
        action: 'UPDATE_PRODUCT',
        entity: 'Product',
        entityId: id,
      },
    });

    return updated;
  }

  static async deleteProduct(adminId: string, id: string) {
    const updated = await prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await prisma.auditLog.create({
      data: {
        adminId,
        action: 'DELETE_PRODUCT',
        entity: 'Product',
        entityId: id,
      },
    });

    return updated;
  }

  // =========================================================
  // MODULE 3: PDF QUOTATION GENERATOR & DISPATCH
  // =========================================================

  static async generateQuotation(adminId: string, enquiryId: string, quoteData: any) {
    const enquiry = await prisma.equipmentEnquiry.findUnique({
      where: { id: enquiryId },
      include: { items: { include: { product: true } } },
    });

    if (!enquiry) throw ApiError.notFound('RFQ Enquiry not found');

    // Update status to QUOTATION_SENT
    const updatedEnquiry = await prisma.equipmentEnquiry.update({
      where: { id: enquiryId },
      data: {
        status: EnquiryStatus.QUOTATION_SENT,
        updatedById: adminId,
      },
    });

    await prisma.auditLog.create({
      data: {
        adminId,
        action: 'GENERATE_B2B_QUOTATION',
        entity: 'EquipmentEnquiry',
        entityId: enquiryId,
      },
    });

    return {
      rfqReference: enquiry.rfqReference,
      companyGymName: enquiry.companyGymName,
      contactName: enquiry.name,
      contactMobile: enquiry.mobile,
      contactEmail: enquiry.email,
      quote: quoteData,
      updatedEnquiry,
    };
  }

  // =========================================================
  // MODULE 4: JOB MODERATION
  // =========================================================

  static async getPendingJobs() {
    return prisma.job.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        gymOwner: {
          select: { id: true, companyName: true, phone: true, city: true },
        },
      },
    });
  }

  static async moderateJob(adminId: string, jobId: string, action: 'APPROVE' | 'REJECT') {
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) throw ApiError.notFound('Job posting not found');

    const isActive = action === 'APPROVE';

    const updated = await prisma.job.update({
      where: { id: jobId },
      data: {
        isActive,
        updatedById: adminId,
      },
    });

    await prisma.auditLog.create({
      data: {
        adminId,
        action: `MODERATE_JOB_${action}`,
        entity: 'Job',
        entityId: jobId,
      },
    });

    return updated;
  }

  // =========================================================
  // MODULE 5: ANALYTICS & CSV EXPORT
  // =========================================================

  static async getDemandTrends() {
    const items = await prisma.equipmentEnquiryItem.findMany({
      include: {
        product: { select: { name: true, brand: true } },
      },
    });

    const demandMap: Record<string, { name: string; brand: string; count: number }> = {};

    items.forEach(item => {
      if (item.product) {
        const key = item.product.name;
        if (!demandMap[key]) {
          demandMap[key] = { name: item.product.name, brand: item.product.brand, count: 0 };
        }
        demandMap[key].count += item.quantity;
      }
    });

    const sortedDemand = Object.values(demandMap).sort((a, b) => b.count - a.count);

    return {
      topDemandedProducts: sortedDemand.slice(0, 10),
    };
  }

  static async exportReport(entity: string) {
    if (entity === 'enquiries') {
      const data = await prisma.equipmentEnquiry.findMany({
        orderBy: { createdAt: 'desc' },
        include: { items: { include: { product: { select: { name: true } } } } },
      });
      return data;
    } else if (entity === 'users') {
      const data = await prisma.user.findMany({
        select: { id: true, name: true, email: true, mobile: true, role: true, status: true, isVerified: true, createdAt: true },
      });
      return data;
    } else if (entity === 'jobs') {
      const data = await prisma.job.findMany({
        include: { _count: { select: { applications: true } } },
      });
      return data;
    } else if (entity === 'services') {
      const data = await prisma.serviceEnquiry.findMany();
      return data;
    }
    throw ApiError.badRequest('Invalid entity for report export');
  }

  // =========================================================
  // MODULE 6: PLATFORM SYSTEM SETTINGS
  // =========================================================

  static async getSettings() {
    const settings = await prisma.setting.findMany();
    const map: Record<string, any> = {};
    settings.forEach(s => {
      map[s.key] = s.value;
    });
    return map;
  }

  static async updateSettings(adminId: string, settingsObj: Record<string, any>) {
    const updates = Object.entries(settingsObj).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    );

    await prisma.$transaction(updates);

    await prisma.auditLog.create({
      data: {
        adminId,
        action: 'UPDATE_SYSTEM_SETTINGS',
        entity: 'Setting',
        entityId: 'global',
      },
    });

    return this.getSettings();
  }
}
