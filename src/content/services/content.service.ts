import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreatePageDto,
  UpdatePageDto,
  CreateBlogPostDto,
  UpdateBlogPostDto,
  CreateCategoryDto,
  CreateHealthResourceDto,
  UpdateHealthResourceDto,
  PageQueryDto,
  BlogPostQueryDto,
  HealthResourceQueryDto,
} from '../dto/content.dto';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async createPage(dto: CreatePageDto, authorId: string) {
    const existing = await this.prisma.page.findUnique({ where: { slug: dto.slug } });
    if (existing) {
      throw new ConflictException('Page with this slug already exists');
    }

    return this.prisma.page.create({
      data: {
        ...dto,
        authorId,
      },
    });
  }

  async updatePage(id: string, dto: UpdatePageDto) {
    const page = await this.prisma.page.findUnique({ where: { id } });
    if (!page) {
      throw new NotFoundException('Page not found');
    }

    if (dto.body && JSON.stringify(dto.body) !== JSON.stringify(page.body)) {
      await this.prisma.page.update({
        where: { id },
        data: { version: { increment: 1 } },
      });
    }

    const updated = await this.prisma.page.update({
      where: { id },
      data: {
        ...dto,
        publishedAt: dto.status === 'PUBLISHED' && page.status !== 'PUBLISHED' ? new Date() : undefined,
      },
    });

    return updated;
  }

  async deletePage(id: string) {
    const page = await this.prisma.page.findUnique({ where: { id } });
    if (!page) {
      throw new NotFoundException('Page not found');
    }

    return this.prisma.page.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findPages(query: PageQueryDto) {
    const where: any = { deletedAt: null };
    if (query.status) {
      where.status = query.status;
    }

    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const [pages, total] = await Promise.all([
      this.prisma.page.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.page.count({ where }),
    ]);

    return { pages, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findPageBySlug(slug: string) {
    const page = await this.prisma.page.findUnique({
      where: { slug, deletedAt: null },
    });
    if (!page || page.status !== 'PUBLISHED') {
      throw new NotFoundException('Page not found');
    }
    return page;
  }

  async getPageVersions(id: string) {
    const page = await this.prisma.page.findUnique({ where: { id } });
    if (!page) {
      throw new NotFoundException('Page not found');
    }
    return { id: page.id, slug: page.slug, currentVersion: page.version };
  }

  async createCategory(dto: CreateCategoryDto) {
    const existing = await this.prisma.category.findFirst({
      where: { OR: [{ slug: dto.slug }, { name: dto.name }] },
    });
    if (existing) {
      throw new ConflictException('Category with this slug or name already exists');
    }

    return this.prisma.category.create({ data: dto });
  }

  async findCategories() {
    return this.prisma.category.findMany({ orderBy: { name: 'asc' } });
  }

  async deleteCategory(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const hasBlogPosts = await this.prisma.blogPost.count({ where: { categoryId: id } });
    if (hasBlogPosts > 0) {
      throw new ConflictException('Cannot delete category with associated blog posts');
    }

    return this.prisma.category.delete({ where: { id } });
  }

  async createBlogPost(dto: CreateBlogPostDto, authorId: string) {
    const existing = await this.prisma.blogPost.findUnique({ where: { slug: dto.slug } });
    if (existing) {
      throw new ConflictException('Blog post with this slug already exists');
    }

    return this.prisma.blogPost.create({
      data: {
        ...dto,
        authorId,
        publishedAt: dto.status === 'PUBLISHED' ? new Date() : null,
      },
      include: { category: true },
    });
  }

  async updateBlogPost(id: string, dto: UpdateBlogPostDto) {
    const post = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    return this.prisma.blogPost.update({
      where: { id },
      data: {
        ...dto,
        publishedAt: dto.status === 'PUBLISHED' && !post.publishedAt ? new Date() : undefined,
      },
      include: { category: true },
    });
  }

  async deleteBlogPost(id: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    return this.prisma.blogPost.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findBlogPosts(query: BlogPostQueryDto) {
    const where: any = { deletedAt: null };
    if (query.status) {
      where.status = query.status;
    }
    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }
    if (query.tags && query.tags.length > 0) {
      where.tags = { hasSome: query.tags };
    }

    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      this.prisma.blogPost.findMany({
        where,
        include: { category: true },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.blogPost.count({ where }),
    ]);

    return { posts, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findBlogPostBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug, deletedAt: null },
      include: { category: true },
    });
    if (!post || post.status !== 'PUBLISHED') {
      throw new NotFoundException('Blog post not found');
    }
    return post;
  }

  async createHealthResource(dto: CreateHealthResourceDto, authorId: string) {
    const existing = await this.prisma.healthResource.findUnique({ where: { slug: dto.slug } });
    if (existing) {
      throw new ConflictException('Health resource with this slug already exists');
    }

    return this.prisma.healthResource.create({
      data: {
        ...dto,
        authorId,
        publishedAt: new Date(),
      },
    });
  }

  async updateHealthResource(id: string, dto: UpdateHealthResourceDto) {
    const resource = await this.prisma.healthResource.findUnique({ where: { id } });
    if (!resource) {
      throw new NotFoundException('Health resource not found');
    }

    return this.prisma.healthResource.update({
      where: { id },
      data: dto,
    });
  }

  async deleteHealthResource(id: string) {
    const resource = await this.prisma.healthResource.findUnique({ where: { id } });
    if (!resource) {
      throw new NotFoundException('Health resource not found');
    }

    return this.prisma.healthResource.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findHealthResources(query: HealthResourceQueryDto) {
    const where: any = { deletedAt: null };
    if (query.category) {
      where.category = query.category;
    }
    if (query.isFeatured !== undefined) {
      where.isFeatured = query.isFeatured;
    }

    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const [resources, total] = await Promise.all([
      this.prisma.healthResource.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.healthResource.count({ where }),
    ]);

    return { resources, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findHealthResourceBySlug(slug: string) {
    const resource = await this.prisma.healthResource.findUnique({
      where: { slug, deletedAt: null },
    });
    if (!resource) {
      throw new NotFoundException('Health resource not found');
    }
    return resource;
  }
}
