import { prisma } from '../config/database';
import { PaginatedResult, PaginationParams } from '../types';

export abstract class BaseRepository<T> {
  protected modelName: string;

  constructor(modelName: string) {
    this.modelName = modelName;
  }

  protected get model(): any {
    return (prisma as any)[this.modelName];
  }

  async findById(id: string, include?: any): Promise<T | null> {
    return await this.model.findFirst({
      where: { id, deletedAt: null },
      include,
    });
  }

  async findMany(where: any = {}, include?: any, orderBy?: any): Promise<T[]> {
    return await this.model.findMany({
      where: { ...where, deletedAt: null },
      include,
      orderBy,
    });
  }

  async findPaginated(
    params: PaginationParams,
    where: any = {},
    include?: any
  ): Promise<PaginatedResult<T>> {
    const page = Math.max(1, params.page || 1);
    const limit = Math.max(1, Math.min(100, params.limit || 10));
    const skip = (page - 1) * limit;

    const filterWhere = { ...where, deletedAt: null };

    const orderBy = params.sortBy
      ? { [params.sortBy]: params.sortOrder || 'asc' }
      : { createdAt: 'desc' };

    const [total, data] = await Promise.all([
      this.model.count({ where: filterWhere }),
      this.model.findMany({
        where: filterWhere,
        include,
        skip,
        take: limit,
        orderBy,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async create(data: any): Promise<T> {
    return await this.model.create({ data });
  }

  async update(id: string, data: any): Promise<T> {
    return await this.model.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string): Promise<T> {
    return await this.model.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async hardDelete(id: string): Promise<T> {
    return await this.model.delete({
      where: { id },
    });
  }
}
