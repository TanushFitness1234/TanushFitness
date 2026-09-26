import crypto from 'crypto';
import { prisma } from '../../config/database';
import { ApiError } from '../../utils/apiError';
import { supabaseAdmin } from '../../config/supabase';
import { UserCartStorage } from './userCartStorage';
import { ProductQueryFilters, CreateEquipmentEnquiryInput } from './equipment.types';

export class EquipmentService {
  /**
   * Public: Get Equipment Categories
   */
  static async getCategories() {
    return prisma.equipmentCategory.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        image: true,
        itemCount: true,
      },
    });
  }

  /**
   * Public: Query & Filter Products
   */
  static async getProducts(filters: ProductQueryFilters) {
    const page = Math.max(1, filters.page || 1);
    const limit = Math.max(1, Math.min(100, filters.limit || 12));
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
    };

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { brand: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters.brand) {
      where.brand = { equals: filters.brand, mode: 'insensitive' };
    }

    if (filters.category) {
      where.OR = [
        { categoryId: filters.category },
        { category: { slug: filters.category } },
        { category: { name: { contains: filters.category, mode: 'insensitive' } } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
          images: {
            select: { url: true, isPrimary: true },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Public: Get Product Details by ID or Slug
   */
  static async getProductById(idOrSlug: string) {
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        deletedAt: null,
      },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
        images: true,
      },
    });

    if (!product) {
      throw ApiError.notFound('Equipment product not found');
    }

    // Fetch related products in same category
    const relatedProducts = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
        deletedAt: null,
      },
      take: 4,
      select: {
        id: true,
        name: true,
        slug: true,
        brand: true,
        image: true,
      },
    });

    return {
      ...product,
      relatedProducts,
    };
  }

  /**
   * Protected (GYM_OWNER Only): Submit Equipment RFQ Enquiry
   */
  static async createEnquiry(userId: string, input: CreateEquipmentEnquiryInput) {
    const gymOwner = await prisma.gymOwner.findUnique({
      where: { userId },
    });

    // Generate RFQ reference (e.g., RFQ-2026-XXXX)
    const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
    const rfqReference = `RFQ-${new Date().getFullYear()}-${randomHex}`;

    const enquiry = await prisma.equipmentEnquiry.create({
      data: {
        rfqReference,
        gymOwnerId: gymOwner?.id || null,
        name: input.contactName,
        companyGymName: input.gymName,
        mobile: input.contactPhone,
        email: input.contactEmail,
        city: input.city,
        requirements: input.notes || null,
        createdById: userId,
        items: {
          create: input.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            notes: item.notes || null,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: {
              select: { id: true, name: true, brand: true, image: true },
            },
          },
        },
      },
    });

    return enquiry;
  }

  /**
   * User Project RFQ Basket: Get saved items for a specific user
   */
  static async getUserCart(userKey: string) {
    if (!userKey || !userKey.trim()) return [];
    const cleanKey = userKey.trim().toLowerCase();

    // 1. Try Supabase
    try {
      const { data, error } = await supabaseAdmin
        .from('user_rfq_baskets')
        .select('*')
        .eq('user_key', cleanKey)
        .maybeSingle();

      if (!error && data?.items && Array.isArray(data.items)) {
        UserCartStorage.save(cleanKey, data.items, data.metadata);
        return data.items;
      }
    } catch (_err) {
      // ignore, fall back to local store
    }

    // 2. Return from resilient persistent store
    return UserCartStorage.get(cleanKey);
  }

  /**
   * User Project RFQ Basket: Save or sync items for a specific user
   */
  static async syncUserCart(userKey: string, items: any[], metadata?: any) {
    if (!userKey || !userKey.trim()) return [];
    const cleanKey = userKey.trim().toLowerCase();
    const safeItems = Array.isArray(items) ? items : [];

    // 1. Persist locally immediately
    UserCartStorage.save(cleanKey, safeItems, metadata);

    // 2. Sync to Supabase
    try {
      await supabaseAdmin.from('user_rfq_baskets').upsert(
        {
          user_key: cleanKey,
          items: safeItems,
          metadata: metadata || {},
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_key' }
      );
    } catch (_err) {
      // ignore error
    }

    return safeItems;
  }

  /**
   * User Project RFQ Basket: Clear saved items for a specific user
   */
  static async clearUserCart(userKey: string) {
    if (!userKey || !userKey.trim()) return [];
    const cleanKey = userKey.trim().toLowerCase();

    UserCartStorage.delete(cleanKey);

    try {
      await supabaseAdmin.from('user_rfq_baskets').delete().eq('user_key', cleanKey);
    } catch (_err) {
      // ignore error
    }

    return [];
  }
}
